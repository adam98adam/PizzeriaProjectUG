import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Nav, Navbar, Row, Table } from "react-bootstrap";
import PizzaLogo from "./../images/pizza-logo.png";
import "./../css/index.css";
import SaucesService from "../services/SaucesService";
import AdminNewSauceModal from "./AdminNewSauceModal";
import AdminSauceUpdateModal from "./AdminSauceUpdateModal";

const AdminSaucesListComponent = (props) => {
  const idAccount = localStorage.getItem("idUser");
  const [saucesList, setSaucesList] = useState([]);
  const [selectedSauce, setSelectedSauce] = useState({});

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showAdminNewSauceModal, setShowAdminNewSauceModal] = useState(false);
  const [showAdminSauceUpdateModal, setShowAdminSauceUpdateModal] =
    useState(false);
  useEffect(() => {
    SaucesService.getAllSauces().then((res) => {
      setSaucesList(res.data);
    });
  }, [showAdminNewSauceModal, showAdminSauceUpdateModal]);

  const logout = () => {
    props.history.push("/");
  };

  const getBackToAdminPanel = (id) => {
    props.history.push(`/admin/${id}`);
  };
  const deleteSauce = (id) => {
    console.log("delete sauces");
    SaucesService.deleteSauceById(id).then((res) => {
      // alert(res.data);
      console.log(res.data);
      setSaucesList(saucesList.filter((el) => el.id !== id));
    });
  };
  const handleLogoutClose = () => {
    setShowLogoutModal(false);
  };
  const logoutModal = () => {
    return (
      <Modal show={showLogoutModal} centered onHide={handleLogoutClose}>
        <Modal.Header>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
          <Button variant="success" onClick={handleLogoutClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  const handleAdminSauceUpdateModalClose = () => {
    setSelectedSauce({});
    setShowAdminSauceUpdateModal(false);
  };
  const handleAdminNewSauceModalClose = () => {
    setShowAdminNewSauceModal(false);
  };
  return (
    <div>
      <header>
        <Navbar fixed="top" bg="dark" variant="dark">
          <Navbar.Brand>
            <img alt="pizza-logo" src={PizzaLogo} width="30" height="30" />
            Pizzeria Web Application
          </Navbar.Brand>
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            <Nav.Link onClick={() => setShowLogoutModal(true)}>Logout</Nav.Link>
          </Nav>
        </Navbar>
        {showLogoutModal && logoutModal()}
      </header>
      <Card className="main-card order-card">
        <Card.Body>
          <Card.Title className="text-center">Sauces</Card.Title>
          <Row>
            <Button
              variant="primary"
              style={{ marginLeft: "6rem", marginBottom: "1rem" }}
              onClick={() => setShowAdminNewSauceModal(true)}
            >
              Add new
            </Button>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {saucesList.map((sauce) => {
                  console.log(sauce);
                  return (
                    <tr key={sauce.id}>
                      <td>{sauce.name}</td>
                      <td>{sauce.price + "$"}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            setSelectedSauce(sauce);
                            setShowAdminSauceUpdateModal(true);
                          }}
                        >
                          Update
                        </Button>{" "}
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => deleteSauce(parseInt(sauce.id, 10))}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>
          <div display="flex" justify-content="center">
            <button
              onClick={() => getBackToAdminPanel(parseInt(idAccount, 10))}
              className="btn btn-info"
            >
              Back to admin panel
            </button>
          </div>
          <AdminSauceUpdateModal
            show={showAdminSauceUpdateModal}
            sauce={selectedSauce}
            onHide={handleAdminSauceUpdateModalClose}
          />
          <AdminNewSauceModal
            show={showAdminNewSauceModal}
            onHide={handleAdminNewSauceModalClose}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminSaucesListComponent;
