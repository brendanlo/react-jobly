import { useState, useEffect } from "react";
import JoblyApi from "./api.js";

/** CompanyList displays the list of all companies or a filtered list of 
 * companies if a company search has been made.
 * 
 * Props:
 * - None
 * 
 * State:
 * - companies: an array of company objects
 * [{
      "handle": "anderson-arias-morrow",
      "name": "Anderson, Arias and Morrow",
      "description": "Somebody program how I. Face give away discussion view act inside. Your official relationship administration here.",
      "numEmployees": 245,
      "logoUrl": "/logos/logo3.png"
    },
    ...]
 * 
 * - isSearching: boolean representing whether a search has been made or not
 */

function CompanyList() {
  console.log("<CompanyList>");

  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);

  useEffect(function fetchCompaniesOnLoadOrSearch() {
    // fetch all companies
    async function fetchAllCompanies() {
      const result = JoblyApi.getCompanies();
      setCompanies(result);
    }

    // fetch only the companies that contain the searchTerm
    async function fetchSearchedCompanies() {
      const result = JoblyApi.getCompanies(searchTerm);
      setCompanies(result);
    }

    if (searchTerm) {
      fetchSearchedCompanies();
    } else {
      fetchAllCompanies();
    }
  }, [searchTerm]);


  // handles updating the searchTerm state when the search form is run
  function handleSearch(companySearch) {
    setSearchTerm(companySearch);
  }


  return (
    <div className="CompanyList">
      <h1> Companies List!</h1>
      <div> search bar here</div>
      <div className="CompanyList-companies">
        { }
      </div>
    </div>
  )

}

export default CompanyList;