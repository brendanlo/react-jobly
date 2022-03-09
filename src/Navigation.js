import { NavLink } from "react-router-dom";


function Navigation() {
  console.log("<Navigation>");

  return (
    <nav className='Navigation'>
      <NavLink exact to='/'> Jobly </NavLink>
      <NavLink exact to='/companies'> Companies </NavLink>
      <NavLink exact to='/jobs'> Jobs </NavLink>
    </nav>
  );
}

export default Navigation;