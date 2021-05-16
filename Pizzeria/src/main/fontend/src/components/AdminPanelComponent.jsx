import React, { useEffect, useRef, useState } from "react";
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
  const login = useRef("");
  const password = useRef("");
  const idUser = useRef("");
  const name = useRef("");
  const surname = useRef("");
  const email = useRef("");
  const phoneNumber = useRef("");
  const idAddress = useRef("");
  const city = useRef("");
  const street = useRef("");
  const number = useRef("");

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const pizzaList = useRef([]);
  const crustList = useRef([]);
  const bakestyleList = useRef([]);
  const drinksList = useRef([]);
  const pizzaSizeList = useRef([]);
  const cutstyleList = useRef([]);
  const sauceList = useRef([]);

  useEffect(() => {
    AccountService.getAccountById(
      parseInt(localStorage.getItem("idAccount"), 10)
    ).then((res) => {
      // console.log(res.data);
      login.current = res.data.login;
      password.current = res.data.password;
      idUser.current = res.data.user.id;
      name.current = res.data.user.name;
      surname.current = res.data.user.surname;
      email.current = res.data.user.email;
      phoneNumber.current = res.data.user.phonenumber;
      AddressService.getAddressByUserId(parseInt(res.data.user.id, 10)).then(
        (res) => {
          // console.log(res.data);
          idAddress.current = res.data.id;
          city.current = res.data.city;
          street.current = res.data.street;
          number.current = res.data.number;
        }
      );

      PizzaService.getAllPizza().then((res) => {
        //   // console.log(res.data);
        pizzaList.current = res.data;
        //   // console.log(pizzaList);
      });
      CrustService.getAllCrust().then((res) => {
        crustList.current = res.data;
        //   // console.log(res.data);
      });
      BakestyleService.getAllBakestyle().then((res) => {
        bakestyleList.current = res.data;
        //   // console.log(res.data);
      });
      DrinksService.getAllDrinks().then((res) => {
        drinksList.current = res.data;
        //   // console.log(res.data);
      });
      PizzasizeService.getAllPizzasize().then((res) => {
        pizzaSizeList.current = res.data;
        //   // console.log(res.data);
      });
      CutstyleService.getAllCutstyle().then((res) => {
        cutstyleList.current = res.data;
        //   // console.log(res.data);
      });
      SaucesService.getAllSauces().then((res) => {
        sauceList.current = res.data;
        //   // console.log(res.data);
      });
    });
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
    // console.log();
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
                address(parseInt(idAccount, 10), parseInt(idAddress.current, 10))
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
