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
function CompanyCard({ company: { handle, name, description, logoUrl } }) {
  console.log("CompanyCard, handle= ", handle)
  return (
    <div className='CompanyCard'>
      <Link to={`/companies/${handle}`} key={handle}>
        <h3> {name} </h3>
        <p> {description} </p>
        <img
          src={process.env.PUBLIC_URL + logoUrl}
          alt={name} />
      </Link>
    </div>
  );
}

export default CompanyCard;