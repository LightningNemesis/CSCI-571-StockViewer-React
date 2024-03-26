import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import TabView from "./components/TabView";
import FooterBar from "./components/Footer";

import {
  getCompanyTab,
  getCompanyPeers,
  getCompanyHistorical,
  getCompanyNews,
  getStockSummary,
} from "./api";

function App() {
  const [companyDescription, setCompanyDescription] = useState(null);
  const [companyPeers, setCompanyPeers] = useState([]);
  const [stockData, setStockData] = useState(null);
  const [companyHistorical, setCompanyHistorical] = useState(null);
  const [companyNews, setCompanyNews] = useState([]);

  useEffect(() => {
    console.log("companyDescription", companyDescription);
    console.log("companyHistorical", companyHistorical);
    console.log("companyNews", companyNews);
    console.log("stockData", stockData);
  }, [companyDescription, companyHistorical, companyNews, stockData]);

  const handleSubmit = async (term) => {
    const compDescRes = await getCompanyTab(term);
    const compPeers = await getCompanyPeers(term);
    const StockData = await getStockSummary(term);
    const compHistRes = await getCompanyHistorical(term);
    const compNews = await getCompanyNews(term);

    setCompanyDescription(compDescRes);
    setCompanyPeers(compPeers);
    setCompanyHistorical(compHistRes);
    setCompanyNews(compNews);
    setStockData(StockData);
  };

  return (
    <div>
      {/* <NavBar /> */}
      <SearchBar onSubmit={handleSubmit} />

      {companyDescription != null && companyHistorical != null && (
        <TabView
          companyDescription={companyDescription}
          stockData={stockData}
          peersData={companyPeers}
          newsData={companyNews}
        />
      )}
      {/* <FooterBar /> */}
    </div>
  );
}

export default App;
