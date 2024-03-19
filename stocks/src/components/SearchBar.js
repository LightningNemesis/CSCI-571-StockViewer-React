import { useState } from "react";

function SearchBar({ onSubmit }) {
  const [ticker, setTicker] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(ticker);
    setTicker("");
  };

  const handleChange = (event) => {
    setTicker(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={ticker}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
