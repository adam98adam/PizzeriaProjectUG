import React, { useEffect, useRef, useState } from "react";
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
import UpdatePageNavHeader from "./UpdatePageNavHeader";
import WarningIcon from "./icons/WarningIcon";

const UpdateAddressComponent = (props) => {
  const idAccount = localStorage.getItem("idAccount");
  const idAddress = props.match.params.idAddress;
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState(0);

  const [cityValid, setCityValid] = useState(true);
  const [streetValid, setStreetValid] = useState(true);
  const [numberValid, setNumberValid] = useState(true);

  const initialCity = useRef("");
  const initialStreet = useRef("");
  const initialNumber = useRef("");

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

  useEffect(() => {
    AddressService.getAddressById(idAddress).then((res) => {
      let address = res.data;
      // console.log(address);
      setCity(address.city);
      setStreet(address.street);
      setNumber(address.number);
      initialCity.current = address.city;
      initialStreet.current = address.street;
      initialNumber.current = address.number;
    });
  }, [idAddress]);
  useEffect(() => {
    const disableSaveButton = () => {
      return (
        !cityValid ||
        !streetValid ||
        !numberValid ||
        city === "" ||
        street === "" ||
        number === "" ||
        (initialCity.current === city &&
          initialStreet.current === street &&
          initialNumber.current === number)
      );
    };
    setSaveButtonDisabled(disableSaveButton());
  }, [city, street, number, cityValid, streetValid, numberValid]);

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
    const re = /^[1-9][0-9]*$/;
    return re.test(number) && parseInt(number) <= 100 && parseInt(number) >= 1;
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
          <Modal.Title>Invalid New Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            One or more of address fields are empty not valid or not unique.
            Please fill up these fields with different values.
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
      <Card className="main-card">
        <Card.Body>
          <Card.Title>Update User Address</Card.Title>
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
                        <WarningIcon /> City value is not valid
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
                        <WarningIcon /> Street value is not valid
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
                        <WarningIcon /> Number value is not valid
                      </span>
                    )}
                  </Form.Group>
                  <Button variant="success" onClick={updateAddress} disabled={saveButtonDisabled}>
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

export default UpdateAddressComponent;
