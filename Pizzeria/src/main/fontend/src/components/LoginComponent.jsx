import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import "reactjs-popup/dist/index.css";
import "../css/index.css";
import {
  Form,
  Row,
  Col,
  Container,
  Card,
  Modal,
  Navbar,
} from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import AccountService from "../services/AccountService";

const inputStyle = {};

const LoginComponent = (props) => {
  const [loginStatus, setLoginStatus] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (
      localStorage.getItem("idAccount") !== null &&
      localStorage.getItem("idUser") !== null &&
      localStorage.getItem("userType") !== null
    ) {
      props.history.push(
        `/${localStorage.getItem("userType")}/${localStorage.getItem("idUser")}`
      );
    }
  }, [props.history]);
  const userPanel = (id, data) => {
    localStorage.setItem("idAccount", id);
    localStorage.setItem("idUser", data.user.id);
    if (data.user.customer) {
      localStorage.setItem("userType", "user");
      props.history.push(`/user/${id}`);
    } else {
      localStorage.setItem("userType", "admin");
      props.history.push(`/admin/${id}`);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (login === "" && password === "") {
      setShowModal(true);
    } else {
      AccountService.getAccount(login, password)
        .then((res) => {
          // console.log(res.data);
          userPanel(res.data.id, res.data);
        })
        .catch((er) => {
          setLoginStatus(!loginStatus);
          setShowModal(true);
          // console.log(er.response);
        });
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setLogin("");
    setPassword("");
  };

  return (
    <div>
      <header>
        <Navbar
          fixed="top"
          bg="dark"
          variant="dark"
          style={{ justifyContent: "center" }}
        >
          <Navbar.Brand>
            <h2 style={{ padding: "10px 20px", color: "white" }}>
              Pizzeria Web Application
            </h2>
          </Navbar.Brand>
        </Navbar>
      </header>

      <Card className="main-card">
        <Card.Body>
          <Card.Title text="white">Log In</Card.Title>
          <Form className="center">
            <Container>
              <Row className="justify-content-md-center">
                <Col
                  md={{ span: 4, offset: 3 }}
                  sm={12}
                  style={{
                    margin: "auto",
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                >
                  <Form.Group controlId="formLogin">
                    {/* <Form.Label>Login</Form.Label> */}
                    <Form.Control
                      style={inputStyle}
                      type="text"
                      placeholder="Enter your login"
                      onChange={({ target }) => setLogin(target.value)}
                      value={login}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col
                  md={{ span: 4, offset: 3 }}
                  sm={12}
                  style={{
                    margin: "auto",
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                  }}
                >
                  <Form.Group controlId="formPassword">
                    {/* <Form.Label>Password</Form.Label> */}
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      onChange={({ target }) => setPassword(target.value)}
                      value={password}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <Button variant="success" type="submit" onClick={handleLogin}>
                    Submit
                  </Button>
                </Col>
                <Col md="auto">
                  <Button variant="secondary">
                    <Link style={{ color: "white" }} to={"/register"}>
                      Register
                    </Link>
                  </Button>
                </Col>
              </Row>
            </Container>
            <Modal show={showModal} centered onHide={handleClose}>
              <Modal.Header>
                <Modal.Title>User Not Found</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Can't find user, wrong login/password</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                  Try again
                </Button>
                <Button variant="secondary">
                  <Link style={{ color: "white" }} to={"/register"}>
                    Register
                  </Link>
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
export default LoginComponent;
