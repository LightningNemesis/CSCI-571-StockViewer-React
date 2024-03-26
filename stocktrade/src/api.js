import axios from "axios";

/*
  Finnhub API call: returns Company Profile, for Company Tab
*/
const getCompanyTab = async (query) => {
  const response = await axios.get(`https://finnhub.io/api/v1/stock/profile2`, {
    params: {
      symbol: query,
      token: "cn2vjohr01qt9t7visi0cn2vjohr01qt9t7visig",
    },
  });
  return response.data;
};

/*
  Finnhub API call: returns Stock Summary, for Stock Tab
*/
const getStockSummary = async (query) => {
  const response = await axios.get(`https://finnhub.io/api/v1/quote`, {
    params: {
      symbol: query,
      token: "cn2vjohr01qt9t7visi0cn2vjohr01qt9t7visig",
    },
  });

  return response.data;
};

const getCompanyNews = async (query) => {
  const response = await axios.get(`https://finnhub.io/api/v1/company-news`, {
    params: {
      symbol: query,
      from: "2022-01-15",
      to: "2024-02-09",
      token: "cn2vjohr01qt9t7visi0cn2vjohr01qt9t7visig",
    },
  });

  return response.data;
};

const getCompanyPeers = async (query) => {
  const response = await axios.get(`https://finnhub.io/api/v1/stock/peers`, {
    params: {
      symbol: query,
      token: "cn2vjohr01qt9t7visi0cn2vjohr01qt9t7visig",
    },
  });

  return response.data;
};
/*
  Polygon API call: returns timeseries data for a given stock symbol
*/
const getCompanyHistorical = async (query) => {
  let fromDate = "2021-08-09";
  let toDate = "2024-02-09";
  const response = await axios.get(
    `https://api.polygon.io/v2/aggs/ticker/${query}/range/1/day/${fromDate}/${toDate}?adjusted=true&sort=asc`,
    {
      headers: {
        Authorization: "Bearer y9CbEJ1gYrXZpwAWpXbAJrAL1ziBkaV2",
      },
    }
  );

  return response.data;
};

export {
  getCompanyTab,
  getStockSummary,
  getCompanyNews,
  getCompanyHistorical,
  getCompanyPeers,
};
