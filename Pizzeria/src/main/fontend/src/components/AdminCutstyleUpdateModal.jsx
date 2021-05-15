import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import WarningIcon from "./icons/WarningIcon";
import CutstyleService from "../services/CutstyleService";

const AdminCutstyleUpdateModal = (props) => {
  const cutstyleId = props.cutstyle.id;
  const [name, setName] = useState(props.cutstyle.name);

  const initialName = props.cutstyle.name;

  const [nameValid, setNameValid] = useState(true);

  useEffect(() => {
    if (Object.keys(props.cutstyle).length !== 0) {
      setName(props.cutstyle.name);
    } else {
      setName("");
    }
  }, [props.cutstyle]);
  const updateCutstyle = (e) => {
    e.preventDefault();
    let updatedDrink = {
      id: cutstyleId,
      name: name,
    };
    if (Object.values(updatedDrink).every((el) => el.length !== 0)) {
      CutstyleService.updateCutstyle(updatedDrink, parseInt(cutstyleId, 10))
        .then((res) => {
          // console.log(res.data);
          handleCutstyleUpdateModalClose();
        })
        .catch((error) => alert("Drink data is not unique"));
    } else {
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameValid(event.target.value !== "");
  };

  const handleCutstyleUpdateModalClose = () => {
    props.onHide();
    setName("");
    setNameValid(true);
  };
  const ifDisable = () => {
    return !nameValid || name === initialName;
  };
  return (
    <Modal centered {...props} onExit={handleCutstyleUpdateModalClose}>
      <Modal.Header className="text-center" closeButton>
        <Modal.Title className="w-100">Update Drink Details</Modal.Title>
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
                  onClick={updateCutstyle}
                  disabled={ifDisable()}
                >
                  Save
                </Button>
                <Button
                  variant="danger"
                  onClick={handleCutstyleUpdateModalClose}
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

export default AdminCutstyleUpdateModal;
