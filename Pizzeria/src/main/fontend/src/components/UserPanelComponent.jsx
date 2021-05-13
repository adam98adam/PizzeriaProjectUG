import React, { useEffect, useState } from "react";
import { Button, Nav, Navbar, Modal, Card, Container } from "react-bootstrap";
import AccountService from "../services/AccountService";
import AddressService from "../services/AddressService";
import OrdersService from "../services/OrdersService";
import PizzaService from "../services/PizzaService";
import UserService from "../services/UserService";
import PizzaLogo from "./../images/pizza-logo.png";
import PizzaListComponent from "./PizzaListComponent";

const UserPanelComponent = (props) => {
  const [idAccount, setIdAccount] = useState(props.match.params.id);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [idUser, setIdUser] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [idAddress, setIdAddress] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");

  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [pizza, setPizza] = useState([]);

  useEffect(() => {
    AccountService.getAccountById(parseInt(props.match.params.id, 10)).then(
      (res) => {
        console.log(res.data);
        setLogin(res.data.login);
        setPassword(res.data.password);
        setIdUser(res.data.user.id);
        setName(res.data.user.name);
        setSurname(res.data.user.surname);
        setEmail(res.data.user.email);
        setPhoneNumber(res.data.user.phonenumber);
        AddressService.getAddressByUserId(parseInt(res.data.user.id, 10)).then(
          (res) => {
            console.log(res.data);
            setIdAddress(res.data.id);
            setCity(res.data.city);
            setStreet(res.data.street);
            setNumber(res.data.number);
          }
        );

        PizzaService.getAllPizza().then((res) => {
          console.log(res.data);
          setPizza(res.data);
          console.log(pizza);
        });
      }
    );
  }, [props.match.params.id]);

  const user = (idAccount, idUser) => {
    props.history.push(`/user-edit/${idAccount}/${idUser}`);
  };

  const account = (idAccount) => {
    props.history.push(`/account-edit/${idAccount}`);
  };

  const address = (idAccount, idAddress) => {
    props.history.push(`/address-edit/${idAccount}/${idAddress}`);
  };
  const myOrders = (idAccount, idUser) => {
    props.history.push(`/user-orders/${idAccount}/${idUser}`);
  };

  const choosePizza = (id) => {
    console.log(id);
  };

  const deleteAccount = (idUser) => {
    UserService.deleteUser(idUser).then((res) => {
      props.history.push("/");
    });
  };

  const logout = () => {
    props.history.push("/");
  };

  const handleDeleteAccountClose = () => {
    setShowDeleteAccountModal(false);
  };

  const deleteAccountModal = () => {
    return (
      <Modal
        show={showDeleteAccountModal}
        centered
        onHide={handleDeleteAccountClose}
      >
        <Modal.Header>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => deleteAccount(parseInt(idUser, 10))}
          >
            Confirm
          </Button>
          <Button variant="success" onClick={handleDeleteAccountClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
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
    <>
      <header>
        <Navbar fixed="top" bg="dark" variant="dark">
          <Navbar.Brand>
            <img alt="pizza-logo" src={PizzaLogo} width="30" height="30" />
            Pizzeria Web Application
          </Navbar.Brand>
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            <Nav.Link onClick={() => account(parseInt(idAccount, 10))}>
              Account
            </Nav.Link>
            <Nav.Link
              onClick={() =>
                user(parseInt(idAccount, 10), parseInt(idUser, 10))
              }
            >
              User
            </Nav.Link>
            <Nav.Link
              onClick={() =>
                address(parseInt(idAccount, 10), parseInt(idAddress, 10))
              }
            >
              Address
            </Nav.Link>
            <Nav.Link
              onClick={() =>
                myOrders(parseInt(idAccount, 10), parseInt(idAddress, 10))
              }
            >
              My Orders
            </Nav.Link>
            <Nav.Link onClick={() => setShowDeleteAccountModal(true)}>
              Delete Account
            </Nav.Link>
            <Nav.Link onClick={() => setShowLogoutModal(true)}>Logout</Nav.Link>
          </Nav>
        </Navbar>
        {showDeleteAccountModal && deleteAccountModal()}
        {showLogoutModal && logoutModal()}
      </header>
      <PizzaListComponent pizza={pizza} style={{}} />
    </>
  );
};

export default UserPanelComponent;
