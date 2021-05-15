import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import WarningIcon from "./icons/WarningIcon";
import PizzaService from "../services/PizzaService";

const AdminPizzaUpdateModal = (props) => {
  const pizzaId = props.pizza.id;
  const [name, setName] = useState(props.pizza.name);
  const [description, setDescription] = useState(props.pizza.description);
  const [price, setPrice] = useState(props.pizza.price);
  const [image, setImage] = useState(props.pizza.image);

  const initialName = props.pizza.name;
  const initialDescription = props.pizza.description;
  const initialPrice = props.pizza.price;
  const initialImageUrl = props.pizza.image;

  const [nameValid, setNameValid] = useState(true);
  const [descriptionValid, setDescriptionValid] = useState(true);
  const [priceValid, setPriceValid] = useState(true);
  const [imageValid, setImageValid] = useState(true);

  useEffect(() => {
    if (Object.keys(props.pizza).length !== 0) {
      setName(props.pizza.name);
      setDescription(props.pizza.description);
      setPrice(props.pizza.price);
      setImage(props.pizza.image);
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setImage("");
    }
  }, [props.pizza]);
  const updatePizza = (e) => {
    const validations = [priceValid];
    e.preventDefault();
    let updatedPizza = {
      id: pizzaId,
      name: name,
      description: description,
      price: price,
      image: image,
    };
    if (
      Object.values(updatedPizza).every((el) => el.length !== 0) &&
      validations.every((el) => el)
    ) {
      PizzaService.updatePizza(updatedPizza, parseInt(pizzaId, 10))
        .then((res) => {
          // console.log(res.data);
          handlePizzaUpdateModalClose();
        })
        .catch((error) => alert("Pizza data is not unique"));
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

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
    setPriceValid(validatePrice(event.target.value));
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameValid(event.target.value !== "");
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setDescriptionValid(event.target.value !== "");
  };
  const handleImageChange = (event) => {
    setImage(event.target.value);
    setImageValid(validateImage(event.target.value));
  };

  const handlePizzaUpdateModalClose = () => {
    props.onHide();
    setName("");
    setDescription("");
    setPrice("");
    setImage("");
    setNameValid(true);
    setDescriptionValid(true);
    setPriceValid(true);
    setImageValid(true);
  };
  const ifDisable = () => {
    return (
      !(nameValid && descriptionValid && priceValid && imageValid) ||
      (name === initialName &&
        description === initialDescription &&
        price === initialPrice &&
        image === initialImageUrl)
    );
  };
  return (
    <Modal centered {...props} onExit={handlePizzaUpdateModalClose}>
      <Modal.Header className="text-center" closeButton>
        <Modal.Title className="w-100">Update Pizza Details</Modal.Title>
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
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    placeholder="Street"
                    name="street"
                    className={
                      descriptionValid ? "form-control" : "form-control-error"
                    }
                    value={description}
                    as="textarea"
                    onChange={handleDescriptionChange}
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
                    placeholder="Price"
                    name="price"
                    className={
                      priceValid ? "form-control" : "form-control-error"
                    }
                    value={price}
                    onChange={handlePriceChange}
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
                    placeholder="Image url"
                    name="image"
                    className={
                      imageValid ? "form-control" : "form-control-error"
                    }
                    value={image}
                    onChange={handleImageChange}
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
                  onClick={updatePizza}
                  disabled={ifDisable()}
                >
                  Save
                </Button>
                <Button
                  variant="danger"
                  onClick={handlePizzaUpdateModalClose}
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

export default AdminPizzaUpdateModal;
