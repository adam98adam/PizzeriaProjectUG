import React, { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import WarningIcon from "./icons/WarningIcon";
import BakestyleService from "../services/BakestyleService";

const AdminNewBakestyleModal = (props) => {
  const [name, setName] = useState("");

  const [nameValid, setNameValid] = useState(true);

  const addNewBakestyle = (e) => {
    const validations = [nameValid];
    e.preventDefault();
    let newBakestyle = {
      name: name,
    };
    if (
      Object.values(newBakestyle).every((el) => el.length !== 0) &&
      validations.every((el) => el)
    ) {
      BakestyleService.addNewBakestyle(newBakestyle)
        .then((res) => {
          // console.log(res.data);
          handleNewBakestyleModalClose();
        })
        .catch((error) => {
          // console.log(error);
          alert("Sauce data is not unique");
        });
    } else {
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameValid(event.target.value !== "");
  };

  const handleNewBakestyleModalClose = () => {
    props.onHide();
    setName("");
  };

  const ifDisable = () => {
    return !nameValid || name === "";
  };
  return (
    <Modal centered {...props} onExit={handleNewBakestyleModalClose}>
      <Modal.Header className="text-center" closeButton>
        <Modal.Title className="w-100">Add new Bakestyle</Modal.Title>
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
                    onChange={handleNameChange}
                  />
                  {!nameValid && (
                    <span style={{ color: "red" }}>
                      <WarningIcon /> Name is empty
                    </span>
                  )}
                </Form.Group>
                <Button
                  variant="success"
                  onClick={addNewBakestyle}
                  disabled={ifDisable()}
                >
                  Save
                </Button>
                <Button
                  variant="danger"
                  onClick={handleNewBakestyleModalClose}
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

export default AdminNewBakestyleModal;
