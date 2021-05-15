import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Nav, Navbar, Row, Table } from "react-bootstrap";
import PizzaLogo from "./../images/pizza-logo.png";
import "./../css/index.css";
import PizzasizeService from "../services/PizzasizeService";
import AdminPizzasizeUpdateModal from "./AdminPizzasizeUpdateModal";
import AdminNewPizzasizeModal from "./AdminNewPizzasizeModal";

const AdminPizzasizeListComponent = (props) => {
  const idAccount = localStorage.getItem("idAccount");
  const [pizzasizeList, setPizzasizeList] = useState([]);
  const [selectedPizzasize, setSelectedPizzasize] = useState({});
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [showAdminNewPizzasizeModal, setShowAdminNewPizzasizeModal] =
    useState(false);
  const [showAdminPizzasizeUpdateModal, setShowAdminPizzasizeUpdateModal] =
    useState(false);
  useEffect(() => {
    PizzasizeService.getAllPizzasize().then((res) => {
      setPizzasizeList(res.data);
    });
  }, [showAdminNewPizzasizeModal, showAdminPizzasizeUpdateModal]);

  const logout = () => {
    props.history.push("/");
    localStorage.clear();
  };

  const getBackToAdminPanel = (id) => {
    props.history.push(`/admin/${id}`);
  };
  const deletePizzasize = (id) => {
    // console.log("delete crust");
    PizzasizeService.deletePizzasizeById(id).then((res) => {
      // console.log(res.data);
      //   alert(res.data);
      setPizzasizeList(pizzasizeList.filter((el) => el.id !== id));
    });
  };
  const handleLogoutClose = () => {
    setShowLogoutModal(false);
  };
  const handleAdminPizzasizeUpdateModalClose = () => {
    setSelectedPizzasize({});
    setShowAdminPizzasizeUpdateModal(false);
  };
  const handleAdminNewPizzasizeModalClose = () => {
    setShowAdminNewPizzasizeModal(false);
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
          <Card.Title className="text-center">Pizzasize</Card.Title>
          <Row>
            <Button
              variant="primary"
              style={{ marginLeft: "6rem", marginBottom: "1rem" }}
              onClick={() => setShowAdminNewPizzasizeModal(true)}
            >
              Add new
            </Button>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Size type</th>
                  <th>Diameter</th>
                  <th>Cost factor</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pizzasizeList.map((pizzasize) => {
                  // console.log(pizzasize);
                  return (
                    <tr key={pizzasize.id}>
                      <td>{pizzasize.name}</td>
                      <td>{pizzasize.diameter + "cm"}</td>
                      <td>{pizzasize.pizzacostfactor}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            setSelectedPizzasize(pizzasize);
                            setShowAdminPizzasizeUpdateModal(true);
                          }}
                        >
                          Update
                        </Button>{" "}
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() =>
                            deletePizzasize(parseInt(pizzasize.id, 10))
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
          <AdminPizzasizeUpdateModal
            show={showAdminPizzasizeUpdateModal}
            pizzasize={selectedPizzasize}
            onHide={handleAdminPizzasizeUpdateModalClose}
          />
          <AdminNewPizzasizeModal
            show={showAdminNewPizzasizeModal}
            onHide={handleAdminNewPizzasizeModalClose}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminPizzasizeListComponent;
