import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./userContext";

//CR docstring - document context as well
function Navigation({ logOutUser }) {
  const { currentUser } = useContext(UserContext);
  console.log("<Navigation>");

  // CR can change to (currentUser) on line 13 when change to token logic
  return (
    <nav className='Navigation'>
      {(currentUser.username.length > 0)
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