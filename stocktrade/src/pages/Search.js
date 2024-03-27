import { useState } from "react";

import SearchBar from "../components/SearchBar";
import TabView from "../components/TabView";

import {
  getCompanyTab,
  getCompanyPeers,
  getCompanyHistorical,
  getCompanyNews,
  getStockSummary,
} from "../api";

function Search() {
  const [companyDescription, setCompanyDescription] = useState(null);
  const [companyPeers, setCompanyPeers] = useState([]);
  const [stockData, setStockData] = useState(null);
  const [companyHistorical, setCompanyHistorical] = useState(null);
  const [companyNews, setCompanyNews] = useState([]);

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
      <SearchBar onSubmit={handleSubmit} />
      {companyDescription != null && companyHistorical != null && (
        <TabView
          companyDescription={companyDescription}
          stockData={stockData}
          peersData={companyPeers}
          newsData={companyNews}
          companyHistorical={companyHistorical}
        />
      )}
    </div>
  );
}

export default Search;
