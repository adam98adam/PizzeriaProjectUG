import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Nav, Navbar, Row, Table } from "react-bootstrap";
import PizzaLogo from "./../images/pizza-logo.png";
import "./../css/index.css";
import PizzaService from "../services/PizzaService";
import AdminPizzaUpdateModal from "./AdminPizzaUpdateModal";
import AdminNewPizzaModal from "./AdminNewPizzaModal";

const AdminPizzaListComponent = (props) => {
  const idAccount = localStorage.getItem("idUser");
  const [pizzaList, setPizzaList] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState({});
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showAdminPizzaUpdateModal, setShowAdminPizzaUpdateModal] =
    useState(false);
  const [showAdminNewPizzaModal, setShowAdminNewPizzaModal] = useState(false);

  useEffect(() => {
    PizzaService.getAllPizza().then((res) => {
      setPizzaList(res.data);
    });
  }, [showAdminPizzaUpdateModal, showAdminNewPizzaModal]);

  const logout = () => {
    props.history.push("/");
  };

  const getBackToAdminPanel = (id) => {
    props.history.push(`/admin/${id}`);
  };
  const deletePizza = (id) => {
    PizzaService.deletePizzaById(id).then((res) => {
      setPizzaList(pizzaList.filter((el) => el.id !== id));
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
  const handleAdminPizzaUpdateModalClose = () => {
    setSelectedPizza({});
    setShowAdminPizzaUpdateModal(false);
  };
  const handleAdminNewPizzaModalClose = () => {
    setSelectedPizza({});
    setShowAdminNewPizzaModal(false);
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
          <Card.Title className="text-center">Pizza</Card.Title>
          <Row>
            <Button
              variant="primary"
              style={{ marginLeft: "6rem", marginBottom: "1rem" }}
              onClick={() => setShowAdminNewPizzaModal(true)}
            >
              Add new
            </Button>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Descrition</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th colSpan="2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pizzaList.map((pizza) => {
                  console.log(pizza);
                  return (
                    <tr key={pizza.id}>
                      <td>{pizza.name}</td>
                      <td style={{ width: "60%" }}>{pizza.description}</td>
                      <td>{pizza.price + "$"}</td>
                      <td>
                        <img
                          src={pizza.image}
                          style={{ width: "3rem", height: "3rem" }}
                        />
                      </td>
                      <td colSpan="2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            setSelectedPizza(pizza);
                            setShowAdminPizzaUpdateModal(true);
                          }}
                        >
                          Update
                        </Button>{" "}
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => deletePizza(parseInt(pizza.id, 10))}
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
          <AdminPizzaUpdateModal
            show={showAdminPizzaUpdateModal}
            pizza={selectedPizza}
            onHide={handleAdminPizzaUpdateModalClose}
          />
          <AdminNewPizzaModal
            show={showAdminNewPizzaModal}
            onHide={handleAdminNewPizzaModalClose}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminPizzaListComponent;
