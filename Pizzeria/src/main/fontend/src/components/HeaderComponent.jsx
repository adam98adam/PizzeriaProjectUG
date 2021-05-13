import React from "react";
import { Navbar } from "react-bootstrap";

const HeaderComponent = (props) => {
  return (
    <div>
      <header>
        <Navbar fixed="top" bg="dark" variant="dark">
          <Navbar.Brand>
            <a href="https://www.google.com/" className="navbar-brand">
              Users Managment App
            </a>
          </Navbar.Brand>
        </Navbar>
      </header>
    </div>
  );
};

export default HeaderComponent;
