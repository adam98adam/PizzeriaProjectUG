import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import WarningIcon from "./icons/WarningIcon";
import DrinksService from "../services/DrinksService";

const AdminDrinkUpdateModal = (props) => {
  const drinkId = props.drink.id;
  const [name, setName] = useState(props.drink.name);
  const [price, setPrice] = useState(props.drink.price);

  const initialName = props.drink.name;
  const initialPrice = props.drink.price;

  const [nameValid, setNameValid] = useState(true);
  const [priceValid, setPriceValid] = useState(true);

  useEffect(() => {
    if (Object.keys(props.drink).length !== 0) {
      setName(props.drink.name);
      setPrice(props.drink.price);
    } else {
      setName("");
      setPrice("");
    }
  }, [props.drink]);
  const updateDrink = (e) => {
    const validations = [priceValid];
    e.preventDefault();
    let updatedDrink = {
      id: drinkId,
      name: name,
      price: price,
    };
    if (
      Object.values(updatedDrink).every((el) => el.length !== 0) &&
      validations.every((el) => el)
    ) {
      DrinksService.updateDrink(updatedDrink, parseInt(drinkId, 10))
        .then((res) => {
          console.log(res.data);
          handleDrinkUpdateModalClose();
        })
        .catch((error) => alert("Drink data is not unique"));
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

  const handleDrinkUpdateModalClose = () => {
    props.onHide();
    setName("");
    setPrice("");
    setNameValid(true);
    setPriceValid(true);
  };
  const ifDisable = () => {
    return (
      !(nameValid && priceValid) ||
      (name === initialName && price === initialPrice)
    );
  };
  return (
    <Modal centered {...props} onExit={handleDrinkUpdateModalClose}>
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
                    placeholder="Price"
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
                  onClick={updateDrink}
                  disabled={ifDisable()}
                >
                  Save
                </Button>
                <Button
                  variant="danger"
                  onClick={handleDrinkUpdateModalClose}
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

export default AdminDrinkUpdateModal;
