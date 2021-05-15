import React, { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import WarningIcon from "./icons/WarningIcon";
import PizzaService from "../services/PizzaService";

const AdminNewPizzaModal = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const initialName = "";
  const initialDescription = "";
  const initialPrice = "";
  const initialImageUrl = "";

  const [nameValid, setNameValid] = useState(true);
  const [descriptionValid, setDescriptionValid] = useState(true);
  const [priceValid, setPriceValid] = useState(true);
  const [imageValid, setImageValid] = useState(true);

  const addNewPizza = (e) => {
    const validations = [priceValid, imageValid, nameValid, descriptionValid];
    e.preventDefault();
    let newPizza = {
      name: name,
      description: description,
      price: price,
      image: image,
    };
    if (
      Object.values(newPizza).every((el) => el.length !== 0) &&
      validations.every((el) => el)
    ) {
      PizzaService.addPizza(newPizza)
        .then((res) => {
          console.log(res.data);
          handleNewPizzaModalClose();
        })
        .catch((error) => {
          console.log(error);
          alert("Pizza data is not unique");
        });
    } else {
    }
  };
  const validatePrice = (s) => {
    const re = /^([0-9]|([1-9][0-9]*))(\.[0-9]+)?$/;
    return re.test(s);
  };
  const validateImage = (s) => {
    const re = /^((http(s)?)?:\/\/.*\.(?:png|jpg))$/;
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

  const changeDescriptionHandler = (event) => {
    setDescription(event.target.value);
    setDescriptionValid(event.target.value !== "");
  };
  const changeImageHandler = (event) => {
    setImage(event.target.value);
    setImageValid(validateImage(event.target.value));
  };

  const handleNewPizzaModalClose = () => {
    props.onHide();
    setName("");
    setDescription("");
    setPrice("");
    setImage("");
    setNameValid(true);
    setDescriptionValid(true);
    setImageValid(true);
    setPriceValid(true);
  };
  const ifDisable = () => {
    return (
      !(nameValid && descriptionValid && priceValid && imageValid) ||
      name === initialName ||
      description === initialDescription ||
      price === initialPrice ||
      image === initialImageUrl
    );
  };
  return (
    <Modal centered {...props} onExit={handleNewPizzaModalClose}>
      <Modal.Header className="text-center" closeButton>
        <Modal.Title className="w-100">Add new Pizza</Modal.Title>
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
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    name="description"
                    className={
                      descriptionValid ? "form-control" : "form-control-error"
                    }
                    value={description}
                    as="textarea"
                    onChange={changeDescriptionHandler}
                  />
                  {!descriptionValid && (
                    <span style={{ color: "red" }}>
                      <WarningIcon />
                      Description is empty
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
                <Form.Group>
                  <Form.Label>Image url</Form.Label>
                  <Form.Control
                    name="image"
                    className={
                      imageValid ? "form-control" : "form-control-error"
                    }
                    value={image}
                    onChange={changeImageHandler}
                  />
                  {!imageValid && (
                    <span style={{ color: "red" }}>
                      <WarningIcon />
                      Image url is not valid
                    </span>
                  )}
                </Form.Group>
                <Button
                  variant="success"
                  onClick={addNewPizza}
                  disabled={ifDisable()}
                >
                  Save
                </Button>
                <Button
                  variant="danger"
                  onClick={handleNewPizzaModalClose}
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

export default AdminNewPizzaModal;
