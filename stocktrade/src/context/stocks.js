import axios from "axios";
import { createContext, useState, useCallback } from "react";

const StocksContext = createContext();

function Provider({ children }) {
  const [companyDescription, setCompanyDescription] = useState(null);
  const [companyPeers, setCompanyPeers] = useState([]);
  const [stockData, setStockData] = useState(null);
  const [companyHistorical, setCompanyHistorical] = useState(null);
  const [companyNews, setCompanyNews] = useState([]);

  const [watchlist, setWatchlist] = useState([]);
  const [portfolio, setPortfolip] = useState([]);

  // --------------------------------------------------------------
  // Search section
  // --------------------------------------------------------------

  // Finnhub: returns Company Profile, for Search Results
  const getCompanyTab = async (query) => {
    const response = await axios.get(
      `https://finnhub.io/api/v1/stock/profile2`,
      {
        params: {
          symbol: query,
          token: "cn2vjohr01qt9t7visi0cn2vjohr01qt9t7visig",
        },
      }
    );

    setCompanyDescription(response.data);
  };

  // Finnhub: returns Stock Summary, for Stock Tab
  const getStockSummary = async (query) => {
    const response = await axios.get(`https://finnhub.io/api/v1/quote`, {
      params: {
        symbol: query,
        token: "cn2vjohr01qt9t7visi0cn2vjohr01qt9t7visig",
      },
    });

    setStockData(response.data);
  };

  // Finnhub: returns Company News, for News Tab
  const getCompanyNews = async (query) => {
    const response = await axios.get(`https://finnhub.io/api/v1/company-news`, {
      params: {
        symbol: query,
        from: "2022-01-15",
        to: "2024-02-09",
        token: "cn2vjohr01qt9t7visi0cn2vjohr01qt9t7visig",
      },
    });

    setCompanyNews(response.data);
  };

  // Finnhub: returns Company Peers, for Summary Tab
  const getCompanyPeers = async (query) => {
    const response = await axios.get(`https://finnhub.io/api/v1/stock/peers`, {
      params: {
        symbol: query,
        token: "cn2vjohr01qt9t7visi0cn2vjohr01qt9t7visig",
      },
    });

    setCompanyPeers(response.data);
  };

  //Polygon API call: returns timeseries data for a given stock symbol
  const getCompanyHistorical = async (query) => {
    let fromDate = "2022-03-25";
    let toDate = "2024-03-25";
    const response = await axios.get(
      `https://api.polygon.io/v2/aggs/ticker/${query}/range/1/day/${fromDate}/${toDate}?adjusted=true&sort=asc`,
      {
        headers: {
          Authorization: "Bearer y9CbEJ1gYrXZpwAWpXbAJrAL1ziBkaV2",
        },
      }
    );

    setCompanyHistorical(response.data);
  };

  // --------------------------------------------------------------
  // Watch List section
  // --------------------------------------------------------------

  // Get all stocks stored in DB ~ part of the watchlist
  const fetchWatchlist = useCallback(async () => {
    const response = await axios.get("http://localhost:3001/watchlist");
    setWatchlist(response.data);
  }, []);

  // Adding stocks to the watchlist
  const createWatchlist = async (title) => {
    const response = await axios.post("http://localhost:3001/watchlist/", {
      title,
    });
    setWatchlist([...watchlist, response.data]);
  };

  // Deleting stocks from watchlist: needs an id
  const deleteWatchlistById = async (id) => {
    await axios.delete(`http://localhost:3001/watchlist/${id}`);
    const updatedWatchlist = watchlist.filter((stock) => {
      return stock.id !== id;
    });
    setWatchlist(updatedWatchlist);
  };

  // --------------------------------------------------------------
  // Portfolio section
  // --------------------------------------------------------------

  // Get all stocks stored in DB ~ part of the Portfolio
  const fetchPortfolio = useCallback(async () => {
    // const response = await axios.get("http://localhost:3001/books");
    // setBooks(response.data);
  }, []);

  // Adding stocks to the watchlist
  const buyStocks = async (title) => {
    // const response = await axios.post("http://localhost:3001/books/", {
    //   title,
    // });
    // setBooks([...books, response.data]);
  };

  //   Editing Portfolio: needs an id
  const sellStocks = async (title) => {
    // const response = await axios.put(`http://localhost:3001/books/${id}`, {
    //   title: newTitle,
    // });
    // const updatedBooks = books.map((book) => {
    //   if (book.id === id) {
    //     return { ...book, ...response.data };
    //   }
    //   return book;
    // });
    // setBooks(updatedBooks);
  };

  const valuesToShare = {
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

    watchlist,
    fetchWatchlist,
    createWatchlist,
    deleteWatchlistById,
    portfolio,
    fetchPortfolio,
    buyStocks,
    sellStocks,
  };

  return (
    <StocksContext.Provider value={valuesToShare}>
      {children}
    </StocksContext.Provider>
  );
}

export { Provider };
export default StocksContext;
