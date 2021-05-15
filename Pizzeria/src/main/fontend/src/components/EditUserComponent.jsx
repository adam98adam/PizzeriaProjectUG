import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Navbar,
  Row,
} from "react-bootstrap";
import UserService from "../services/UserService";
import PizzeriaUpdatePageNavHeader from "./PizzeriaUpdateNavHeader";
import WarningIcon from "./icons/WarningIcon";

const EditUserComponent = (props) => {
  const idAccount = localStorage.getItem("idAccount");
  const idUser = localStorage.getItem("idUser");
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
    UserService.getUserById(parseInt(idUser, 10)).then((res) => {
      let user = res.data;
      setName(user.name);
      setSurname(user.surname);
      setEmail(user.email);
      setPhoneNumber(user.phonenumber);
    });
  }, []);

  const invalidUserModalClose = () => {
    setShowInvalidUserModal(false);
  };

  const invalidUserModal = () => {
    return (
      <Modal
        show={showInvalidUserModal}
        centered
        onHide={invalidUserModalClose}
      >
        <Modal.Header>
          <Modal.Title>Invalid New data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Data to update is not valid. </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={invalidUserModalClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const cancel = (id) => {
    const userType = localStorage.getItem("userType");
    props.history.push(`/${userType}/${id}`);
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
      UserService.updateUser(user, parseInt(idUser, 10))
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

  return (
    <div>
      <PizzeriaUpdatePageNavHeader />
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
                      placeholder="Name"
                      className={
                        nameValid ? "form-control" : "form-control-error"
                      }
                      name="name"
                      value={name}
                      onChange={changeNameHandler}
                    />
                    {!nameValid && (
                      <Form.Text className="text-muted">
                        <span style={{ color: "red" }}>
                          <WarningIcon /> Name is not valid
                        </span>
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

export default EditUserComponent;
