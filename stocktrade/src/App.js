import { useEffect, useState } from "react";

import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import StockDetails from "./components/StockDetails";
import FooterBar from "./components/Footer";

import { getCompanyDescription, getCompanyHistorical } from "./api";

function App() {
  const [companyDescription, setCompanyDescription] = useState(null);
  const [companyHistorical, setCompanyHistorical] = useState(null);

  useEffect(() => {
    console.log("companyDescription", companyDescription);
    console.log("companyHistorical", companyHistorical);
  }, [companyDescription, companyHistorical]);

  const handleSubmit = async (term) => {
    const compDescRes = await getCompanyDescription(term);
    const compHistRes = await getCompanyHistorical(term);

    setCompanyDescription(compDescRes);
    setCompanyHistorical(compHistRes);
  };

  return (
    <div>
      {/* <NavBar /> */}
      <SearchBar onSubmit={handleSubmit} />
      {companyDescription != null && companyHistorical != null && (
        <StockDetails
          companyDescription={companyDescription}
          companyHistorical={companyHistorical}
        />
      )}
      {/* <FooterBar /> */}
    </div>
  );
}

export default App;
