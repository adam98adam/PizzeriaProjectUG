import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Nav, Navbar } from "react-bootstrap";
import OrdersService from "../services/OrdersService";
import PizzaLogo from "./../images/pizza-logo.png";

const UserOrdersComponent = (props) => {
  const [idAccount, setIdAccount] = useState(props.match.params.idAccount);
  const [idUser, setIdUser] = useState(props.match.params.idUser);
  const [orders, setOrders] = useState([]);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    OrdersService.getOrdersByUserId(props.match.params.idUser).then((res) => {
      setOrders(res.data);
    });
  }, []);

  const logout = () => {
    props.history.push("/");
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
      <Card className="main-card">
        <Card.Body>
          <Card.Title className="text-center">My Orders</Card.Title>
          <div className="row">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Pizza</th>
                  <th>Bakestyle</th>
                  <th>Drink</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td> {order.pizza.name} </td>
                    <td> {order.bakestyle.name}</td>
                    <td> {order.drink.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
