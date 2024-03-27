import { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import Search from "./pages/Search";
import Portfolio from "./pages/Portfolio";
import Watchlist from "./pages/Watchlist";

import FooterBar from "./components/Footer";
import StocksContext from "./context/stocks";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item>
                <Link className="nav-link" to="/">
                  Search
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link" to="/watchlist">
                  Watchlist
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link" to="/portfolio">
                  Portfolio
                </Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
      {/* <FooterBar /> */}
    </div>
  );
}

export default App;
