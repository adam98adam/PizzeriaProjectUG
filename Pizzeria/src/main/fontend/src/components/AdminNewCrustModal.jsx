import React, { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import WarningIcon from "./icons/WarningIcon";
import CrustService from "../services/CrustService";

const AdminNewCrustModal = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [nameValid, setNameValid] = useState(true);
  const [priceValid, setPriceValid] = useState(true);

  const addNewCrust = (e) => {
    const validations = [priceValid, nameValid];
    e.preventDefault();
    let newCrust = {
      crust: name,
      price: price,
    };
    if (
      Object.values(newCrust).every((el) => el.length !== 0) &&
      validations.every((el) => el)
    ) {
      CrustService.addNewCrust(newCrust)
        .then((res) => {
          // console.log(res.data);
          handleNewCrustModalClose();
        })
        .catch((error) => {
          // console.log(error);
          alert("Crust data is not unique");
        });
    } else {
    }
  };
  const validatePrice = (s) => {
    const re = /^([0-9]|([1-9][0-9]*))(\.[0-9]{1,2})?$/;
    return re.test(s) && parseFloat(s) < 6.01 && parseFloat(s) > 0.99;
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
    setPriceValid(validatePrice(event.target.value));
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameValid(event.target.value !== "");
  };

  const handleNewCrustModalClose = () => {
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
    <Modal centered {...props} onExit={handleNewCrustModalClose}>
      <Modal.Header className="text-center" closeButton>
        <Modal.Title className="w-100">Add new Crust</Modal.Title>
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
                      <WarningIcon /> Price value is not valid (or not from
                      1.00$ to 6.00$)
                    </span>
                  )}
                </Form.Group>

                <Button
                  variant="success"
                  onClick={addNewCrust}
                  disabled={ifDisable()}
                >
                  Save
                </Button>
                <Button
                  variant="danger"
                  onClick={handleNewCrustModalClose}
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

export default AdminNewCrustModal;
