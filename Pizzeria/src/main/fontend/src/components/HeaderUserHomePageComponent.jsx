import React from "react";
import { Nav, Navbar } from "react-bootstrap";

const HeaderUserHomePageComponent = () => {
  return (
    <div>
      <header>
        <Navbar fixed="top" bg="light" variant="light">
          <Nav.Link href="#">Pizzeria</Nav.Link>
          <Navbar.Toggle
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="navbarNav">
            <Nav>
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">Features</Nav.Link>
              <Nav.Link href="#">Pricing</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    </div>
  );
};

export default HeaderUserHomePageComponent;
