import { useEffect, useState } from "react";

function StockDetails({ companyDescription, companyHistorical }) {
  return (
    <div>
      StockDetails:
      {companyDescription?.name} {companyHistorical?.ticker}
    </div>
  );
}

export default StockDetails;
