import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./userContext";

function Homepage() {
  const { currentUser } = useContext(UserContext);
  console.log("<Homepage>, currentUser = ", currentUser);

  return (
    <div className="Homepage">
      <h1 >Jobly</h1>
      {currentUser
        ? <p>Welcome back <b>{currentUser.username}</b>!!</p>
        : <div>
          <p>All the jobs in one, convenient place.</p>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>}
    </div >
  );
}

export default Homepage;