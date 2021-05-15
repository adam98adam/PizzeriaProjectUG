import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import WarningIcon from "./icons/WarningIcon";
import PizzasizeService from "../services/PizzasizeService";

const AdminPizzasizeUpdateModal = (props) => {
  const pizzasizeId = props.pizzasize.id;
  const [name, setName] = useState(props.pizzasize.name);
  const [pizzacostfactor, setPizzacostfactor] = useState(
    props.pizzasize.pizzacostfactor
  );
  const [diameter, setDiameter] = useState(props.pizzasize.diameter);

  const initialName = props.pizzasize.name;
  const initialPizzacostfactor = props.pizzasize.pizzacostfactor;
  const initialDiameter = props.pizzasize.diameter;

  const [nameValid, setNameValid] = useState(true);
  const [pizzacostfactorValid, setPizzacostfactorValid] = useState(true);
  const [diameterValid, setDiameterValid] = useState(true);

  useEffect(() => {
    if (Object.keys(props.pizzasize).length !== 0) {
      setName(props.pizzasize.name);
      setPizzacostfactor(props.pizzasize.pizzacostfactor);
      setDiameter(props.pizzasize.diameter);
    } else {
      setName("");
      setPizzacostfactor("");
      setDiameter("");
    }
  }, [props.pizzasize]);
  const updatePizzasize = (e) => {
    const validations = [pizzacostfactorValid];
    e.preventDefault();
    let updatedPizzasize = {
      id: pizzasizeId,
      name: name,
      diameter: diameter,
      pizzacostfactor: pizzacostfactor,
    };
    if (
      Object.values(updatedPizzasize).every((el) => el.length !== 0) &&
      validations.every((el) => el)
    ) {
      PizzasizeService.updatePizzasize(
        updatedPizzasize,
        parseInt(pizzasizeId, 10)
      )
        .then((res) => {
          // console.log(res.data);
          handlePizzasizeUpdateModalClose();
        })
        .catch((error) => alert("Pizzasize data is not unique"));
    } else {
    }
  };
  const validatePizzacostfactor = (s) => {
    const re = /^([0-9]|([1-9][0-9]*))(\.[0-9]+)?$/;
    return re.test(s);
  };
  const validateDiameter = (s) => {
    const re = /^([0-9]|([1-9][0-9]*))$/;
    return re.test(s);
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

  const handlePizzasizeUpdateModalClose = () => {
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
      (name === initialName &&
        pizzacostfactor === initialPizzacostfactor &&
        diameter === initialDiameter)
    );
  };
  return (
    <Modal centered {...props} onExit={handlePizzasizeUpdateModalClose}>
      <Modal.Header className="text-center" closeButton>
        <Modal.Title className="w-100">Update Pizzasize Details</Modal.Title>
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
                      <WarningIcon /> Diameter is not valid
                    </span>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Pizzacostfactor</Form.Label>
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
                      <WarningIcon /> Pizzacostfactor is not valid
                    </span>
                  )}
                </Form.Group>

                <Button
                  variant="success"
                  onClick={updatePizzasize}
                  disabled={ifDisable()}
                >
                  Save
                </Button>
                <Button
                  variant="danger"
                  onClick={handlePizzasizeUpdateModalClose}
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

export default AdminPizzasizeUpdateModal;
