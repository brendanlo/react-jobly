import { useState } from "react";



/** Displays and handles inputs for the search form
 * 
 * Props:
 * - handlesearch: function that describes how to handle the search term
 * 
 * State:
 * - searchTerm: string that is the search term
 * 
 * (CompanyList, JobList) -> SearchForm
 */
function SearchForm({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleChange(evt) {
    const { value } = evt.target;
    setSearchTerm(value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    //CR trim will take care of extra spaces
    handleSearch(searchTerm);
  }

  return (
    <form className="SearchForm" onSubmit={handleSubmit}>
      <input name="search" value={searchTerm} onChange={handleChange} />
      <button>Search</button>
    </form>
  )
}

export default SearchForm;