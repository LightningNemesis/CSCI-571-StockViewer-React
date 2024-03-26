import React, { useState } from "react";
import { Container, Row, Col, Card, Modal } from "react-bootstrap";

import xLogo from "../assets/X_logo.svg";
import fbLogo from "../assets/fb_logo.jpeg";

const RenderedRows = ({ newsItems }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const handleCardClick = (newsItem) => {
    setModalContent(newsItem); // Set the content for the modal based on clicked item
    setShowModal(true); // Show the modal
  };

  // Function to handle closing the modal
  const handleClose = () => setShowModal(false);

  const shareOnTwitter = (text, url) => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank");
  };

  const shareOnFacebook = (imageUrl) => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      imageUrl
    )}`;
    window.open(facebookShareUrl, "_blank");
  };

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
          <Modal.Title>
            {modalContent.source}
            <br />
            <p style={{ fontSize: 15 }}>{modalContent.datetime}</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalContent.summary}</p>
          <p>
            For more details click{" "}
            <a
              href={modalContent.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              here.
            </a>
          </p>
          <div style={styles.modalFooter}>
            <p>Share</p>
            <img
              style={{ ...styles.modalFooterIcons, marginRight: "10px" }}
              src={xLogo}
              alt="share on twitter"
              onClick={() =>
                shareOnTwitter(modalContent.headline, modalContent.url)
              }
            />
            <img
              style={styles.modalFooterIcons}
              src={fbLogo}
              alt="share on facebook"
              onClick={() => shareOnFacebook(modalContent.image)}
            />
          </div>
        </Modal.Body>
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
  modalFooter: {
    padding: "10px",
    borderRadius: "5px",
    borderColor: "lightgray",
    borderStyle: "solid",
  },
  modalFooterIcons: { height: "25px", width: "25px" },
};
