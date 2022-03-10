import { Link } from 'react-router-dom';


/** Displays the information about a company
 * 
 * Props:
 * - company: object representing the company information
 * {
      "handle": "anderson-arias-morrow",
      "name": "Anderson, Arias and Morrow",
      "description": "Somebody program how I. Face give away discussion view act inside. Your official relationship administration here.",
      "numEmployees": 245,
      "logoUrl": "/logos/logo3.png"
    }
 * 
 * State:
 * - none
 * 
 * CompanyList -> CompanyCard
 */
function CompanyCard({ company }) {
  return (
    <div className='CompanyCard'>
      <Link to={`/companies/${company.handle}`} key={company.handle}>
        <h3> {company.name} </h3>
        <p> {company.description} </p>
        <img
          src={process.env.PUBLIC_URL + company.logoUrl}
          alt={company.name} />
      </Link>
    </div>
  );
}

export default CompanyCard;