import { useEffect, useState } from "react";

import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import StockSummary from "./components/StockSummary";
import FooterBar from "./components/Footer";

import {
  getCompanyTab,
  getCompanyHistorical,
  getCompanyNews,
  getStockSummary,
} from "./api";

function App() {
  const [companyDescription, setCompanyDescription] = useState(null);
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
    const StockData = await getStockSummary(term);
    const compHistRes = await getCompanyHistorical(term);
    const compNews = await getCompanyNews(term);

    setCompanyDescription(compDescRes);
    setCompanyHistorical(compHistRes);
    setCompanyNews(compNews);
    setStockData(StockData);
  };

  return (
    <div>
      {/* <NavBar /> */}
      <SearchBar onSubmit={handleSubmit} />
      {companyDescription != null && companyHistorical != null && (
        <StockSummary
          companyDescription={companyDescription}
          stockData={stockData}
        />
      )}
      {/* <FooterBar /> */}
    </div>
  );
}

export default App;
