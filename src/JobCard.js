
//CR docstring

// CR descructure the job object for clarity
function JobCard({ job }) {
  return (
    <div className="JobCard">
      <h2> {job.title}</h2>
      <p> {job.companyName}</p>
      <div><small>Salary: {job.salary}</small></div>
      <div><small>Equity: {job.equity}</small></div>
    </div>
  );
}

export default JobCard;