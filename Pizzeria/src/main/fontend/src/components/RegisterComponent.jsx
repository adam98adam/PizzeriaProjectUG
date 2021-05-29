import React, { useRef, useState } from "react";
import UserService from "../services/UserService";
import AccountService from "../services/AccountService";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Navbar,
  Overlay,
  Row,
  Tooltip,
} from "react-bootstrap";
import WarningIcon from "./icons/WarningIcon";
import ShowPasswordIcon from "../images/eye-fill.svg";
import HidePasswordIcon from "../images/eye-slash-fill.svg";

const RegisterComponent = (props) => {
  const loginButtonTarget = useRef(null);
  const passwordButtonTarget = useRef(null);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [nameValid, setNameValid] = useState(true);
  const [surnameValid, setSurnameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [phoneNumberValid, setPhoneNumberValid] = useState(true);

  const [loginValid, setLoginValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const [showLoginInfoTooltip, setShowLoginInfoTooltip] = useState(false);
  const [showPasswordInfoTooltip, setShowPasswordInfoTooltip] = useState(false);

  const [showUserModal, setShowUserModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

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
      props.history.push(`/register-user-address/${id}`);
    };
    const loginValidations = [loginValid, passwordValid];
    const userValidations = [
      nameValid,
      surnameValid,
      emailValid,
      phoneNumberValid,
    ];
    if (
      Object.values(user).every((el) => el.length !== 0) &&
      userValidations.every((el) => el)
    ) {
      if (
        Object.values(loginData).every((el) => el.length !== 0) &&
        loginValidations.every((el) => el)
      ) {
        UserService.createUser(user)
          .then((res) => {
            AccountService.createAccount({
              ...loginData,
              user: {
                id: parseInt(res.data.id, 10),
                name: res.data.name,
                surname: res.data.surname,
                email: res.data.email,
                phonenumber: res.data.phonenumber,
                customer: res.data.customer,
              },
            })
              .then((res) => {
                address(res.data.user.id);
              })
              .catch((error) => {
                UserService.deleteUser(res.data.id).then((res) => {
                  setShowLoginModal(true);
                  // console.log(res.data)
                  // console.log(error.response);
                });
              });
          })
          .catch((error) => {
            // console.log(error.response));
            setShowUserModal(true);
          });
      } else {
        setShowLoginModal(true);
      }
    } else {
      setShowUserModal(true);
    }
  };

  const cancel = () => {
    props.history.push("/");
  };

  const validateName = (name) => {
    const re = /^[A-Z][a-z]+$/;
    return re.test(name);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameValid(validateName(event.target.value));
  };

  // surname
  const validateSurname = (surname) => {
    const re = /[A-Z][a-z]+/;
    return re.test(surname);
  };
  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
    setSurnameValid(validateSurname(event.target.value));
  };

  // email
  const validateEmail = (email) => {
    const re = /([a-z0-9]+\.?)+[a-z0-9]+@[a-z]{2,}\.[a-z]{2,}/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailValid(validateEmail(event.target.value));
  };

  // phone number
  const validatePhoneNumber = (phoneNumber) => {
    const re = /^[0-9]{9}$/;
    return re.test(phoneNumber);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
    setPhoneNumberValid(validatePhoneNumber(event.target.value));
  };

  const validateLogin = (login) => {
    const re = /^[a-zA-Z][a-zA-Z0-9]{3,}$/;
    return re.test(login);
  };

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
    setLoginValid(validateLogin(event.target.value));
  };

  const validatePassword = (password) => {
    const re = /^\w+(\w*[.?$]\w*)+$/;
    return re.test(password);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordValid(validatePassword(event.target.value));
  };

  const handleUserModalClose = () => {
    setShowUserModal(false);
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const userModal = () => {
    return (
      <Modal show={showUserModal} centered onHide={handleUserModalClose}>
        <Modal.Header>
          <Modal.Title>User Fields Empty/Not Valid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            One or more of user fields are empty or not valid. Please fill up
            these fields.
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
  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };
  const loginModal = () => {
    return (
      <Modal show={showLoginModal} centered onHide={handleLoginModalClose}>
        <Modal.Header>
          <Modal.Title>Login Not Found/Empty</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            One or more of login fields are empty or not valid. Please fill up
            these fields.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleLoginModalClose}>
            Try again
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const loginInfoIcon = () => {
    return (
      <>
        <span
          ref={loginButtonTarget}
          onClick={() => setShowLoginInfoTooltip(!showLoginInfoTooltip)}
          style={{ color: "blue" }}
          onMouseEnter={() => setShowLoginInfoTooltip(true)}
          onMouseLeave={() => setShowLoginInfoTooltip(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-info"
            viewBox="0 0 16 16"
          >
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </svg>
        </span>
        <Overlay
          target={loginButtonTarget.current}
          show={showLoginInfoTooltip}
          placement="right"
          onExit={() => setShowLoginInfoTooltip(false)}
        >
          {(props) => (
            <Tooltip id="overlay-example" {...props}>
              <span>
                Login should: <br />
                - have at least 6 characters <br />- have only lower- and
                uppercase letters and special characters <br />- start with a
                letter
              </span>
            </Tooltip>
          )}
        </Overlay>
      </>
    );
  };
  const passwordInfoIcon = () => {
    return (
      <>
        <span
          ref={passwordButtonTarget}
          style={{ color: "blue" }}
          onClick={() => setShowPasswordInfoTooltip(!showPasswordInfoTooltip)}
          onMouseEnter={() => setShowPasswordInfoTooltip(true)}
          onMouseLeave={() => setShowPasswordInfoTooltip(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-info"
            viewBox="0 0 16 16"
          >
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </svg>
        </span>
        <Overlay
          target={passwordButtonTarget.current}
          show={showPasswordInfoTooltip}
          placement="right"
          onExit={() => setShowPasswordInfoTooltip(false)}
        >
          {(props) => (
            <Tooltip id="overlay-example" {...props}>
              <p>
                Password should: <br />
                - have at least 6 characters
                <br />- have at least one of special characters
                <br />- start with a letter
              </p>
            </Tooltip>
          )}
        </Overlay>
      </>
    );
  };

  return (
    <div>
      <header>
        <Navbar fixed="top" bg="dark" variant="dark">
          {" "}
          <Navbar.Brand>Pizzeria Web Application</Navbar.Brand>
        </Navbar>
      </header>
      <Card bg="Primary" className="main-card">
        <Card.Body>
          <Card.Title>Register</Card.Title>
          <Form className="center">
            <Container>
              <Row className="align-items-center">
                {/* New account */}
                <Col>
                  <Card className="secondary-card">
                    <Card.Body>
                      <Card.Subtitle style={{ marginBottom: 10 }}>
                        Add your personal data
                      </Card.Subtitle>
                      <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          className={
                            nameValid ? "form-control" : "form-control-error"
                          }
                          placeholder="Enter your first name"
                          onChange={handleNameChange}
                          id="name"
                        />
                        {!nameValid && (
                          <Form.Text className="text-muted">
                            <span style={{ color: "red" }}>
                              <WarningIcon />
                              Name value is not valid
                            </span>
                          </Form.Text>
                        )}
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          className={
                            surnameValid ? "form-control" : "form-control-error"
                          }
                          placeholder="Enter your last name"
                          onChange={handleSurnameChange}
                          id="surname"
                        />
                        {!surnameValid && (
                          <Form.Text className="text-muted">
                            <span style={{ color: "red" }}>
                              <WarningIcon />
                              Last name value is not valid
                            </span>
                          </Form.Text>
                        )}
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          className={
                            emailValid ? "form-control" : "form-control-error"
                          }
                          placeholder="Enter your email"
                          onChange={handleEmailChange}
                          id="email"
                        />
                        {!emailValid && (
                          <Form.Text className="text-muted">
                            <span style={{ color: "red" }}>
                              <WarningIcon />
                              Email value is not valid
                            </span>
                          </Form.Text>
                        )}
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="text"
                          className={
                            phoneNumberValid
                              ? "form-control"
                              : "form-control-error"
                          }
                          placeholder="Enter your phone number"
                          onChange={handlePhoneNumberChange}
                          id="phone-number"
                        />
                        {!phoneNumberValid && (
                          <Form.Text className="text-muted">
                            <span style={{ color: "red" }}>
                              <WarningIcon />
                              Phone number is invalid
                            </span>
                          </Form.Text>
                        )}
                      </Form.Group>
                    </Card.Body>
                  </Card>
                </Col>
                {/* User */}
                <Col>
                  <Card className="secondary-card">
                    <Card.Body>
                      <Card.Subtitle style={{ marginBottom: 10 }}>
                        Add your new account
                      </Card.Subtitle>
                      <Form.Label>Login</Form.Label>
                      <Form.Control
                        type="text"
                        className={
                          loginValid ? "form-control" : "form-control-error"
                        }
                        placeholder="Enter your login"
                        onChange={handleLoginChange}
                      />
                      {!loginValid && (
                        <Form.Text className="text-muted">
                          <WarningIcon />
                          <span style={{ color: "red" }}>
                            Login value is not valid
                          </span>
                          {loginInfoIcon()}
                        </Form.Text>
                      )}

                      <Form.Label>Password</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          className={
                            passwordValid
                              ? "form-control"
                              : "form-control-error"
                          }
                          placeholder="Enter your password"
                          onChange={handlePasswordChange}
                        />
                        <InputGroup.Append>
                          <InputGroup.Text>
                            <img
                              src={
                                showPassword
                                  ? HidePasswordIcon
                                  : ShowPasswordIcon
                              }
                              onClick={togglePassword}
                              alt="show pass"
                            ></img>
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                      {!passwordValid && (
                        <Form.Text className="text-muted">
                          <span style={{ color: "red" }}>
                            <WarningIcon />
                            Password is invalid
                          </span>
                          {passwordInfoIcon()}
                        </Form.Text>
                      )}
                    </Card.Body>
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
          </Form>
        </Card.Body>
      </Card>
      {showUserModal && userModal()}
      {showLoginModal && loginModal()}
    </div>
  );
};

export default RegisterComponent;
