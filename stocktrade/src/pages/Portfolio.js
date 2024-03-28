import { useContext, useEffect, useState } from "react";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  ListGroup,
  Modal,
  Form,
} from "react-bootstrap";

import StocksContext from "../context/stocks";

const RenderedStocks = ({ stocks, buyStocks }) => {
  return stocks.map((stock, index) => (
    <Card key={index} className="mb-3">
      <Card.Header as="h5">
        {stock.symbol} {stock.name}
      </Card.Header>
      <Card.Body style={{ margin: 0 }}>
        <Row>
          <Col>
            <ListGroup>
              <ListGroup.Item style={styles.listItem}>Quantity:</ListGroup.Item>
              <ListGroup.Item style={styles.listItem}>
                Avg. Cost / Share:
              </ListGroup.Item>
              <ListGroup.Item style={styles.listItem}>
                Total Cost:
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <ListGroup style={{}}>
              <ListGroup.Item style={styles.listItem}>
                {stock.quantity}
              </ListGroup.Item>
              <ListGroup.Item style={styles.listItem}>
                {stock.avgCost}
              </ListGroup.Item>
              <ListGroup.Item style={styles.listItem}>
                {stock.totalCost}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <ListGroup style={{}}>
              <ListGroup.Item style={styles.listItem}>Change:</ListGroup.Item>
              <ListGroup.Item style={styles.listItem}>
                Current Price:
              </ListGroup.Item>
              <ListGroup.Item style={styles.listItem}>
                Market Value:
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <ListGroup>
              <ListGroup.Item style={styles.listItem}>
                <span style={{ color: stock.change < 0 ? "red" : "green" }}>
                  {stock.change}
                </span>
              </ListGroup.Item>
              <ListGroup.Item style={styles.listItem}>
                {stock.currentPrice}
              </ListGroup.Item>
              <ListGroup.Item style={styles.listItem}>
                {stock.marketValue}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer as="h5" style={{ margin: 0 }}>
        <Button
          variant="primary"
          className="me-2"
          onClick={() => buyStocks(stock)}
        >
          Buy
        </Button>

        <Button variant="danger">Sell</Button>
      </Card.Footer>
    </Card>
  ));
};

function Portfolio() {
  const { wallet, portfolio, fetchWallet, fetchPortfolio, buyStocks } =
    useContext(StocksContext);

  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState("0");
  const [stockSelected, setStockSelected] = useState({});

  const handleClose = () => setShow(false);
  const openModal = () => setShow(true);
  const setModalData = (stock) => {
    setStockSelected(stock);
    // setQuantity(stock.quantity);
    openModal();
  };

  const handleBuy = () => {
    buyStocks(stockSelected, quantity);
  };

  const numericQuantity = quantity === "" ? 0 : parseInt(quantity, 10);
  const canBuy = numericQuantity * stockSelected.currentPrice <= wallet;

  useEffect(() => {
    fetchWallet();
    fetchPortfolio();
  }, [fetchWallet, fetchPortfolio]);

  const portfolioData = [
    {
      id: 1,
      symbol: "AAPL",
      name: "Apple Inc",
      quantity: 3,
      avgCost: 184.23,
      totalCost: 552.69,
      change: -0.06,
      currentPrice: 184.18,
      marketValue: 552.53,
    },
    {
      id: 2,
      symbol: "NVDA",
      name: "NVIDIA Corp",
      quantity: 7,
      avgCost: 777.26,
      totalCost: 5440.8,
      change: 0.11,
      currentPrice: 777.36,
      marketValue: 5441.55,
    },
  ];

  return (
    <Container>
      <h1>My Portfolio</h1>
      <p>Money in Wallet: ${wallet}</p>

      <RenderedStocks stocks={portfolio} buyStocks={setModalData} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>NVDA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>
                Current Price: {stockSelected.currentPrice}
              </Form.Label>
              <Form.Label>Money in Wallet: ${wallet}</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                isInvalid={!canBuy}
              />
              <Form.Control.Feedback type="invalid">
                Not enough money in wallet!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Label>
              Total: {numericQuantity * stockSelected.currentPrice}
            </Form.Label>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleBuy} disabled={!canBuy}>
            Buy
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Portfolio;

const styles = {
  listItem: {
    border: "none",
  },
};
