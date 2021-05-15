import React, { useEffect, useState } from "react";
import {
  CardDeck,
  Button,
  Card,
  Container,
  Modal,
  Nav,
  Navbar,
  Row,
  Col,
} from "react-bootstrap";
import AccountService from "../services/AccountService";
import AddressService from "../services/AddressService";
import BakestyleService from "../services/BakestyleService";
import CrustService from "../services/CrustService";
import CutstyleService from "../services/CutstyleService";
import DrinksService from "../services/DrinksService";
import PizzaService from "../services/PizzaService";
import PizzasizeService from "../services/PizzasizeService";
import SaucesService from "../services/SaucesService";
import UserService from "../services/UserService";
import PizzaLogo from "./../images/pizza-logo.png";

import PizzaBackground from "./../images/pizza-background.png";
import CrustBackground from "./../images/crust-background.jpg";
import BakestyleBackground from "./../images/bakestyle-background.jpg";
import DrinksBackground from "./../images/drinks-background.jpg";
import PizzasizeBackground from "./../images/pizzasize-background.jpg";
import CutstyleBackground from "./../images/cutstyle-background.jpg";
import SauceBackground from "./../images/sauce-background.jpg";

const AdminPanelComponent = (props) => {
  const idAccount = localStorage.getItem("idAccount");
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

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [pizzaList, setPizzaList] = useState([]);
  const [crustList, setCrustList] = useState([]);
  const [bakestyleList, setBakestyleList] = useState([]);
  const [drinksList, setDrinksList] = useState([]);
  const [pizzaSizeList, setPizzaSizeList] = useState([]);
  const [cutstyleList, setCutstyleList] = useState([]);
  const [sauceList, setSauceList] = useState([]);

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
          setPizzaList(res.data);
          console.log(pizzaList);
        });
        CrustService.getAllCrust().then((res) => {
          setCrustList(res.data);
          console.log(res.data);
        });
        BakestyleService.getAllBakestyle().then((res) => {
          setBakestyleList(res.data);
          console.log(res.data);
        });
        DrinksService.getAllDrinks().then((res) => {
          setDrinksList(res.data);
          console.log(res.data);
        });
        PizzasizeService.getAllPizzasize().then((res) => {
          setPizzaSizeList(res.data);
          console.log(res.data);
        });
        CutstyleService.getAllCutstyle().then((res) => {
          setCutstyleList(res.data);
          console.log(res.data);
        });
        SaucesService.getAllSauces().then((res) => {
          setSauceList(res.data);
          console.log(res.data);
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
  const orders = () => {
    props.history.push(`/admin-orders`);
  };

  const logout = () => {
    props.history.push("/");
  };
  const choosePizza = () => {
    console.log();
    props.history.push("/admin-pizza");
  };
  const chooseCrust = () => {
    props.history.push("/admin-crust");
  };
  const chooseBakestyle = () => {
    props.history.push("/admin-bakestyle");
  };
  const chooseDrinks = () => {
    props.history.push("/admin-drinks");
  };
  const choosePizzasize = () => {
    props.history.push("/admin-pizzasize");
  };
  const chooseCutstyle = () => {
    props.history.push("/admin-cutstyle");
  };
  const chooseSauces = () => {
    props.history.push("/admin-sauces");
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
  const modelsList = [
    { name: "pizza", image: PizzaBackground, redirect: () => choosePizza() },
    { name: "crust", image: CrustBackground, redirect: () => chooseCrust() },
    {
      name: "bakestyle",
      image: BakestyleBackground,
      redirect: () => chooseBakestyle(),
    },
    {
      name: "drinks",
      image: DrinksBackground,
      redirect: () => chooseDrinks(),
    },
    {
      name: "pizzasize",
      image: PizzasizeBackground,
      redirect: () => choosePizzasize(),
    },
    {
      name: "cutstyle",
      image: CutstyleBackground,
      redirect: () => chooseCutstyle(),
    },
    { name: "sauces", image: SauceBackground, redirect: () => chooseSauces() },
  ];
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
              onClick={() => {
                orders();
              }}
            >
              Orders
            </Nav.Link>

            <Nav.Link onClick={() => setShowLogoutModal(true)}>Logout</Nav.Link>
          </Nav>
        </Navbar>

        {showLogoutModal && logoutModal()}
      </header>
      <Container fluid className="main-card">
        <Row>
          <CardDeck
            style={{
              flexWrap: "wrap",
              justifyContent: "flex-start",
              alignContent: "flex-start",
            }}
          >
            {modelsList.map((model, index) => {
              const nameCapitalized =
                model.name.charAt(0).toUpperCase() + model.name.slice(1);
              return (
                <Col xl={4} md={6} sm={12} key={index}>
                  <Card
                    style={{
                      margin: 10,
                      overflow: "auto",
                      borderRadius: 15,
                    }}
                  >
                    <Card.Img
                      src={model.image}
                      style={{
                        width: "100%",
                        height: "10rem",
                        objectFit: "cover",
                      }}
                    />
                    <Card.Title
                      style={{
                        marginTop: "1rem",
                      }}
                    >
                      {nameCapitalized}
                    </Card.Title>

                    <Card.Footer style={{ display: "none" }}></Card.Footer>
                    <Button variant="success" onClick={model.redirect}>
                      Choose
                    </Button>
                  </Card>
                </Col>
              );
            })}
          </CardDeck>
        </Row>
      </Container>
    </>
  );
};

export default AdminPanelComponent;
