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
 * - 
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

      const allJobsResult = await JoblyApi.getJobs();
      console.log("allJobsResult", allJobsResult)
      setJobs(allJobsResult.filter(job => job.companyHandle === name));

      setIsLoading(false);
    }
    fetchCompanyAndJobs();
  }, []);

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