import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Overlay,
  Row,
  Tooltip,
} from "react-bootstrap";
import AccountService from "../services/AccountService";
import UserService from "../services/UserService";
import PizzeriaUpdatePageNavHeader from "./PizzeriaUpdateNavHeader";
import WarningIcon from "./icons/WarningIcon";

const EditAccountComponent = (props) => {
  const loginButtonTarget = useRef(null);
  const passwordButtonTarget = useRef(null);
  const [id, setId] = useState(props.match.params.id);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showInvalidAccountUpdateModal, setShowInvalidAccountUpdateModal] =
    useState(false);

  const [loginValid, setLoginValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const [showLoginInfoTooltip, setShowLoginInfoTooltip] = useState(false);
  const [showPasswordInfoTooltip, setShowPasswordInfoTooltip] = useState(false);

  useEffect(() => {
    console.log(id);
    AccountService.getAccountById(parseInt(props.match.params.id, 10))
      .then((res) => {
        let account = res.data;
        setLogin(account.login);
        setPassword(account.password);
      })
      .catch((err) => {
        console.log(err.response);
        setShowInvalidAccountUpdateModal(true);
      });
  }, [props.match.params.id]);

  const cancel = (id) => {
    const userType = localStorage.getItem("userType");
    props.history.push(`/${userType}/${id}`);
  };

  const invalidAccountUpdateModalClose = () => {
    setShowInvalidAccountUpdateModal(false);
  };

  const invalidAccountUpdateModal = () => {
    return (
      <Modal
        show={showInvalidAccountUpdateModal}
        centered
        onHide={invalidAccountUpdateModalClose}
      >
        <Modal.Header>
          <Modal.Title>Invalid New data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Data to update is not valid. </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={invalidAccountUpdateModalClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const updateAccount = (e) => {
    e.preventDefault();
    const loginValidations = [loginValid, passwordValid];
    let account = { login: login, password: password };
    if (
      Object.values(account).every((el) => el) &&
      loginValidations.every((el) => el)
    ) {
      AccountService.updateAccount(account, parseInt(id, 10))
        .then((res) => {
          cancel(parseInt(id, 10));
        })
        .catch((error) => {
          console.log(error.response);
          setShowInvalidAccountUpdateModal(true);
        });
    } else {
      setShowInvalidAccountUpdateModal(true);
    }
  };

  const validateLogin = (login) => {
    const re = /[a-zA-Z][a-zA-Z0-9]{3,}$/;
    return re.test(login);
  };

  const changeLoginHandler = (event) => {
    setLogin(event.target.value);
    setLoginValid(validateLogin(event.target.value));
  };

  const validatePassword = (password) => {
    const re = /^\w+(\w+[\.@\?]\w*)+$/;
    return re.test(password);
  };

  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
    setPasswordValid(validatePassword(event.target.value));
  };
  const loginInfoIcon = () => {
    return (
      <>
        <a
          ref={loginButtonTarget}
          onClick={() => setShowLoginInfoTooltip(!showLoginInfoTooltip)}
          style={{ color: "blue" }}
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
        </a>
        <Overlay
          target={loginButtonTarget.current}
          show={showLoginInfoTooltip}
          placement="right"
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
        <a
          ref={passwordButtonTarget}
          onClick={() => setShowPasswordInfoTooltip(!showPasswordInfoTooltip)}
          style={{ color: "blue" }}
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
        </a>
        <Overlay
          target={passwordButtonTarget.current}
          show={showPasswordInfoTooltip}
          placement="right"
        >
          {(props) => (
            <Tooltip id="overlay-example" {...props}>
              <p>
                Password should: <br />
                - have at least 6 characters
                <br />- have at least one of characters(. or @)
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
      <PizzeriaUpdatePageNavHeader />
      <Card className="main-card">
        <Card.Body>
          <Card.Title>Update Acccount</Card.Title>
          <Form className="center">
            <Container>
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <Form.Group>
                    <Form.Label> Login : </Form.Label>
                    <Form.Control
                      placeholder="Login"
                      name="login"
                      className={
                        loginValid ? "form-control" : "form-control-error"
                      }
                      className="form-control"
                      value={login}
                      onChange={changeLoginHandler}
                    />
                    {!loginValid && (
                      <Form.Text className="text-muted">
                        <span style={{ color: "red" }}>
                          <WarningIcon />
                          Login is not valid
                        </span>
                        {loginInfoIcon()}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label> Password : </Form.Label>
                    <Form.Control
                      placeholder="Password"
                      className={
                        passwordValid ? "form-control" : "form-control-error"
                      }
                      name="password"
                      className="form-control"
                      value={password}
                      onChange={changePasswordHandler}
                    />
                    {!passwordValid && (
                      <Form.Text className="text-muted">
                        <span style={{ color: "red" }}>
                          <WarningIcon />
                          Password is invalid
                        </span>
                        {passwordInfoIcon()}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Button variant="success" onClick={updateAccount}>
                    Save
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => cancel(parseInt(id, 10))}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </Card.Body>
      </Card>
      {showInvalidAccountUpdateModal && invalidAccountUpdateModal()}
    </div>
  );
};

export default EditAccountComponent;
