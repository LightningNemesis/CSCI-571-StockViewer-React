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
  const [wallet, setWallet] = useState(0);
  const [portfolio, setPortfolio] = useState([]);

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

  // Get wallet amount
  const fetchWallet = useCallback(async (query) => {
    const response = await axios.get("http://localhost:3001/wallet");

    console.log("fetchWallet", response.data.amount);
    setWallet(parseInt(response.data.amount));
  }, []);

  // Get all stocks stored in DB ~ part of the Portfolio
  const fetchPortfolio = useCallback(async () => {
    const response = await axios.get("http://localhost:3001/portfolio");
    console.log("fetchPortfolio", response.data);
    setPortfolio(response.data);
  }, []);

  // Buying Stocks: needs a stock and quantity
  const buyStocks = async (stockSelected, quantity) => {
    const numericQuantity = quantity === "" ? 0 : parseInt(quantity, 10);
    const purchaseCost = numericQuantity * stockSelected.currentPrice;

    let newPortfolio = [...portfolio];

    const stockIndex = newPortfolio.findIndex(
      //   (stock) => stockSelected.symbol === stock.symbol
      (stock) => stockSelected.id === stock.id
    );

    if (stockIndex === -1) {
      // Add the stock to the portfolio
      const newStock = {
        ...stockSelected,
        quantity: numericQuantity,
        avgCost: stockSelected.currentPrice,
        totalCost: purchaseCost,
      };

      console.log("newStock", newStock);

      const response = await axios.post("http://localhost:3001/portfolio", {
        newStock,
      });

      //   console.log(response.data);

      newPortfolio.push(newStock);
    } else {
      // Update the stock in the portfolio
      const existingStock = newPortfolio[stockIndex];
      const newQuantity =
        parseInt(existingStock.quantity, 10) + numericQuantity;
      const newAvgCost = (existingStock.totalCost + purchaseCost) / newQuantity;
      const newTotalCost = newQuantity * stockSelected.currentPrice;

      const updatedStock = {
        ...existingStock,
        quantity: newQuantity,
        avgCost: newAvgCost,
        totalCost: newTotalCost,
      };
      console.log("updatedStock", updatedStock);

      const response = await axios.put(
        `http://localhost:3001/portfolio/${updatedStock.id}`,
        updatedStock
      );
      //   console.log(response.data);

      newPortfolio[stockIndex] = updatedStock;
    }

    setPortfolio(newPortfolio);
  };

  //   //   Editing Portfolio: needs an id
  //   const sellStocks = async (title) => {
  //     // const response = await axios.put(`http://localhost:3001/books/${id}`, {
  //     //   title: newTitle,
  //     // });
  //     // const updatedBooks = books.map((book) => {
  //     //   if (book.id === id) {
  //     //     return { ...book, ...response.data };
  //     //   }
  //     //   return book;
  //     // });
  //     // setBooks(updatedBooks);
  //   };

  const sellStocks = async (stockSelected, quantity) => {
    const numericQuantity = quantity === "" ? 0 : parseInt(quantity, 10);

    let newPortfolio = [...portfolio];

    const stockIndex = newPortfolio.findIndex(
      (stock) => stockSelected.id === stock.id
    );

    if (stockIndex !== -1) {
      // Stock is in the portfolio
      const existingStock = newPortfolio[stockIndex];
      const newQuantity =
        parseInt(existingStock.quantity, 10) - numericQuantity;

      if (newQuantity < 0) {
        console.error("Cannot sell more stocks than you own");
        // Handle error: trying to sell more than owned
        return;
      }

      if (newQuantity === 0) {
        // If all stocks are sold, remove it from the portfolio
        newPortfolio.splice(stockIndex, 1);
        await axios.delete(
          `http://localhost:3001/portfolio/${existingStock.id}`
        );
      } else {
        // Update the quantity of the stock in the portfolio
        const newTotalCost = newQuantity * existingStock.avgCost; // Or however you want to handle total cost reduction

        const updatedStock = {
          ...existingStock,
          quantity: newQuantity,
          totalCost: newTotalCost,
          // avgCost stays the same unless you have a specific reason to change it
        };

        console.log("updatedStock", updatedStock);

        await axios.put(
          `http://localhost:3001/portfolio/${existingStock.id}`,
          updatedStock
        );

        newPortfolio[stockIndex] = updatedStock;
      }
    } else {
      console.error("Stock not found in portfolio");
      // Handle error: stock not found in portfolio
      return;
    }

    setPortfolio(newPortfolio);
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

    wallet,
    fetchWallet,

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
