import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Nav, Navbar, Row, Table } from "react-bootstrap";
import PizzaLogo from "./../images/pizza-logo.png";
import "./../css/index.css";
import DrinksService from "../services/DrinksService";
import AdminNewDrinkModal from "./AdminNewDrinkModal";
import AdminDrinkUpdateModal from "./AdminDrinkUpdateModal";

const AdminDrinksListComponent = (props) => {
  const idAccount = localStorage.getItem("idAccount");
  const [drinksList, setDrinksList] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState({});
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showAdminNewDrinkModal, setShowAdminNewDrinkModal] = useState(false);
  const [showAdminDrinkUpdateModal, setShowAdminDrinkUpdateModal] =
    useState(false);
  useEffect(() => {
    DrinksService.getAllDrinks().then((res) => {
      setDrinksList(res.data);
    });
  }, [showAdminNewDrinkModal, showAdminDrinkUpdateModal]);

  const logout = () => {
    props.history.push("/");
  };

  const getBackToAdminPanel = (id) => {
    props.history.push(`/admin/${id}`);
  };
  const deleteDrink = (id) => {
    console.log("delete crust");
    DrinksService.deleteDrinkById(id).then((res) => {
      // alert(res.data);
      console.log(res.data);
      setDrinksList(drinksList.filter((el) => el.id !== id));
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
  const handleAdminDrinkUpdateModalClose = () => {
    setSelectedDrink({});
    setShowAdminDrinkUpdateModal(false);
  };
  const handleAdminNewDrinkModalClose = () => {
    setShowAdminNewDrinkModal(false);
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
          <Card.Title className="text-center">Drinks</Card.Title>
          <Row>
            <Button
              variant="primary"
              style={{ marginLeft: "6rem", marginBottom: "1rem" }}
              onClick={() => setShowAdminNewDrinkModal(true)}
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
                {drinksList.map((drink) => {
                  console.log(drink);
                  return (
                    <tr key={drink.id}>
                      <td>{drink.name}</td>
                      <td>{drink.price + "$"}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            setSelectedDrink(drink);
                            setShowAdminDrinkUpdateModal(true);
                          }}
                        >
                          Update
                        </Button>{" "}
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => deleteDrink(parseInt(drink.id, 10))}
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
          <AdminDrinkUpdateModal
            show={showAdminDrinkUpdateModal}
            drink={selectedDrink}
            onHide={handleAdminDrinkUpdateModalClose}
          />
          <AdminNewDrinkModal
            show={showAdminNewDrinkModal}
            onHide={handleAdminNewDrinkModalClose}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminDrinksListComponent;
