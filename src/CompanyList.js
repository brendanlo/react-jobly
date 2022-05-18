import { useState, useEffect } from "react";
import JoblyApi from "./api";
import SearchForm from './SearchForm';
import CompanyCard from "./CompanyCard";

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
      "description": "Somebody program how I. 
        Face give away discussion view act inside. 
        Your official relationship administration here.",
      "numEmployees": 245,
      "logoUrl": "/logos/logo3.png"
    },
    ...]
 * - isLoading: boolean representing whether the company data has been loaded
 * 
 * Routes -> CompanyList -> (CompanyCard, SearchForm)
 */

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log("<CompanyList>", companies, isLoading);

  useEffect(function fetchAllCompaniesOnLoad() {
    // fetch all companies
    async function fetchAllCompanies() {
      const result = await JoblyApi.getCompanies();
      setCompanies(result);
      setIsLoading(false);
      console.log("fetchAllCompanies(), result = ", result);
    }
    fetchAllCompanies();
  }, []);


  if (isLoading) return <p>Loading...</p>;


  // handles updating the searchTerm state when the search form is run
  // NOTE review solution on how to combine fetchAllCompanies & handleSearch
  async function handleSearch(searchTerm) {
    // fetch only the companies that contain the searchTerm
    const result = await JoblyApi.getCompanies(searchTerm);
    setCompanies(result);
  }


  return (
    <div className="CompanyList">
      <h1> Companies</h1>
      <div className="CompanyList-search">
        <SearchForm handleSearch={handleSearch} />
      </div>
      <div className="CompanyList-companies">
        {(companies.length > 0)
          ? companies.map(company => {
            return <CompanyCard company={company} key={company.handle} />
          })
          : <p>No companies found</p>
        }
      </div>
    </div >
  )

}

export default CompanyList;