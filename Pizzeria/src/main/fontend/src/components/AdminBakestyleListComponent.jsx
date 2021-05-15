import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Nav, Navbar, Row, Table } from "react-bootstrap";
import PizzaLogo from "./../images/pizza-logo.png";
import "./../css/index.css";
import BakestyleService from "../services/BakestyleService";
import AdminNewBakestyleModal from "./AdminNewBakestyleModal";
import AdminBakestyleUpdateModal from "./AdminBakestyleUpdateModal";

const AdminBakestyleListComponent = (props) => {
  const idAccount = localStorage.getItem("idAccount");

  const [selectedBakestyle, setSelectedBakestyle] = useState({});
  const [bakestyleList, setBakestyleList] = useState([]);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showAdminNewBakestyleModal, setShowAdminNewBakestyleModal] =
    useState(false);
  const [showAdminBakestyleUpdateModal, setShowAdminBakestyleUpdateModal] =
    useState(false);
  useEffect(() => {
    BakestyleService.getAllBakestyle().then((res) => {
      setBakestyleList(res.data);
    });
  }, [showAdminNewBakestyleModal, showAdminBakestyleUpdateModal]);

  const logout = () => {
    props.history.push("/");
    localStorage.clear();
  };

  const getBackToAdminPanel = (id) => {
    props.history.push(`/admin/${id}`);
  };
  const deleteBakestyle = (id) => {
    // console.log("delete crust");
    BakestyleService.deleteBakestyleById(id).then((res) => {
      // console.log(res.data);
      setBakestyleList(bakestyleList.filter((el) => el.id !== id));
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
  const handleAdminBakestyleUpdateModalClose = () => {
    setSelectedBakestyle({});
    setShowAdminBakestyleUpdateModal(false);
  };
  const handleAdminNewBakestyleModalClose = () => {
    setShowAdminNewBakestyleModal(false);
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
          <Card.Title className="text-center">Bakestyle</Card.Title>
          <Row>
            <Button
              variant="primary"
              style={{ marginLeft: "6rem", marginBottom: "1rem" }}
              onClick={() => setShowAdminNewBakestyleModal(true)}
            >
              Add new
            </Button>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bakestyleList.map((bakestyle) => {
                  // console.log(bakestyle);
                  return (
                    <tr key={bakestyle.id}>
                      <td>{bakestyle.name}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            setSelectedBakestyle(bakestyle);
                            setShowAdminBakestyleUpdateModal(true);
                          }}
                        >
                          Update
                        </Button>{" "}
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() =>
                            deleteBakestyle(parseInt(bakestyle.id, 10))
                          }
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
          <AdminBakestyleUpdateModal
            show={showAdminBakestyleUpdateModal}
            bakestyle={selectedBakestyle}
            onHide={handleAdminBakestyleUpdateModalClose}
          />
          <AdminNewBakestyleModal
            show={showAdminNewBakestyleModal}
            onHide={handleAdminNewBakestyleModalClose}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminBakestyleListComponent;
