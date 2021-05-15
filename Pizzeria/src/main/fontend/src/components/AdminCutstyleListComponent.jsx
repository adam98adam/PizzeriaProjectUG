import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Nav, Navbar, Row, Table } from "react-bootstrap";
import PizzaLogo from "./../images/pizza-logo.png";
import "./../css/index.css";
import CutstyleService from "../services/CutstyleService";
import AdminCutstyleUpdateModal from "./AdminCutstyleUpdateModal";
import AdminNewCutstyleModal from "./AdminNewCutstyleModal";

const AdminCutstyleListComponent = (props) => {
  const idAccount = localStorage.getItem("idUser");
  const [cutstyleList, setCutstyleList] = useState([]);

  const [selectedCutstyle, setSelectedCutstyle] = useState({});

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showAdminNewCutstyleModal, setShowAdminNewCutstyleModal] =
    useState(false);
  const [showAdminCutstyleUpdateModal, setShowAdminCutstyleUpdateModal] =
    useState(false);
  useEffect(() => {
    CutstyleService.getAllCutstyle().then((res) => {
      setCutstyleList(res.data);
    });
  }, [showAdminNewCutstyleModal, showAdminCutstyleUpdateModal]);
  const logout = () => {
    props.history.push("/");
    localStorage.clear();
  };

  const getBackToAdminPanel = (id) => {
    props.history.push(`/admin/${id}`);
  };
  const deleteCutstyle = (id) => {
    // console.log("delete crust");
    CutstyleService.deleteCutstyleById(id).then((res) => {
      // console.log(res.data);
      setCutstyleList(cutstyleList.filter((el) => el.id !== id));
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
  const handleAdminCutstyleUpdateModalClose = () => {
    setSelectedCutstyle({});
    setShowAdminCutstyleUpdateModal(false);
  };
  const handleAdminNewCutstyleModalClose = () => {
    setShowAdminNewCutstyleModal(false);
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
          <Card.Title className="text-center">Cutstyle</Card.Title>
          <Row>
            <Button
              variant="primary"
              style={{ marginLeft: "6rem", marginBottom: "1rem" }}
              onClick={() => setShowAdminNewCutstyleModal(true)}
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
                {cutstyleList.map((cutstyle) => {
                  // console.log(cutstyle);
                  return (
                    <tr key={cutstyle.id}>
                      <td>{cutstyle.name}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            setSelectedCutstyle(cutstyle);
                            setShowAdminCutstyleUpdateModal(true);
                          }}
                        >
                          Update
                        </Button>{" "}
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() =>
                            deleteCutstyle(parseInt(cutstyle.id, 10))
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
          <AdminCutstyleUpdateModal
            show={showAdminCutstyleUpdateModal}
            cutstyle={selectedCutstyle}
            onHide={handleAdminCutstyleUpdateModalClose}
          />
          <AdminNewCutstyleModal
            show={showAdminNewCutstyleModal}
            onHide={handleAdminNewCutstyleModalClose}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminCutstyleListComponent;
