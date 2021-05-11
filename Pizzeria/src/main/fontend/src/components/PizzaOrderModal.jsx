import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import "reactjs-popup/dist/index.css";
import "./../css/index.css";

const PizzaOrderModal = (props) => {
  return (
    <Modal centered {...props}>
      <Modal.Header closeButton>
        <Modal.Title>Pizza Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column="sm" lg={4}>
              Size
            </Form.Label>
            <Col>
              <Form.Control size="sm" as="select" className="my-1 mr-sm-2">
                <option value="choose">Size</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column="sm" lg={4}>
              Sauce
            </Form.Label>
            <Col>
              <Form.Control size="sm" as="select" className="my-1 mr-sm-2">
                <option value="choose">Sauce</option>
                <option value="none">None</option>
                <option value="ketchup">Ketchup</option>
                <option value="2">BBQ</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column="sm" lg={4}>
              Bakestyle
            </Form.Label>
            <Col>
              <Form.Control size="sm" as="select" className="my-1 mr-sm-2">
                <option value="choose">Bakestyle</option>
                <option value="Regular">Regular</option>
                <option value="Bake Light">Bake Light</option>
                <option value="Bake Extra Well">Bake Extra Well</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column="sm" lg={4}>
              Drinks
            </Form.Label>
            <Col>
              <Form.Control size="sm" as="select" className="my-1 mr-sm-2">
                <option value="None">None</option>
                <option value="Coca-Cola">Coca-Cola</option>
                <option value="Fanta">Fanta</option>
                <option value="Sprite">Sprite</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col md={{ span: 4, offset: 2 }}>
              <Button>Order</Button>
            </Col>
            <Col md={{ span: 4, offset: 2 }}>
              <Button variant="danger" onClick={props.onHide}>
                Cancel
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PizzaOrderModal;
