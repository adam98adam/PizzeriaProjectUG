import React, { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import WarningIcon from "./icons/WarningIcon";
import DrinksService from "../services/DrinksService";

const AdminNewDrinkModal = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [nameValid, setNameValid] = useState(true);
  const [priceValid, setPriceValid] = useState(true);

  const addNewDrink = (e) => {
    const validations = [priceValid, nameValid];
    e.preventDefault();
    let newDrink = {
      name: name,
      price: price,
    };
    if (
      Object.values(newDrink).every((el) => el.length !== 0) &&
      validations.every((el) => el)
    ) {
      DrinksService.addNewDrink(newDrink)
        .then((res) => {
          console.log(res.data);
          handleNewDrinkModalClose();
        })
        .catch((error) => {
          console.log(error);
          alert("Drink data is not unique");
        });
    } else {
    }
  };
  const validatePrice = (s) => {
    const re = /^([0-9]|([1-9][0-9]*))(\.[0-9]+)?$/;
    return re.test(s);
  };

  const changePriceHandler = (event) => {
    setPrice(event.target.value);
    setPriceValid(validatePrice(event.target.value));
  };

  const changeNameHandler = (event) => {
    setName(event.target.value);
    setNameValid(event.target.value !== "");
  };

  const handleNewDrinkModalClose = () => {
    props.onHide();
    setName("");
    setPrice("");
    setNameValid(true);
    setPriceValid(true);
  };

  const ifDisable = () => {
    return !(nameValid && priceValid) || name === "" || price === "";
  };
  return (
    <Modal centered {...props} onExit={handleNewDrinkModalClose}>
      <Modal.Header className="text-center" closeButton>
        <Modal.Title className="w-100">Add new Drink</Modal.Title>
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
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    name="price"
                    className={
                      priceValid ? "form-control" : "form-control-error"
                    }
                    value={price}
                    onChange={changePriceHandler}
                  />
                  {!priceValid && (
                    <span style={{ color: "red" }}>
                      <WarningIcon /> Price is not valid
                    </span>
                  )}
                </Form.Group>

                <Button
                  variant="success"
                  onClick={addNewDrink}
                  disabled={ifDisable()}
                >
                  Save
                </Button>
                <Button
                  variant="danger"
                  onClick={handleNewDrinkModalClose}
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

export default AdminNewDrinkModal;
