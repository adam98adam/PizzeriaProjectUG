import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import AddressService from "../services/AddressService";
import UpdatePageNavHeader from "./UpdatePageNavHeader";

const RegisterUserAddressComponent = (props) => {
  const userId = props.match.params.id;

  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");

  const [cityValid, setCityValid] = useState(true);
  const [streetValid, setStreetValid] = useState(true);
  const [numberValid, setNumberValid] = useState(true);

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [disableSaveButton, setDisableSaveButton] = useState(true);

  useEffect(() => {
    const saveButtonDisabled = () => {
      return (
        !cityValid ||
        !streetValid ||
        !numberValid ||
        city === "" ||
        street === "" ||
        number === ""
      );
    };
    setDisableSaveButton(saveButtonDisabled());
  }, [city, number, street, cityValid, streetValid, numberValid]);
  const saveAddress = (e) => {
    let address = {
      city: city,
      street: street,
      number: number,
      user: { id: parseInt(userId, 10) },
    };
    const validations = [cityValid, streetValid, numberValid];
    if (
      Object.values(address).every((el) => el.length !== 0) &&
      validations.every((el) => el)
    ) {
      e.preventDefault();
      // console.log("address => " + JSON.stringify(address));
      AddressService.createAddress(address).then((res) => {
        // console.log(res.data);
        props.history.push("/");
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
    const re = /^[A-Z][a-z]+$/;
    return re.test(street);
  };

  const handleStreetChange = (event) => {
    setStreet(event.target.value);
    setStreetValid(validateStreet(event.target.value));
  };

  const validateNumber = (number) => {
    const re = /^[1-9]+[0-9]*(\/[1-9]+[0-9]*)?$/;
    return re.test(number) && parseInt(number) >= 1 && parseInt(number) <= 100;
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
    setNumberValid(validateNumber(event.target.value));
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
      <UpdatePageNavHeader />
      <Form className="center">
        <Container>
          <Row className="align-items-center">
            {/* New account */}
            <Col>
              <Card className="main-card">
                <Card.Body>
                  <Card.Title>Add your address</Card.Title>
                  <Form.Group controlId="formCity">
                    <Form.Label> City : </Form.Label>
                    <Form.Control
                      placeholder="City"
                      className={
                        cityValid ? "form-control" : "form-control-error"
                      }
                      name="city"
                      value={city}
                      onChange={handleCityChange}
                    />
                    {!cityValid && (
                      <span style={{ color: "red" }}>
                        City value is not valid
                      </span>
                    )}
                  </Form.Group>
                  <Form.Group controlId="formStreet">
                    <Form.Label> Street : </Form.Label>
                    <Form.Control
                      placeholder="Street"
                      className={
                        streetValid ? "form-control" : "form-control-error"
                      }
                      name="street"
                      value={street}
                      onChange={handleStreetChange}
                    />
                    {!streetValid && (
                      <span style={{ color: "red" }}>
                        Street value is not valid
                      </span>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label> Number : </Form.Label>
                    <Form.Control
                      placeholder="Number"
                      className={
                        numberValid ? "form-control" : "form-control-error"
                      }
                      name="number"
                      value={number}
                      onChange={handleNumberChange}
                    />
                    {!numberValid && (
                      <span style={{ color: "red" }}>
                        Number value is not valid
                      </span>
                    )}
                  </Form.Group>
                  <Button
                    variant="success"
                    onClick={saveAddress}
                    disabled={disableSaveButton}
                  >
                    Save
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        {showAddressModal && addressModal()}
      </Form>
    </div>
  );
};
export default RegisterUserAddressComponent;
