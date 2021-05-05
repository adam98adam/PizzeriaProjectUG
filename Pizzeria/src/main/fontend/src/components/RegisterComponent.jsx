import React, { useState } from "react";
import UserService from "../services/UserService";
import AccountService from "../services/AccountService";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const cardStyle = {
  paddingTop: 30,
  paddingBottom: 30,
  textAlign: "center",
  marginTop: "5rem",
};

const RegisterComponent = (props) => {
  // const [registerStatus, setRegisterstatus] = useState(true)
  const [showUserModal, setShowUserModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const registerToSystem = (e) => {
    e.preventDefault();
    const user = {
      name: name,
      surname: surname,
      email: email,
      phonenumber: phoneNumber,
      customer: true,
    };
    const loginData = {
      login: login,
      password: password,
    };
    const address = (id) => {
      props.history.push(`/register-user-address/${id}`)
    }

    if (Object.values(user).every((el) => el.length !== 0)) {
      if (Object.values(loginData).every((el) => el.length !== 0)) {
        UserService.createUser(user)
          .then((res) => {
            AccountService.createAccount({
              ...loginData,
              user: { id: parseInt(res.data.id, 10),name : res.data.name,surname : res.data.surname,email : res.data.email,phonenumber : res.data.phonenumber,customer : res.data.customer },
            })
              .then((res) => {
                console.log(res.data);
                console.log(res.data.user.id);
                //res.data.user.id
                //this.props.history.push(`/register-user-address/${id}`);
                address(res.data.user.id)
              })
              .catch((error) => {
                UserService.deleteUser(res.data.id).then((res) =>
                  console.log(res.data)
                );
                console.log(error.response);
              });
          })
          .catch((error) => console.log(error.response));
      } else {
        setShowLoginModal(true);
      }
    } else {
      setShowUserModal(true);
    }
  };

  const handleUserModalClose = () => {
    setShowUserModal(false);
  };
  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  const userModal = () => {
    return (
      <Modal show={showUserModal} centered onHide={handleUserModalClose}>
        <Modal.Header>
          <Modal.Title>User Fields Empty</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            One or more of user fields are empty. Please fill up these fields.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUserModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const loginModal = () => {
    return (
      <Modal show={showLoginModal} centered onHide={handleLoginModalClose}>
        <Modal.Header>
          <Modal.Title>User Not Found</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Can't find user, wrong login/password</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleLoginModalClose}>
            Try again
          </Button>
          <Button variant="secondary">
            <Link style={{ color: "white" }} to={"/register"}>
              Register
            </Link>
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  /*
    registerToSystem = (e) => {
        e.preventDefault();
        let user = {name: name,surname: surname,email: email,phonenumber: phonenumber,customer : true}
        RegisterService.createUser(user).then((res) => console.log(res.data)).catch((error) => console.log("Error"))
    }
    */

  const cancel = () => {
    props.history.push("/");
  };
/*
  const address = (id) => {
    props.history.push(`/register-user-address/${id}`)
  }
*/
  return (
    <Card
      bg="Primary"
      style={{
        padding: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form className="center">
        <Container>
          <Row className="align-items-center">
            {/* New account */}
            <Col>
              <Card style={cardStyle}>
                <Card.Title>Add your personal data</Card.Title>
                <Form.Group controlId="formUser">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your first name"
                    onChange={({ target }) => setName(target.value)}
                  />

                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your last name"
                    onChange={({ target }) => setSurname(target.value)}
                  />

                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    onChange={({ target }) => setEmail(target.value)}
                  />

                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your phone number"
                    onChange={({ target }) => setPhoneNumber(target.value)}
                  />
                </Form.Group>
              </Card>
            </Col>
            {/* User */}
            <Col>
              <Card>
                <Card.Title>Add your new account</Card.Title>
                <Form.Group controlId="formLogin">
                  <Form.Label>Login</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your login"
                    onChange={({ target }) => setLogin(target.value)}
                  />
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    onChange={({ target }) => setPassword(target.value)}
                  />
                </Form.Group>
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <Button variant="success" onClick={registerToSystem}>
                Register
              </Button>
            </Col>
            <Col md="auto">
              <Button variant="danger" onClick={cancel}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Container>
        {showUserModal && userModal()}
        {showLoginModal && loginModal()}
      </Form>
    </Card>
  );
};

export default RegisterComponent;
