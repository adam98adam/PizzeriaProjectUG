import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import WarningIcon from "./icons/WarningIcon";
import BakestyleService from "../services/BakestyleService";

const AdminBakestyleUpdateModal = (props) => {
  const bakestyleId = props.bakestyle.id;
  const initialName = props.bakestyle.name;

  const [name, setName] = useState(props.bakestyle.name);
  const [nameValid, setNameValid] = useState(true);

  useEffect(() => {
    if (Object.keys(props.bakestyle).length !== 0) {
      setName(props.bakestyle.name);
    } else {
      setName("");
    }
  }, [props.bakestyle]);

  const updateBakestyle = (e) => {
    e.preventDefault();
    let updatedDrink = {
      id: bakestyleId,
      name: name,
    };
    if (Object.values(updatedDrink).every((el) => el.length !== 0)) {
      BakestyleService.updateBakestyle(updatedDrink, parseInt(bakestyleId, 10))
        .then((res) => {
          // console.log(res.data);
          handleBakestyleUpdateModalClose();
        })
        .catch((error) => alert("Drink data is not unique"));
    } else {
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameValid(event.target.value !== "");
  };

  const handleBakestyleUpdateModalClose = () => {
    props.onHide();
    setName("");
    setNameValid(true);
  };
  const ifDisable = () => {
    return !nameValid || name === initialName;
  };
  return (
    <Modal centered {...props} onExit={handleBakestyleUpdateModalClose}>
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
                  onClick={updateBakestyle}
                  disabled={ifDisable()}
                >
                  Save
                </Button>
                <Button
                  variant="danger"
                  onClick={handleBakestyleUpdateModalClose}
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

export default AdminBakestyleUpdateModal;
