import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./userContext";

/** displays the navigation bar. View differs based on whether the user is
 * logged in or not.
 * 
 * Context:
 * * - currentUser: object containing user data
 *     {applications: [1,2,3] // array of job id's
        email: "email@mail.com"
        firstName: "john"
        isAdmin: false // boolean representing whether they're admin or not
        lastName: "doe"
        username: "username123"}
 * 
 * Props:
 * - logOutUser: function that will set token and user data to null
 * 
 * App -> Navigation
 */

function Navigation({ logOutUser }) {
  const { currentUser } = useContext(UserContext);
  console.log("<Navigation>");

  return (
    <nav className='Navigation'>
      {(currentUser)
        ? (
          <div className="Navigation-loggedIn">
            <NavLink exact to='/'> Jobly </NavLink>
            <NavLink exact to='/companies'> Companies </NavLink>
            <NavLink exact to='/jobs'> Jobs </NavLink>
            <NavLink exact to='/profile'>Profile</NavLink>
            <Link to='/' onClick={logOutUser}>{`Log Out ${currentUser.username}`} </Link>
          </div>)
        : (<div className="Navigation-loggedOut">
          <NavLink exact to='/'> Jobly </NavLink>
          <NavLink exact to='/login'> Log In </NavLink>
          <NavLink exact to='/signup'> Sign Up </NavLink>
        </div>)
      }
    </nav>
  );
}

export default Navigation;