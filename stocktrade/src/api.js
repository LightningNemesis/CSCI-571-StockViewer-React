import axios from "axios";

const getCompanyDescription = async (query) => {
  const response = await axios.get(`https://finnhub.io/api/v1/stock/profile2`, {
    params: {
      symbol: query,
      token: "cn2vjohr01qt9t7visi0cn2vjohr01qt9t7visig",
    },
  });
  return response.data;
};

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

export { getCompanyDescription, getCompanyHistorical };
