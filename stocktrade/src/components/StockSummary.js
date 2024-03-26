import { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import { Container, Row, Col } from "react-bootstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const RenderedPeers = ({ peers }) => {
  return peers.map((peer) => (
    <div>
      <p>
        <a
          href={"https://www.nvidia.com/en-us/"}
          target="_blank"
          rel="noopener noreferrer"
        >
          {peer}
          {", "}
        </a>
      </p>
    </div>
  ));
};

function StockSummary({ companyDescription, stockData, peersData }) {
  // const dummyPeers = ["AAPL", "GOOGL", "AMZN", "MSFT", "TSLA"];

  const options = {
    title: {
      text: "My chart",
    },
    series: [
      {
        data: [1, 2, 3],
      },
    ],
  };

  return (
    <div style={styles.summaryContainer}>
      <div style={styles.summaryleft}>
        <Container>
          <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
              <div className="price-info">
                <p>
                  <strong>High Price:</strong> {stockData.h}
                </p>
                <p>
                  <strong>Low Price:</strong> {stockData.l}
                </p>
                <p>
                  <strong>Open Price:</strong> {stockData.o}
                </p>
                <p>
                  <strong>Prev. Close:</strong> {stockData.pc}
                </p>
              </div>
            </Col>
          </Row>
        </Container>

        <div style={styles.aboutCompany}>
          <p style={{ textDecoration: "underline" }}>
            <strong>About the company</strong>
          </p>
          <p>
            <strong>IPO Start Date:</strong> {companyDescription.ipo}
          </p>
          <p>
            <strong>Industry:</strong> {companyDescription.finnhubIndustry}
          </p>
          <p>
            <strong>Webpage:</strong>{" "}
            <a
              href={companyDescription.weburl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {companyDescription.weburl}
            </a>
          </p>

          <p>
            <strong>Company Peers:</strong>
          </p>
          <div style={styles.companyPeersBox}>
            <RenderedPeers peers={peersData} />
          </div>
        </div>
      </div>
      <div style={styles.summaryRight}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
}

export default StockSummary;

const styles = {
  summaryContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
  },
  summaryleft: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  aboutCompany: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  keyText: {
    fontWeight: "bold",
  },
  companyPeersBox: { flex: 1, display: "flex" },
  summaryRight: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};
