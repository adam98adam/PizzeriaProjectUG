import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import WarningIcon from "./icons/WarningIcon";
import SaucesService from "../services/SaucesService";

const AdminSauceUpdateModal = (props) => {
  const sauceId = props.sauce.id;
  const [name, setName] = useState(props.sauce.name);
  const [price, setPrice] = useState(props.sauce.price);

  const initialName = props.sauce.name;
  const initialPrice = props.sauce.price;

  const [nameValid, setNameValid] = useState(true);
  const [priceValid, setPriceValid] = useState(true);

  useEffect(() => {
    if (Object.keys(props.sauce).length !== 0) {
      setName(props.sauce.name);
      setPrice(props.sauce.price);
    } else {
      setName("");
      setPrice("");
    }
  }, [props.sauce]);
  const updateSauce = (e) => {
    const validations = [priceValid];
    e.preventDefault();
    let updatedSauce = {
      id: sauceId,
      name: name,
      price: price,
    };
    if (
      Object.values(updatedSauce).every((el) => el.length !== 0) &&
      validations.every((el) => el)
    ) {
      SaucesService.updateSauce(updatedSauce, parseInt(sauceId, 10))
        .then((res) => {
          // console.log(res.data);
          handleSauceUpdateModalClose();
        })
        .catch((error) => alert("Sauce data is not unique"));
    } else {
    }
  };
  const validatePrice = (s) => {
    const re = /^([0-9]|([1-9][0-9]*))(\.[0-9]+)?$/;
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

  const handleSauceUpdateModalClose = () => {
    props.onHide();
    setName(props.sauce.name);
    setPrice(props.sauce.price);
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
    <Modal centered {...props} onExit={handleSauceUpdateModalClose}>
      <Modal.Header className="text-center" closeButton>
        <Modal.Title className="w-100">Update Sauce Details</Modal.Title>
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
                  <Form.Label>Price</Form.Label>
                  <Form.Control
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

                <Button
                  variant="success"
                  onClick={updateSauce}
                  disabled={ifDisable()}
                >
                  Save
                </Button>
                <Button
                  variant="danger"
                  onClick={handleSauceUpdateModalClose}
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

export default AdminSauceUpdateModal;
