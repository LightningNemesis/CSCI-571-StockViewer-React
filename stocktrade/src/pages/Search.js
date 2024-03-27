import { useEffect, useState, useContext } from "react";

import SearchBar from "../components/SearchBar";
import TabView from "../components/TabView";

import StocksContext from "../context/stocks";

function Search() {
  const {
    companyDescription,
    companyPeers,
    stockData,
    companyHistorical,
    companyNews,

    getCompanyTab,
    getCompanyPeers,
    getStockSummary,
    getCompanyHistorical,
    getCompanyNews,
  } = useContext(StocksContext);

  const handleSubmit = async (term) => {
    getCompanyTab(term);
    getCompanyPeers(term);
    getStockSummary(term);
    getCompanyHistorical(term);
    getCompanyNews(term);
  };

  useEffect(() => {}, [
    companyDescription,
    companyHistorical,
    companyNews,
    stockData,
  ]);

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      {companyDescription != null &&
        companyHistorical != null &&
        companyPeers != null &&
        stockData != null &&
        companyNews != null && (
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
