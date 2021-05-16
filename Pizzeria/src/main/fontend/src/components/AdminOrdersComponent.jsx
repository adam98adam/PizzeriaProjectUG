import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Nav, Navbar, Table } from "react-bootstrap";
import OrdersService from "../services/OrdersService";
import PizzaLogo from "./../images/pizza-logo.png";
import "./../css/index.css";

const formatDate = (datetime) => {
  const splitDateTime = datetime.split("T");
  const date = splitDateTime[0];
  const time = splitDateTime[1].split("+")[0].split(".")[0];
  const splitDate = date.split("-").map((el) => parseInt(el));
  const splitTime = time.split(":").map((el) => parseInt(el));
  //   // console.log(splitDate);
  //   // console.log(splitTime);
  const formattedDate = new Date(
    splitDate[0],
    splitDate[1],
    splitDate[2],
    splitTime[0],
    splitTime[1],
    splitTime[2]
  );
  formattedDate.setMinutes(
    formattedDate.getMinutes() - formattedDate.getTimezoneOffset()
  );
  return `${formattedDate.getHours()}:${formattedDate.getMinutes()}:${
    time.split(":")[2]
  } ${formattedDate.getDate()}-${formattedDate.getMonth()}-${formattedDate.getFullYear()}`;
};

const AdminOrdersComponent = (props) => {
  const idAccount = localStorage.getItem("idUser");
  const [orders, setOrders] = useState([]);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    OrdersService.getAllOrders().then((res) => {
      setOrders(res.data);
    });
  }, []);

  const logout = () => {
    props.history.push("/");
    localStorage.clear();
  };

  const getBackToAdminPanel = (id) => {
    props.history.push(`/admin/${id}`);
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
          <Card.Title className="text-center">Users' Orders</Card.Title>
          <div className="row">
            <Table
              striped
              bordered
              hover
              responsive
              style={{
                backgroundColor: "rgba(0,188,44,0.63)",
                borderRadius: 30,
              }}
            >
              <thead
                style={{
                  backgroundColor: "rgba(255,255,255,0.3)",
                  borderRadius: 13,
                }}
              >
                <tr
                  style={{
                    backgroundColor: "rgba(255,255,255,0.3)",
                    borderRadius: 13,
                  }}
                >
                  <th>User</th>
                  <th>Email</th>
                  <th>Phone number</th>
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
                {orders.map((order) => {
                  // console.log(order);
                  return (
                    <tr key={order.id}>
                      <td>{`${order.user.name} ${order.user.surname}`}</td>
                      <td>{order.user.email}</td>
                      <td>{order.user.phonenumber}</td>
                      <td>
                        {" "}
                        {order.pizza.name} ({order.pizzasize.name}){" "}
                      </td>
                      <td> {order.bakestyle.name}</td>
                      <td> {order.crust.crust}</td>
                      <td> {order.cutstyle.name}</td>
                      <td>
                        {" "}
                        {order.drink !== null ? order.drink.name : " - "}
                      </td>
                      <td>
                        {" "}
                        {order.sauce !== null ? order.sauce.name : " - "}
                      </td>
                      <td>
                        {" "}
                        {order.pizza.price * order.pizzasize.pizzacostfactor +
                          order.crust.price +
                          (order.drink !== null ? order.drink.price : 0) +
                          (order.sauce !== null ? order.sauce.price : 0)}
                        {"$"}
                      </td>
                      <td>{formatDate(order.date)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <div display="flex" justify-content="center">
            <button
              onClick={() => getBackToAdminPanel(parseInt(idAccount, 10))}
              className="btn btn-info"
            >
              Back to admin panel
            </button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default AdminOrdersComponent;