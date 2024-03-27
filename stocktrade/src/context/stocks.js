import axios from "axios";
import { createContext, useState, useCallback } from "react";

const StocksContext = createContext();

function Provider({ children }) {
  const [watchlist, setWatchlist] = useState([]);
  const [portfolio, setPortfolip] = useState([]);

  // -----------------------------
  // Watch List section
  // -----------------------------

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

  // -----------------------------
  // Portfolio section
  // -----------------------------

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
