import { useEffect, useState } from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const RenderedPeers = ({ peers }) => {
  return peers.map((peer) => (
    <div>
      <h4>{peer}</h4>
    </div>
  ));
};

function StockSummary({ companyDescription, stockData }) {
  const dummyPeers = ["AAPL", "GOOGL", "AMZN", "MSFT", "TSLA"];

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
        <div>
          <div>High Price: {stockData.h}</div>
          <div>Low Price: {stockData.l}</div>
          <div>Open Price: {stockData.o}</div>
          <div>Prev. Close: {stockData.pc}</div>
        </div>
        <div>
          <h1>About the company</h1>
          <h3>IPO Start Date: 6969-69-69</h3>
          <h3>Industry: XXXXXXXX</h3>
          <h3>Webpage: XXXXXXXX</h3>
          <div>
            Company Peers:
            <RenderedPeers peers={dummyPeers} />
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
    // alignItems: "center",
  },
  summaryRight: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};
