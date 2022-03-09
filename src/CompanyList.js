import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  async function handleSearch(companySearch) {
    // fetch only the companies that contain the searchTerm
    const result = await JoblyApi.getCompanies(companySearch);
    setCompanies(result.data);
  }


  return (
    <div className="CompanyList">
      <h1> Companies List!</h1>
      <div> search bar here</div>
      {/* <div className="CompanyList-companies"> */}
      {companies.map(company => {
        return (
          <Link to={`/company/'${company.name}>`} key={company.handle}>
            <h3> {company.name} </h3>
            <p> {company.description} </p>
            <img
              src={`${process.env.PUBLIC_URL}/${company.logoUrl}`}
              alt={company.name} />
          </Link>
        )
      })}
      {/* </div> */}
    </div >
  )

}

export default CompanyList;