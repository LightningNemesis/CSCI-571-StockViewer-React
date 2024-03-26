import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";

import StockSummary from "./StockSummary";
import TopNews from "./TopNews";
import Charts from "./Charts";
import Insights from "./Insights";

const UpperSection = ({ companyDescription, stockData }) => {
  return (
    <div style={styles.UpperSectionContainer}>
      <div style={styles.UpperSectionLeftBox}>
        <h1>{companyDescription.ticker}</h1>
        <h2>{companyDescription.name}</h2>
        <h3>{companyDescription.exchange}</h3>
        <Button variant="success">Buy</Button>{" "}
      </div>
      <div style={styles.UpperSectionMidBox}>
        <img
          style={{ width: "100px", height: "100px" }}
          src={companyDescription.logo}
          alt="Company Logo"
        />
      </div>
      <div style={styles.UpperSectionRightBox}>
        <h1>{stockData.c}</h1>
        <h1>{stockData.d}</h1>
        <h1>{stockData.dp}</h1>
        <h1>{stockData.t}</h1>
      </div>
    </div>
  );
};

function TabView({
  companyDescription,
  stockData,
  peersData,
  newsData,
  companyHistorical,
}) {
  const [activeTab, setActiveTab] = useState("summary");
  return (
    <div>
      <UpperSection
        companyDescription={companyDescription}
        stockData={stockData}
      />
      <Tabs
        id="controlled-tab-example"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
        fill
      >
        <Tab eventKey="summary" title="Summary">
          <StockSummary
            companyDescription={companyDescription}
            stockData={stockData}
            peersData={peersData}
          />
        </Tab>
        <Tab eventKey="topNews" title="Top News">
          <TopNews newsData={newsData} />
        </Tab>
        <Tab eventKey="charts" title="Charts">
          <Charts historicalData={companyHistorical} />
        </Tab>
        <Tab eventKey="insights" title="Insights">
          <Insights />
        </Tab>
      </Tabs>
    </div>
  );
}

export default TabView;

const styles = {
  UpperSectionContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
  },
  UpperSectionLeftBox: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  UpperSectionMidBox: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  UpperSectionRightBox: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};
