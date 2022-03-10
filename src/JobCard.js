

/** Displays information about a job
 * 
 * Props:
 * - job: object containing information pertaining to a job
    * {companyHandle: "watson-davis"
        companyName: "Watson-Davis"
        equity: "0"
        id: 1
        salary: 110000
        title: "Conservator, furniture"}
 * 
 * State:
 * - none
 * 
 * (JobList, CompanyDetail) -> JobCard
 */

function JobCard({ job: { title, companyName, salary, equity } }) {
  return (
    <div className="JobCard">
      <h2> {title}</h2>
      <p> {companyName}</p>
      <div><small>Salary: {salary}</small></div>
      <div><small>Equity: {equity}</small></div>
    </div>
  );
}

export default JobCard;