import { Container, Row, Col, Card } from "react-bootstrap";

const RenderedRows = ({ newsItems }) => {
  return (
    <Row>
      {newsItems.map((newsItem, index) => (
        // Assuming you have an array of news items
        // Use Col to create two columns. For a 2-column layout, use md={6}
        <Col md={6} key={index}>
          <Card>
            <Card.Img variant="top" src={newsItem.image} />
            <Card.Body>
              <Card.Title>{newsItem.title}</Card.Title>
              <Card.Text>{newsItem.summary}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

function TopNews() {
  const newsItems = [
    {
      title:
        "If You Can Predict Cash Flow You Can Predict Stock Price - Austin Hankwitz",
      summary:
        "An analysis of how cash flow can be an indicator of a company's financial health and stock performance.",
      image:
        "https://static.seekingalpha.com/cdn/s3/uploads/getty_images/172415785/image_172415785.jpg?io=getty-c-w1536", // Replace with actual image path or URL
    },
    {
      title:
        "Google Follows Apple's Lead, Set To Begin Making Smartphones In This Asian Country",
      summary:
        "Google is starting to manufacture smartphones in Vietnam following Apple's move to diversify production.",
      image:
        "https://static.seekingalpha.com/cdn/s3/uploads/getty_images/172415785/image_172415785.jpg?io=getty-c-w1536", // Replace with actual image path or URL
    },
    {
      title: "Apple targeting sports fans with new app",
      summary:
        "Apple's rumored sports app could be a game-changer for how fans watch their favorite sports.",
      image:
        "https://static.seekingalpha.com/cdn/s3/uploads/getty_images/172415785/image_172415785.jpg?io=getty-c-w1536", // Replace with actual image path or URL
    },
    {
      title:
        "Nvidia results, forecast beat estimates across the board as China sales slow 'significantly'",
      summary:
        "Nvidia's latest earnings report shows strong results despite a slowdown in sales in China.",
      image:
        "https://static.seekingalpha.com/cdn/s3/uploads/getty_images/172415785/image_172415785.jpg?io=getty-c-w1536", // Replace with actual image path or URL
    },
  ];

  return (
    <Container>
      <RenderedRows newsItems={newsItems} />
    </Container>
  );
}

export default TopNews;
