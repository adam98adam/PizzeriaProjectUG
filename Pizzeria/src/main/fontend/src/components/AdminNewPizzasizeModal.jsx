import React, { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import WarningIcon from "./icons/WarningIcon";
import PizzasizeService from "../services/PizzasizeService";

const AdminNewPizzasizeModal = (props) => {
  const [name, setName] = useState("");
  const [pizzacostfactor, setPizzacostfactor] = useState("");
  const [diameter, setDiameter] = useState("");

  const [nameValid, setNameValid] = useState(true);
  const [pizzacostfactorValid, setPizzacostfactorValid] = useState(true);
  const [diameterValid, setDiameterValid] = useState(true);

  const addNewPizzasize = (e) => {
    const validations = [pizzacostfactorValid];
    e.preventDefault();
    let newPizzasize = {
      name: name,
      diameter: diameter,
      pizzacostfactor: pizzacostfactor,
    };
    if (
      Object.values(newPizzasize).every((el) => el.length !== 0) &&
      validations.every((el) => el)
    ) {
      PizzasizeService.addNewPizzasize(newPizzasize)
        .then((res) => {
          // console.log(res.data);
          handleNewPizzasizeModalClose();
        })
        .catch((error) => alert("Pizzasize data is not unique"));
    } else {
    }
  };
  const validatePizzacostfactor = (s) => {
    const re = /^[1-9]{1,2}(\.[0-9]{1,2})?$/;
    return re.test(s) && parseFloat(s) <= 2.5 && parseFloat(s) >= 1.0;
  };
  const validateDiameter = (s) => {
    const re = /^([0-9]|([1-9][0-9]*))$/;
    return re.test(s) && parseInt(s) <= 65 && parseInt(s) >= 10;
  };

  const handlePizzacostfactorChange = (event) => {
    setPizzacostfactor(event.target.value);
    setPizzacostfactorValid(validatePizzacostfactor(event.target.value));
  };

  const handleDiameterChange = (event) => {
    setDiameter(event.target.value);
    setDiameterValid(validateDiameter(event.target.value));
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameValid(event.target.value !== "");
  };

  const handleNewPizzasizeModalClose = () => {
    props.onHide();
    setName("");
    setPizzacostfactor("");
    setDiameter("");
    setNameValid(true);
    setPizzacostfactorValid(true);
    setDiameterValid(true);
  };
  const ifDisable = () => {
    return (
      !(nameValid && pizzacostfactorValid && diameterValid) ||
      (name === "" && pizzacostfactor === "" && diameter === "")
    );
  };

  return (
    <Modal centered {...props} onExit={handleNewPizzasizeModalClose}>
      <Modal.Header className="text-center" closeButton>
        <Modal.Title className="w-100">Add new pizzasize</Modal.Title>
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
                <Form.Group>
                  <Form.Label>Diameter (cm)</Form.Label>
                  <Form.Control
                    name="diameter"
                    className={
                      diameterValid ? "form-control" : "form-control-error"
                    }
                    value={diameter}
                    onChange={handleDiameterChange}
                  />
                  {!diameterValid && (
                    <span style={{ color: "red" }}>
                      <WarningIcon /> Diameter value is not valid (or not
                      from 10 to 65 )
                    </span>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Price cost factor</Form.Label>
                  <Form.Control
                    name="pizzacostfactor"
                    className={
                      pizzacostfactorValid
                        ? "form-control"
                        : "form-control-error"
                    }
                    value={pizzacostfactor}
                    onChange={handlePizzacostfactorChange}
                  />
                  {!pizzacostfactorValid && (
                    <span style={{ color: "red" }}>
                      <WarningIcon /> Price cost factor value is not valid
                    </span>
                  )}
                </Form.Group>

                <Button
                  variant="success"
                  onClick={addNewPizzasize}
                  disabled={ifDisable()}
                >
                  Save
                </Button>
                <Button
                  variant="danger"
                  onClick={handleNewPizzasizeModalClose}
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

export default AdminNewPizzasizeModal;
