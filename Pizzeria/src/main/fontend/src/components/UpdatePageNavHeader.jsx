import React from "react";
import { Navbar } from "react-bootstrap";
import PizzaLogo from "./../images/pizza-logo.png";

const UpdatePageNavHeader = () => {
  return (
    <header>
      <Navbar fixed="top" bg="dark" variant="dark">
        <Navbar.Brand>
          <img alt="pizza-logo" src={PizzaLogo} width="30" height="30" />{" "}
          Pizzeria Web Application
        </Navbar.Brand>
      </Navbar>
    </header>
  );
};

export default UpdatePageNavHeader;
