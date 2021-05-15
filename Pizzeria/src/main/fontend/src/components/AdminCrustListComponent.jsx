import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Nav, Navbar, Row, Table } from "react-bootstrap";
import PizzaLogo from "./../images/pizza-logo.png";
import "./../css/index.css";
import CrustService from "../services/CrustService";
import AdminNewCrustModal from "./AdminNewCrustModal";
import AdminCrustUpdateModal from "./AdminCrustUpdateModal";

const AdminCrustListComponent = (props) => {
  const idAccount = localStorage.getItem("idAccount");
  const [crustList, setCrustList] = useState([]);
  const [showAdminNewCrustModal, setShowAdminNewCrustModal] = useState(false);
  const [selectedCrust, setSelectedCrust] = useState({});

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showAdminCrustUpdateModal, setShowAdminCrustUpdateModal] =
    useState(false);

  useEffect(() => {
    CrustService.getAllCrust().then((res) => {
      setCrustList(res.data);
    });
  }, [showAdminNewCrustModal, showAdminCrustUpdateModal]);

  const logout = () => {
    props.history.push("/");
    localStorage.clear();
  };

  const getBackToAdminPanel = (id) => {
    props.history.push(`/admin/${id}`);
  };
  const deleteCrust = (id) => {
    // console.log("delete crust");
    CrustService.deleteCrustById(id).then((res) => {
      // console.log(res.data);
      setCrustList(crustList.filter((el) => el.id !== id));
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
  const handleAdminCrustUpdateModalClose = () => {
    setSelectedCrust({});
    setShowAdminCrustUpdateModal(false);
  };
  const handleAdminNewCrustModalClose = () => {
    setShowAdminNewCrustModal(false);
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
          <Card.Title className="text-center">Crust</Card.Title>
          <Row>
            <Button
              variant="primary"
              style={{ marginLeft: "6rem", marginBottom: "1rem" }}
              onClick={() => setShowAdminNewCrustModal(true)}
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
                {crustList.map((crust) => {
                  // console.log(crust);
                  return (
                    <tr key={crust.id}>
                      <td>{crust.crust}</td>
                      <td>{crust.price + "$"}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            setSelectedCrust(crust);
                            setShowAdminCrustUpdateModal(true);
                          }}
                        >
                          Update
                        </Button>{" "}
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => deleteCrust(parseInt(crust.id, 10))}
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
          <AdminCrustUpdateModal
            show={showAdminCrustUpdateModal}
            crust={selectedCrust}
            onHide={handleAdminCrustUpdateModalClose}
          />
          <AdminNewCrustModal
            show={showAdminNewCrustModal}
            onHide={handleAdminNewCrustModalClose}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminCrustListComponent;
