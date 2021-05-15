import React, { useEffect, useState } from "react";
import AddressService from "../services/AddressService";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import PizzeriaUpdatePageNavHeader from "./PizzeriaUpdateNavHeader";
import WarningIcon from "./icons/WarningIcon";

const EditAddressComponent = (props) => {
  const idAccount = localStorage.getItem("idAccount");
  const idAddress = props.match.params.idAddress;
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState(0);

  const [cityValid, setCityValid] = useState(true);
  const [streetValid, setStreetValid] = useState(true);
  const [numberValid, setNumberValid] = useState(true);

  const [showAddressModal, setShowAddressModal] = useState(false);

  useEffect(() => {
    AddressService.getAddressById(
      parseInt(props.match.params.idAddress, 10)
    ).then((res) => {
      let address = res.data;
      // console.log(address);
      setCity(address.city);
      setStreet(address.street);
      setNumber(address.number);
    });
  }, [props.match.params.idAddress]);
  const updateAddress = (e) => {
    const validations = [cityValid, streetValid, numberValid];
    e.preventDefault();
    let address = {
      city: city,
      street: street,
      number: number,
    };
    if (
      Object.values(address).every((el) => el.length !== 0) &&
      validations.every((el) => el)
    ) {
      AddressService.updateAddress(address, parseInt(idAddress, 10))
        .then((res) => {
          cancel(parseInt(idAccount, 10));
        })
        .catch((error) => {
          // console.log(error.response));
        });
    } else {
      setShowAddressModal(true);
    }
  };
  const validateCity = (city) => {
    const re = /^[A-Z][a-z]+$/;
    return re.test(city);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
    setCityValid(validateCity(event.target.value));
  };

  const validateStreet = (street) => {
    const re = /(ul\. | al\.)?[A-Z][a-z]+/;
    return re.test(street);
  };

  const handleStreetChange = (event) => {
    setStreet(event.target.value);
    setStreetValid(validateStreet(event.target.value));
  };

  const validateNumber = (number) => {
    const re = /^[1-9]+[0-9]*(\/[1-9]+[0-9]*)?$/;
    return re.test(number);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
    setNumberValid(validateNumber(event.target.value));
  };

  const cancel = (id) => {
    const userType = localStorage.getItem("userType");
    props.history.push(`/${userType}/${id}`);
  };

  const handleAddressModalClose = () => {
    setShowAddressModal(false);
  };
  const addressModal = () => {
    return (
      <Modal show={showAddressModal} centered onHide={handleAddressModalClose}>
        <Modal.Header>
          <Modal.Title>Address Fields Empty/Not Valid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            One or more of address fields are empty or not valid. Please fill up
            these fields.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddressModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  return (
    <div>
      <PizzeriaUpdatePageNavHeader />
      <Card className="main-card">
        <Card.Body>
          <Card.Title>Update User</Card.Title>
          <Form className="center">
            <Container fluid>
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <Form.Group>
                    <Form.Label> City : </Form.Label>
                    <Form.Control
                      placeholder="City"
                      name="city"
                      className={
                        cityValid ? "form-control" : "form-control-error"
                      }
                      value={city}
                      onChange={handleCityChange}
                    />
                    {!cityValid && (
                      <span style={{ color: "red" }}>
                        <WarningIcon /> City is not valid
                      </span>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label> Street : </Form.Label>
                    <Form.Control
                      placeholder="Street"
                      name="street"
                      className={
                        streetValid ? "form-control" : "form-control-error"
                      }
                      value={street}
                      onChange={handleStreetChange}
                    />
                    {!streetValid && (
                      <span style={{ color: "red" }}>
                        <WarningIcon /> Street is not valid
                      </span>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label> Number : </Form.Label>
                    <Form.Control
                      placeholder="Number"
                      name="number"
                      className={
                        numberValid ? "form-control" : "form-control-error"
                      }
                      value={number}
                      onChange={handleNumberChange}
                    />
                    {!numberValid && (
                      <span style={{ color: "red" }}>
                        <WarningIcon /> Number is not valid
                      </span>
                    )}
                  </Form.Group>
                  <Button variant="success" onClick={updateAddress}>
                    Save
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => cancel(parseInt(idAccount, 10))}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
          {showAddressModal && addressModal()}
        </Card.Body>
      </Card>
    </div>
  );
};

export default EditAddressComponent;
