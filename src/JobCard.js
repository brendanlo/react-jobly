import { useContext } from "react";
import UserContext from "./userContext";


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

function JobCard({
  job: { title, companyName, salary, equity, id },
  applytoJobAndUpdate }) {
  const { currentUser } = useContext(UserContext);

  function hasApplied() {
    const apps = currentUser.applications;
    return apps.includes(id);
  }

  function handleClick() {
    applytoJobAndUpdate(currentUser.username, id);
  }

  return (
    <div className="JobCard">
      <h2> {title}</h2>
      <p> {companyName}</p>
      <div><small>Salary: {salary}</small></div>
      <div><small>Equity: {equity}</small></div>
      {/* <button
        {hasApplied && "disabled"}
        onClick={handleClick}> Apply </button> */}
    </div>
  );
}

export default JobCard;

