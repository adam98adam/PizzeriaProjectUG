import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import UserService from "../services/UserService";
import WarningIcon from "./icons/WarningIcon";

const UpdateUserComponent = (props) => {
  const id = props.match.params.id;
  const [idAccount, setIdAccount] = useState(props.match.params.idAccount);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [nameValid, setNameValid] = useState(true);
  const [surnameValid, setSurnameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [phoneNumberValid, setPhoneNumberValid] = useState(true);

  const [showInvalidUserModal, setShowInvalidUserModal] = useState(false);

  useEffect(() => {
    UserService.getUserById(props.match.params.id)
      .then((res) => {
        let user = res.data;
        this.setState({
          name: user.name,
          surname: user.surname,
          email: user.email,
          phonenumber: user.phonenumber,
        });
      })
      .catch((er) => {
        console.log(er);
      });
  }, [props.match.params.id]);

  const updateUser = (e) => {
    const validations = [nameValid, surnameValid, emailValid, phoneNumberValid];
    let user = {
      name: name,
      surname: surname,
      email: email,
      phonenumber: phoneNumber,
    };
    e.preventDefault();
    if (
      Object.values(user).every((el) => el) &&
      validations.every((el) => el)
    ) {
      console.log(user);
      UserService.updateUser(user, parseInt(id, 10))
        .then((res) => {
          cancel(parseInt(idAccount, 10));
        })
        .catch((error) => {
          console.log(error.response);
          setShowInvalidUserModal(true);
        });
    } else {
      setShowInvalidUserModal(true);
    }
  };

  const cancel = () => {
    props.history.push("/users");
  };

  const validateName = (name) => {
    const re = /^[A-Z][a-z]+$/;
    return re.test(name);
  };

  const changeNameHandler = (event) => {
    setName(event.target.value);
    setNameValid(validateName(event.target.value));
    console.log(validateName(event.target.name));
  };

  // surname
  const validateSurname = (surname) => {
    const re = /^[A-Z][a-z]+$/;
    return re.test(surname);
  };
  const changeSurnameHandler = (event) => {
    setSurname(event.target.value);
    setSurnameValid(validateSurname(event.target.value));
  };

  // email
  const validateEmail = (email) => {
    const re = /^([a-z0-9]+\.?)+[a-z0-9]+@[a-z]{2,}\.[a-z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const changeEmailHandler = (event) => {
    setEmail(event.target.value);
    setEmailValid(validateEmail(event.target.value));
  };

  // phone number
  const validatePhoneNumber = (phoneNumber) => {
    const re = /^(\+[0-9]{2,3})?[0-9]{9}$/;
    return re.test(phoneNumber);
  };

  const changePhoneNumberHandler = (event) => {
    setPhoneNumber(event.target.value);
    setPhoneNumberValid(validatePhoneNumber(event.target.value));
  };

  const handleInvalidUserModalClose = () => {
    setShowInvalidUserModal(false);
  };

  const invalidUserModal = () => {
    return (
      <Modal
        show={showInvalidUserModal}
        centered
        onHide={handleInvalidUserModalClose}
      >
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
          <Button variant="primary" onClick={handleInvalidUserModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div>
      <Card className="main-card">
        <Card.Body>
          <Card.Title>Update User</Card.Title>
          <Form className="center">
            <Container>
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <Form.Group>
                    <Form.Label> Name : </Form.Label>
                    <Form.Control
                      border={nameValid ? "none" : "danger"}
                      placeholder="Name"
                      name="name"
                      value={name}
                      onChange={changeNameHandler}
                    />
                    {!nameValid && (
                      <Form.Text className="text-muted">
                        <span style={{ color: "red" }}>Name is not valid</span>
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label> Surname : </Form.Label>
                    <Form.Control
                      placeholder="Surname"
                      className={
                        surnameValid ? "form-control" : "form-control-error"
                      }
                      name="surname"
                      value={surname}
                      onChange={changeSurnameHandler}
                    />
                    {!surnameValid && (
                      <Form.Text className="text-muted">
                        <span style={{ color: "red" }}>
                          <WarningIcon /> Last name is not valid
                        </span>
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label> Email : </Form.Label>
                    <Form.Control
                      placeholder="Email"
                      className={
                        emailValid ? "form-control" : "form-control-error"
                      }
                      name="email"
                      value={email}
                      onChange={changeEmailHandler}
                    />
                    {!emailValid && (
                      <Form.Text className="text-muted">
                        <span style={{ color: "red" }}>
                          <WarningIcon /> Email is not valid
                        </span>
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label> Phonenumber : </Form.Label>
                    <Form.Control
                      placeholder="Phonenumber"
                      className={
                        phoneNumberValid ? "form-control" : "form-control-error"
                      }
                      name="phonenumber"
                      value={phoneNumber}
                      onChange={changePhoneNumberHandler}
                    />
                    {!phoneNumberValid && (
                      <Form.Text className="text-muted">
                        <p style={{ color: "red" }}>
                          <WarningIcon /> Phone number is invalid
                        </p>
                      </Form.Text>
                    )}
                  </Form.Group>

                  <Button variant="success" onClick={updateUser}>
                    Save
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => cancel(parseInt(idAccount, 10))}
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
      {showInvalidUserModal && invalidUserModal()}
    </div>
  );
};
export default UpdateUserComponent;
