import React, { useState } from "react";
import {
  Accordion,
  Button,
  Card,
  CardDeck,
  CardGroup,
  Col,
  Container,
  Form,
  Row,
  useAccordionToggle,
} from "react-bootstrap";
import PizzaLogo from "./../images/pizza-background.png";
import "./../css/pizza-list-style.css";
import PizzaOrderModal from "./PizzaOrderModal";

const PizzaListComponent = (props) => {
  const [pizzaOrderShow, setPizzaOrderShow] = useState(false);
  const pizzaList = props.pizza;

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
            <Col xl={3} md={4} sm={6} key={index}>
              <Card
                style={{
                  margin: 10,
                }}
              >
                <Card.Img
                  src={pizza.image}
                  style={{
                    width: "100%",
                    height: "15vw",
                    objectFit: "cover",
                  }}
                  width="1rem"
                />
                <Card.ImgOverlay
                  style={{
                    backgroundColor: "rgba(255,255,255,0.50)",
                  }}
                >
                  <Card.Body>
                    <Card.Title>{pizza.name}</Card.Title>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => setPizzaOrderShow(true)}
                    >
                      Choose
                    </Button>
                  </Card.Body>
                </Card.ImgOverlay>
              </Card>
            </Col>
          ))}
          <PizzaOrderModal
            show={pizzaOrderShow}
            onHide={() => setPizzaOrderShow(false)}
          />
        </CardDeck>
      </Row>
    </Container>
  );
};

export default PizzaListComponent;
