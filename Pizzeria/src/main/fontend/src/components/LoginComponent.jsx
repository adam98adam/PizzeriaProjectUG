import React from "react";
import LoginService from "../services/LoginService";
import Button from "react-bootstrap/Button";
import "reactjs-popup/dist/index.css";
import "../css/index.css";
import { Form, Row, Col, Container, Card, Modal } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import AccountService from "../services/AccountService";
import HeaderComponent from "./HeaderComponent";

const cardStyle = {
  paddingTop: 30,
  paddingBottom: 30,
  textAlign: "center",
  marginTop: "5rem",
};
const cardTitleStyle = {};
const columnStyle = {
  margin: "auto",
};
const LoginComponent = (props) => {
  const [loginStatus, setLoginStatus] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");


  const userPanel = (id) => {
    props.history.push(`/user/${id}`)
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (login === "" && password === "") {
      setShowModal(true);
    } else {
      AccountService.getAccount(login, password)
        .then((res) => {
          console.log(res.data);
          userPanel(res.data.id)
        })
        .catch((er) => {
          {
            setLoginStatus(!loginStatus);
            setShowModal(true);
            console.log(er.response);
          }
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
        <nav  style={{justifyContent:"center"}} className="navbar navbar-expand-md navbar-dark bg-dark">
          <div >
            <h2 style={{ padding: "10px 20px", color: "white"}}>Pizzeria Web Application</h2>
          </div>
         </nav>
        </header>
   
    <Card style={cardStyle}>
      <Card.Title text="white" style={cardTitleStyle}>
        Log In
      </Card.Title>
      <Form className="center">
        <Container>
          <Row className="justify-content-md-center">
            <Col
              md={{ span: 4, offset: 3 }}
              sm={12}
              style={{
                ...columnStyle,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            >
              <Form.Group controlId="formLogin">
                {/* <Form.Label>Login</Form.Label> */}
                <Form.Control
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
                ...columnStyle,
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
    </Card>
    </div>
  );
};
export default LoginComponent;
