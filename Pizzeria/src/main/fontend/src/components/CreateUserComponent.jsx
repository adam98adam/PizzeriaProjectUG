import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import UserService from "../services/UserService";

const CreateUserComponent = (props) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailValid, setEmailValid] = useState(false);

  const saveUser = (e) => {
    e.preventDefault();

    let user = {
      name: name,
      surname: surname,
      email: email,
      phonenumber: phoneNumber,
    };
    // console.log("user => " + JSON.stringify(user));
    UserService.createUser(user).then((res) => {
      this.props.history.push("/users");
    });
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const validateEmail = (email) => {
    const re = /^[a-z0-9]{3,}@[a-z]{2,}.[a-z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailValid(validateEmail(event.target.value));
    // console.log(emailValid);
  };

  const handlePhonenumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const cancel = () => {
    props.history.push("/users");
  };

  return (
    <Card>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h3 className="text-center">Add User</h3>
            <Card.Body>
              <Form>
                <Form.Group>
                  <Form.Label> Name : </Form.Label>
                  <Form.Control
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label> Surname : </Form.Label>
                  <Form.Control
                    placeholder="Surname"
                    name="surname"
                    value={surname}
                    onChange={handleSurnameChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label> Email : </Form.Label>
                  <Form.Control
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                  />

                  <Form.Text className="text-muted"> Wrong email</Form.Text>
                </Form.Group>
                <Form.Group>
                  <Form.Label> Phonenumber : </Form.Label>
                  <Form.Control
                    placeholder="Phonenumber"
                    name="phonenumber"
                    value={phoneNumber}
                    onChange={handlePhonenumberChange}
                  />
                </Form.Group>
                <Button
                  disabled={() => {}}
                  variant="success"
                  onClick={saveUser}
                >
                  Save
                </Button>
                <Button
                  variant="danger"
                  onClick={cancel}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </Button>
              </Form>
            </Card.Body>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default CreateUserComponent;
