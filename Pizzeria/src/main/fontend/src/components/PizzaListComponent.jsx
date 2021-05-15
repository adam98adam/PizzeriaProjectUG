import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardDeck,
  Col,
  Container,
  Row,
  Image,
} from "react-bootstrap";
import PizzaBackground from "./../images/pizza-background.png";
import "./../css/pizza-list-style.css";
import PizzaOrderModal from "./PizzaOrderModal";
import OrdersService from "../services/OrdersService";

const PizzaListComponent = (props) => {
  const [showPizzaOrder, setShowPizzaOrder] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState({});
  const { pizzalist } = props;
  const {
    crustlist,
    drinkslist,
    bakestylelist,
    pizzasizelist,
    cutstylelist,
    saucelist,
  } = props;
  useEffect(() => {
    OrdersService.getOrdersByUserId(localStorage.getItem("idUser")).then(
      (res) => {
        localStorage.setItem("userOrders", JSON.stringify(res.data));
      }
    );
  }, []);

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
          {pizzalist.map((pizza, index) => (
            <Col xl={4} md={6} sm={12} key={index}>
              <Card
                style={{
                  margin: 10,
                  overflow: "auto",
                  borderRadius: 15,
                }}
              >
                <Card.Img
                  src={PizzaBackground}
                  style={{
                    width: "100%",
                    height: "10rem",
                    objectFit: "cover",
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
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                >
                  <Card.Text>{pizza.description}</Card.Text>
                </Card.Body>
                <Card.Footer style={{ display: "none" }}></Card.Footer>
                <Button
                  variant="success"
                  onClick={() => {
                    setSelectedPizza(pizza);
                    setShowPizzaOrder(true);
                  }}
                >
                  Choose
                </Button>
              </Card>
            </Col>
          ))}
          <PizzaOrderModal
            pizza={selectedPizza}
            crustlist={crustlist}
            bakestylelist={bakestylelist}
            drinkslist={drinkslist}
            pizzasizelist={pizzasizelist}
            cutstylelist={cutstylelist}
            saucelist={saucelist}
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
