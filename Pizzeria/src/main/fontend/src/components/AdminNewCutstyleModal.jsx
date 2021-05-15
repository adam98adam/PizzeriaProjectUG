import React, { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import WarningIcon from "./icons/WarningIcon";
import CutstyleService from "../services/CutstyleService";

const AdminNewCutstyleModal = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [nameValid, setNameValid] = useState(true);

  const addNewCutstyle = (e) => {
    const validations = [nameValid];
    e.preventDefault();
    let newCutstyle = {
      name: name,
    };
    if (
      Object.values(newCutstyle).every((el) => el.length !== 0) &&
      validations.every((el) => el)
    ) {
      CutstyleService.addNewCutstyle(newCutstyle)
        .then((res) => {
          console.log(res.data);
          handleNewCutstyleModalClose();
        })
        .catch((error) => {
          console.log(error);
          alert("Sauce data is not unique");
        });
    } else {
    }
  };

  const changeNameHandler = (event) => {
    setName(event.target.value);
    setNameValid(event.target.value !== "");
  };

  const handleNewCutstyleModalClose = () => {
    props.onHide();
    setName("");
    setPrice("");
  };

  const ifDisable = () => {
    return !nameValid || name === "";
  };
  return (
    <Modal centered {...props} onExit={handleNewCutstyleModalClose}>
      <Modal.Header className="text-center" closeButton>
        <Modal.Title className="w-100">Add new Cutstyle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="center">
          <Container fluid>
            <Row>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Name </Form.Label>
                  <Form.Control
                    name="name"
                    className={
                      nameValid ? "form-control" : "form-control-error"
                    }
                    value={name}
                    onChange={changeNameHandler}
                  />
                  {!nameValid && (
                    <span style={{ color: "red" }}>
                      <WarningIcon /> Name is empty
                    </span>
                  )}
                </Form.Group>
                <Button
                  variant="success"
                  onClick={addNewCutstyle}
                  disabled={ifDisable()}
                >
                  Save
                </Button>
                <Button
                  variant="danger"
                  onClick={handleNewCutstyleModalClose}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AdminNewCutstyleModal;
