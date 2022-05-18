import { useState, useEffect } from "react";
import JoblyApi from "./api";
import SearchForm from "./SearchForm";
import JobCard from "./JobCard";

/** JobList displays the list of all jobs or a filtered list of 
 * jobs if a search has been made.
 * 
 * Props:
 * - None
 * 
 * State:
 * - jobs: an array of job objects
 * [{
      "id": 1,
      "title": "Conservator, furniture",
      "salary": 110000,
      "equity": "0",
      "companyHandle": "watson-davis",
      "companyName": "Watson-Davis"
    },
    ...]
 * - isLoading: boolean representing whether the job data has been loaded
 * 
 * Routes -> JobList -> (JobCard, SearchForm)
 */

function JobList({ applytoJobAndUpdate }) {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log("<JobList>", jobs, isLoading);

  useEffect(function fetchAllJobsOnLoad() {
    // fetch all jobs
    async function fetchAllJobs() {
      const result = await JoblyApi.getJobs();
      setJobs(result);
      setIsLoading(false);
    }
    fetchAllJobs();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  async function handleSearch(jobSearch) {
    // fetch only the jobs that contain the searchTerm
    const result = await JoblyApi.getJobs(jobSearch);
    setJobs(result);
  }

  return (
    <div className="JobList">
      <h1>Available Jobs </h1>
      <div className="JobList-search">
        <SearchForm handleSearch={handleSearch} />
      </div>
      <div className="JobList-container"> {jobs.map(job =>
        <JobCard
          job={job}
          key={job.id}
          applytoJobAndUpdate={applytoJobAndUpdate} />)} </div>
    </div>
  );
}


export default JobList;