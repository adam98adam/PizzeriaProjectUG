import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Overlay,
  Row,
  Tooltip,
} from "react-bootstrap";
import AccountService from "../services/AccountService";
import UpdatePageNavHeader from "./UpdatePageNavHeader";
import WarningIcon from "./icons/WarningIcon";
import ShowPasswordIcon from "../images/eye-fill.svg";
import HidePasswordIcon from "../images/eye-slash-fill.svg";

const UpdateAccountComponent = (props) => {
  const loginButtonTarget = useRef(null);
  const passwordButtonTarget = useRef(null);

  const id = localStorage.getItem("idAccount");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const initialLogin = useRef("");
  const initialPassword = useRef("");
  const [showInvalidAccountUpdateModal, setShowInvalidAccountUpdateModal] =
    useState(false);

  const [loginValid, setLoginValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const [showLoginInfoTooltip, setShowLoginInfoTooltip] = useState(false);
  const [showPasswordInfoTooltip, setShowPasswordInfoTooltip] = useState(false);

  const [disableSaveButton, setDisableSaveButton] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    // console.log(id);
    AccountService.getAccountById(
      parseInt(localStorage.getItem("idAccount"), 10)
    )
      .then((res) => {
        let account = res.data;
        initialLogin.current = account.login;
        initialPassword.current = account.password;
        setLogin(account.login);
        setPassword(account.password);
      })
      .catch((err) => {
        // console.log(err.response);
        setShowInvalidAccountUpdateModal(true);
      });
  }, [props.match.params.id]);

  useEffect(() => {
    const saveButtonDisabled = () => {
      return (
        !loginValid ||
        !passwordValid ||
        login === "" ||
        password === "" ||
        (login === initialLogin.current && password === initialPassword.current)
      );
    };
    setDisableSaveButton(saveButtonDisabled());
  }, [login, password, loginValid, passwordValid]);
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
          <p>
            One or more of account fields are empty not valid or not unique.
            Please fill up these fields with different values.{" "}
          </p>
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
          // console.log(error.response);
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

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
    setLoginValid(validateLogin(event.target.value));
  };

  const validatePassword = (password) => {
    const re = /^\w+(\w+[.@?]\w*)*$/;
    return re.test(password);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordValid(validatePassword(event.target.value));
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const loginInfoIcon = () => {
    return (
      <>
        <span
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
        </span>
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
        <span
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
        </span>
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
      <UpdatePageNavHeader />
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
                      value={login}
                      onChange={handleLoginChange}
                    />
                    {!loginValid && (
                      <Form.Text className="text-muted">
                        <span style={{ color: "red" }}>
                          <WarningIcon />
                          Login value is not valid
                        </span>
                        {loginInfoIcon()}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label> Password : </Form.Label>
                    <InputGroup>
                      <Form.Control
                        placeholder="Password"
                        className={
                          passwordValid ? "form-control" : "form-control-error"
                        }
                        name="password"
                        value={password}
                        type={showPassword ? "text" : "password"}
                        onChange={handlePasswordChange}
                      />
                      <InputGroup.Append>
                        <InputGroup.Text>
                          <img
                            src={
                              showPassword ? HidePasswordIcon : ShowPasswordIcon
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
                  </Form.Group>
                  <Button
                    variant="success"
                    onClick={updateAccount}
                    disabled={disableSaveButton}
                  >
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

export default UpdateAccountComponent;
