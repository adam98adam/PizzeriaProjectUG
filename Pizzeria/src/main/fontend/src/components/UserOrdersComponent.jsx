import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Nav, Navbar, Table } from "react-bootstrap";
import OrdersService from "../services/OrdersService";
import PizzaLogo from "./../images/pizza-logo.png";
import "./../css/index.css";
import OrdersListComponent from "./OrdersListComponent";

const UserOrdersComponent = (props) => {
  const idAccount = localStorage.getItem("idAccount");

  const [orders, setOrders] = useState([]);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const idUser = localStorage.getItem("idUser");
    OrdersService.getOrdersByUserId(idUser).then((res) => {
      setOrders(res.data);
    });
  }, []);

  const logout = () => {
    props.history.push("/");
    localStorage.clear();
  };

  const getBackToUserPanel = (id) => {
    props.history.push(`/user/${id}`);
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
          <Card.Title className="text-center">My Orders</Card.Title>
          <div className="row">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Pizza</th>
                  <th>Bakestyle</th>
                  <th>Crust</th>
                  <th>Cutstyle</th>
                  <th>Drink</th>
                  <th>Sauce</th>
                  <th>Price</th>
                  <th>Date of order</th>
                </tr>
              </thead>
              <tbody>
                <OrdersListComponent orders={orders} isAdmin={false} />
              </tbody>
            </Table>
          </div>
          <div display="flex" justify-content="center">
            <button
              onClick={() => getBackToUserPanel(parseInt(idAccount, 10))}
              className="btn btn-info"
            >
              Back to user panel
            </button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserOrdersComponent;
