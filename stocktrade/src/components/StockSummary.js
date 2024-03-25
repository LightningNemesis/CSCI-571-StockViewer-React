import { useEffect, useState } from "react";

function StockSummary({ companyDescription, stockData }) {
  return (
    <div>
      <h1>Stock Summary</h1>
      <div>High Price: {stockData.h}</div>
      <div>Low Price: {stockData.l}</div>
      <div>Open Price: {stockData.o}</div>
      <div>prev. Close: {stockData.pc}</div>
    </div>
  );
}

export default StockSummary;
