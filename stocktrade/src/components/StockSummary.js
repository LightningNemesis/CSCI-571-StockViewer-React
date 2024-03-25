import { useEffect, useState } from "react";

function StockSummary({ companyDescription, stockData }) {
  return (
    <div>
      Stock Summay tab:
      <div>{companyDescription?.name}</div>
      <div>c:{stockData?.c}</div>
      <div>dp:{stockData?.dp}</div>
    </div>
  );
}

export default StockSummary;
