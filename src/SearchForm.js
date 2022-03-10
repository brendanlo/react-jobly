import { useState } from "react";

function SearchForm({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleChange(evt) {
    const { value } = evt.target;
    setSearchTerm(value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
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