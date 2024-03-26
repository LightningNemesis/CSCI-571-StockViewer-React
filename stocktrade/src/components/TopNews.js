import React, { useState } from "react";
import { Container, Row, Col, Card, Modal } from "react-bootstrap";

const RenderedRows = ({ newsItems }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const handleCardClick = (newsItem) => {
    setModalContent(newsItem); // Set the content for the modal based on clicked item
    setShowModal(true); // Show the modal
  };

  // Function to handle closing the modal
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Row>
        {newsItems.map((newsItem, index) => (
          <Col md={6} key={index} className="mb-4">
            <Card
              className="h-100"
              style={styles.cardContainer}
              onClick={() => handleCardClick(newsItem)}
            >
              <div
                style={{
                  display: "flex",
                  flex: 1,
                }}
              >
                <Card.Img style={styles.imgContainer} src={newsItem.image} />
              </div>

              <Card.Body style={styles.cardBodyBox}>
                <Card.Text style={{ textAlign: "center" }}>
                  {newsItem.headline}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal component */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalContent.headline}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={modalContent.image}
            alt="Modal visual content"
            style={{ width: "100%" }}
          />
          {/* You can add more content here such as the article text or other details */}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

function TopNews({ newsData }) {
  return (
    <Container>
      <RenderedRows newsItems={newsData} />
    </Container>
  );
}

export default TopNews;

const styles = {
  cardContainer: {
    display: "flex",
    flexDirection: "row",
  },
  imgContainer: {
    margin: 15,
    height: "100px",
    width: "180px",
    borderRadius: "5px",
  },
  cardBodyBox: {
    display: "flex",
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
};
