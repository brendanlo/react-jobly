import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import JoblyApi from './api';
import JobCard from './JobCard';

/** Shows the details about a company
 * 
 * Props:
 * - none
 * 
 * State: 
 * - company: object containing company information
 * - jobs: array of job objects
 * - isLoading: boolean representing whether the company and job data has loaded
 * 
 * Routes -> CompanyDetail -> JobCard
 */
function CompanyDetail() {
  console.log("<CompanyDetail>");
  const { name } = useParams();
  const [company, setCompany] = useState({});
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function fetchCompanyAndJobsOnLoad() {
    // fetch company details and jobs
    async function fetchCompanyAndJobs() {
      const companyResult = await JoblyApi.getCompany(name);
      setCompany(companyResult);
      console.log(companyResult);

      //CR don't need the all jobs call, this info is inside companyResult
      const allJobsResult = await JoblyApi.getJobs();
      console.log("allJobsResult", allJobsResult)
      // filter all jobs down to those that match the company name
      setJobs(allJobsResult.filter(job => job.companyHandle === name));

      setIsLoading(false);
    }
    fetchCompanyAndJobs();
  }, [name]);

  if (isLoading) return <p>Loading...</p>


  return (
    <div className="CompanyDetail">
      <h1> {company.name} </h1>
      <div> {company.description} </div>
      <div> {jobs.map(job => <JobCard job={job} key={job.id} />)} </div>
    </div>
  );
}

export default CompanyDetail;