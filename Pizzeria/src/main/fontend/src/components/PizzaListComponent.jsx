import React, { useState } from "react";
import {
  Button,
  Card,
  CardDeck,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Image,
} from "react-bootstrap";
import PizzaLogo from "./../images/pizza-background.png";
import "./../css/pizza-list-style.css";
import PizzaOrderModal from "./PizzaOrderModal";

const PizzaListComponent = (props) => {
  const [showPizzaOrder, setShowPizzaOrder] = useState(false);
  const [showPizzaDescription, setShowPizzaDescription] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const pizzaList = props.pizza;
  console.log(props.crust);

  const pizzaDescriptionModal = () => {
    return (
      <Modal
        show={showPizzaDescription}
        centered
        onHide={() => setShowPizzaDescription(false)}
      >
        <Card>
          <Card.Header>{selectedPizza.name}</Card.Header>
          <Card.Body>{selectedPizza.description}</Card.Body>
        </Card>
      </Modal>
    );
  };

  return (
    <Container fluid className="main-card">
      <Row>
        <CardDeck
          style={{
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignContent: "flex-start",
          }}
        >
          {pizzaList.map((pizza, index) => (
            <Col xl={4} md={6} sm={12} key={index}>
              <Card
                style={{
                  margin: 10,
                  overflow: "auto",
                  borderRadius: 15,
                }}
              >
                <Card.Img
                  src={PizzaLogo}
                  style={{
                    width: "100%",
                    height: "10rem",
                    objectFit: "cover",
                    backgroundImage:
                      "linear-gradient(180deg, rgba(115,0,2,0), rgba(255,255,255,1))",
                  }}
                />
                <Image
                  src={pizza.image}
                  roundedCircle
                  thumbnail
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "10em",
                    transform: "translate(-50%,-50%)",
                    width: 100,
                    height: 100,
                    flexGrow: 1,

                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                <Card.Title
                  style={{
                    marginTop: "3rem",
                  }}
                >
                  {pizza.name}
                </Card.Title>

                <Card.Body
                  style={{
                    backgroundColor: "rgba(0,0,0,0.17)",
                    borderRadius: 15,
                  }}
                >
                  <Card.Text>{pizza.description}</Card.Text>
                </Card.Body>
                <Card.Footer style={{ display: "none" }}></Card.Footer>
                <Button
                  variant="success"
                  onClick={() => setShowPizzaOrder(true)}
                >
                  Choose
                </Button>
              </Card>
            </Col>
          ))}
          <PizzaOrderModal
            crust={props.crust}
            show={showPizzaOrder}
            onHide={() => setShowPizzaOrder(false)}
          />
          {/* {showPizzaDescription && pizzaDescriptionModal()} */}
        </CardDeck>
      </Row>
    </Container>
  );
};

export default PizzaListComponent;
