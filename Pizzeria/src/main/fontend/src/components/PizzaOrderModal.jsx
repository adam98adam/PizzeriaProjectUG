import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import "reactjs-popup/dist/index.css";
import "./../css/index.css";
import "./../css/pizza-list-style.css";
import OrdersService from "./../services/OrdersService";
import UserService from "./../services/UserService";

const selectStyle = {
  borderRadius: 13,
};

const PizzaOrderModal = (props) => {
  const {
    pizza,
    crustlist,
    drinkslist,
    bakestylelist,
    pizzasizelist,
    cutstylelist,
    saucelist,
  } = props;

  const [price, setPrice] = useState(null);
  const pizzaPrice = useRef(null);
  const [pizzaSize, setPizzaSize] = useState({ pizzacostfactor: 1 });
  const [pizzaCrust, setPizzaCrust] = useState({ price: 0 });
  const [drink, setDrink] = useState({ price: 0 });
  const [sauce, setSauce] = useState({ price: 0 });
  const [bakestyle, setBakestyle] = useState({});
  const [cutstyle, setCutstyle] = useState({});
  const [user, setUser] = useState({});
  const [selected, setSelected] = useState({
    size: false,
    crust: false,
    bakestyle: false,
    cutstyle: false,
  });

  useEffect(() => {
    pizzaPrice.current =
      pizzaPrice * pizzaSize.pizzacostfactor +
      pizzaCrust.price +
      drink.price +
      sauce.price;
    setPrice(pizzaPrice.current);
  }, [pizzaSize, pizzaCrust, drink, sauce]);
  useEffect(() => {
    UserService.getUserById(localStorage.getItem("idUser")).then((res) => {
      setUser(res.data);
    });
  }, []);

  const handlePizzaSizeChange = ({ target }) => {
    if (target.value !== "") {
      setPizzaSize(
        pizzasizelist.filter((el) => el.id === parseInt(target.value))[0]
      );
    } else {
      setPizzaSize({ pizzacostfactor: 0 });
    }
    setSelected({
      ...selected,
      size: target.value !== "",
    });
  };

  const handlePizzaCrustChange = ({ target }) => {
    if (target.value === "") {
      setPizzaCrust({ price: 0 });
    } else {
      setPizzaCrust(
        crustlist.filter((el) => el.id === parseInt(target.value))[0]
      );
    }
    setSelected({
      ...selected,
      crust: target.value !== "",
    });
  };

  const handleDrinkChange = ({ target }) => {
    if (target.value === "") {
      setDrink({ price: 0 });
    } else {
      setDrink(drinkslist.filter((el) => el.id === parseInt(target.value))[0]);
    }
  };
  const handleBakestyleChange = ({ target }) => {
    if (target.value === "") {
      setBakestyle({});
    } else {
      setBakestyle(
        bakestylelist.filter((el) => el.id === parseInt(target.value))[0]
      );
    }
    setSelected({
      ...selected,
      bakestyle: target.value !== "",
    });
  };
  const handleCutstyleChange = ({ target }) => {
    if (target.value === "") {
      setCutstyle({});
    } else {
      setCutstyle(
        cutstylelist.filter((el) => el.id === parseInt(target.value))[0]
      );
    }
    setSelected({
      ...selected,
      cutstyle: target.value !== "",
    });
  };
  const handleSauceChange = ({ target }) => {
    if (target.value === "") {
      setSauce({ price: 0 });
    } else {
      setSauce(saucelist.filter((el) => el.id === parseInt(target.value))[0]);
    }
  };
  const handlePizzaOrderModalClose = () => {
    props.onHide();
    setSelected({
      size: false,
      crust: false,
      bakestyle: false,
      cutstyle: false,
    });
    setPrice(0);
  };
  const sendOrder = () => {
    const order = {
      user: user,
      pizza: pizza,
      bakestyle: bakestyle,
      crust: pizzaCrust,
      cutstyle: cutstyle,
      pizzasize: pizzaSize,
      drink: drink.price === 0 ? null : drink,
      sauce: sauce.price === 0 ? null : sauce,
    };
    // const order = {
    //   pizza: pizza.id,
    //   bakestyle: bakestyle.id,
    //   crust: pizzaCrust.id,
    //   cutstyle: cutstyle.id,
    //   drink: drink.price === 0 ? null : drink.id,
    //   sauce: sauce.price === 0 ? null : sauce.id,
    //   user_id: localStorage.getItem("idUser"),
    // };
    // console.log(order);

    OrdersService.postOrdersByUserId(user.id, order).then((res) => {
      // console.log(res.data);
      props.onHide();
      setSelected({
        size: false,
        crust: false,
        bakestyle: false,
        cutstyle: false,
      });
      localStorage.setItem("userOrders", JSON.stringify(res.data));
      setPrice(0);
    });
  };
  const requiredLabel = () => {
    return (
      <span
        style={{
          color: "white",
          backgroundColor: "red",
          borderRadius: 5,
          padding: 3,
        }}
      >
        required
      </span>
    );
  };
  return (
    <Modal centered {...props}>
      <Modal.Header className="text-center" closeButton>
        <Modal.Title className="w-100">Pizza Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group
            as={Row}
            style={{
              backgroundColor: "rgba(38,145,62,0.8)",
              padding: 10,
              borderRadius: 15,
              color: "white",
            }}
          >
            <Form.Label column="sm" lg={6}>
              Size (diameter) {requiredLabel()}
            </Form.Label>
            <Col>
              <Form.Control
                required
                size="sm"
                as="select"
                onChange={handlePizzaSizeChange}
                className="my-1 mr-sm-2"
                style={selectStyle}
              >
                <option value="">None</option>
                {pizzasizelist.map((pizzaSize) => {
                  return (
                    <option value={pizzaSize.id} key={pizzaSize.id}>
                      {`${pizzaSize.name} (${pizzaSize.diameter} cm)`}
                    </option>
                  );
                })}
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            style={{
              backgroundColor: "rgba(38,145,62,0.8)",
              padding: 10,
              borderRadius: 15,
              color: "white",
            }}
          >
            <Form.Label column="sm" lg={6}>
              Crust {requiredLabel()}
            </Form.Label>
            <Col>
              <Form.Control
                required
                size="sm"
                as="select"
                onChange={handlePizzaCrustChange}
                className="my-1 mr-sm-2"
                style={{ ...selectStyle, borderRadius: 15 }}
              >
                <option value="">None</option>
                {crustlist.map((crust) => {
                  return (
                    <option value={crust.id} key={crust.id}>
                      {crust.crust}
                    </option>
                  );
                })}
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            style={{
              backgroundColor: "rgba(38,145,62,0.8)",
              padding: 10,
              borderRadius: 15,
              color: "white",
            }}
          >
            <Form.Label column="sm" lg={6}>
              Bakestyle {requiredLabel()}
            </Form.Label>
            <Col>
              <Form.Control
                required
                size="sm"
                as="select"
                className="my-1 mr-sm-2"
                onChange={handleBakestyleChange}
                style={{ ...selectStyle, borderRadius: 15 }}
              >
                <option value="">None</option>
                {bakestylelist.map((bakestyle) => {
                  return (
                    <option value={bakestyle.id} key={bakestyle.id}>
                      {bakestyle.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            style={{
              backgroundColor: "rgba(38,145,62,0.8)",
              padding: 10,
              borderRadius: 15,
              color: "white",
            }}
          >
            <Form.Label column="sm" lg={6}>
              Cutstyle {requiredLabel()}
            </Form.Label>
            <Col>
              <Form.Control
                required
                size="sm"
                as="select"
                className="my-1 mr-sm-2"
                onChange={handleCutstyleChange}
                style={{ ...selectStyle, borderRadius: 15 }}
              >
                <option value="">None</option>
                {cutstylelist.map((cutstyle) => {
                  return (
                    <option value={cutstyle.id} key={cutstyle.id}>
                      {cutstyle.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            style={{
              backgroundColor: "rgba(38,145,62,0.8)",
              padding: 10,
              borderRadius: 15,
              color: "white",
            }}
          >
            <Form.Label column="sm" lg={6}>
              Sauce
            </Form.Label>
            <Col>
              <Form.Control
                size="sm"
                as="select"
                className="my-1 mr-sm-2"
                onChange={handleSauceChange}
                style={{ ...selectStyle, borderRadius: 15 }}
              >
                <option value="">None</option>
                {saucelist.map((sauce) => {
                  return (
                    <option value={sauce.id} key={sauce.id}>
                      {`${sauce.name} (${sauce.price}$)`}
                    </option>
                  );
                })}
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            style={{
              backgroundColor: "rgba(38,145,62,0.8)",
              padding: 10,
              borderRadius: 15,
              color: "white",
            }}
          >
            <Form.Label column="sm" lg={6}>
              Drinks
            </Form.Label>
            <Col>
              <Form.Control
                size="sm"
                as="select"
                onChange={handleDrinkChange}
                className="my-1 mr-sm-2"
                style={{ ...selectStyle, borderRadius: 15 }}
              >
                <option value="">None</option>
                {drinkslist.map((drink) => {
                  return (
                    <option value={drink.id} key={drink.id}>
                      {`${drink.name} (${drink.price}$)`}
                    </option>
                  );
                })}
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group>
            <Row
              className="justify-content-md-center"
              style={{
                backgroundColor: "rgba(38,145,62,0.8)",
                padding: 10,
                borderRadius: 15,
                color: "white",
              }}
            >
              <Col md="auto">
                <b>Price</b>: {`${price ? price : 0}$`}
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Col md={6}>
          <Button
            onClick={sendOrder}
            disabled={!Object.values(selected).every((el) => el)}
          >
            Order
          </Button>
        </Col>
        <Col md={{ span: 4, offset: 2 }}>
          <Button variant="danger" onClick={handlePizzaOrderModalClose}>
            Cancel
          </Button>
        </Col>
      </Modal.Footer>
    </Modal>
  );
};

export default PizzaOrderModal;
