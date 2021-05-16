import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import WarningIcon from "./icons/WarningIcon";
import CrustService from "../services/CrustService";

const AdminCrustUpdateModal = (props) => {
  const crustId = props.crust.id;
  const [crust, setCrust] = useState(props.crust.crust);
  const [price, setPrice] = useState(props.crust.price);

  const initialCrust = props.crust.crust;
  const initialPrice = props.crust.price;

  const [crustValid, setCrustValid] = useState(true);
  const [priceValid, setPriceValid] = useState(true);

  useEffect(() => {
    if (Object.keys(props.crust).length !== 0) {
      setCrust(props.crust.crust);
      setPrice(props.crust.price);
    } else {
      setCrust("");
      setPrice("");
    }
  }, [props.crust]);
  const updateCrust = (e) => {
    const validations = [priceValid];
    e.preventDefault();
    let updatedCrust = {
      id: crustId,
      crust: crust,
      price: price,
    };
    if (
      Object.values(updatedCrust).every((el) => el.length !== 0) &&
      validations.every((el) => el)
    ) {
      CrustService.updateCrust(updatedCrust, parseInt(crustId, 10))
        .then((res) => {
          // console.log(res.data);
          handleCrustUpdateModalClose();
        })
        .catch((error) => alert("Crust data is not unique"));
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
    setCrust(event.target.value);
    setCrustValid(event.target.value !== "");
  };

  const handleCrustUpdateModalClose = () => {
    props.onHide();
    setCrust("");
    setPrice("");
    setCrustValid(true);
    setPriceValid(true);
  };
  const ifDisable = () => {
    return (
      !(crustValid && priceValid) ||
      (crust === initialCrust && price === initialPrice)
    );
  };
  return (
    <Modal centered {...props} onExit={handleCrustUpdateModalClose}>
      <Modal.Header className="text-center" closeButton>
        <Modal.Title className="w-100">Update Crust Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="center">
          <Container fluid>
            <Row>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Name </Form.Label>
                  <Form.Control
                    name="crust"
                    className={
                      crustValid ? "form-control" : "form-control-error"
                    }
                    value={crust}
                    onChange={handleNameChange}
                  />
                  {!crustValid && (
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
                  onClick={updateCrust}
                  disabled={ifDisable()}
                >
                  Save
                </Button>
                <Button
                  variant="danger"
                  onClick={handleCrustUpdateModalClose}
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

export default AdminCrustUpdateModal;
