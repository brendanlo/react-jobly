import './App.css';
import Navigation from './Navigation';
import Routes from './Routes';
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from 'react';
import JoblyApi from './api';
import UserContext from './userContext';



function App() {

  const userDefault = {
    username: "",
    firstName: "",
    lastName: "",
    isAdmin: "",
    jobs: ""
  }
  const [currentUser, setCurrentUser] = useState(userDefault);
  const [token, setToken] = useState("");

  console.log("<App> currentUser =", currentUser);

  /** whenever the token state changes, query the DB to pull the rest of the 
   * user data
   */
  useEffect(function updateUserWhenTokenChanges() {
    async function updateUser() {
      const newUserData = await JoblyApi.getUserData(currentUser.username);

      console.log("updateUser(), newUserData = ", newUserData);

      setCurrentUser(newUserData);
    }
    updateUser()
  }, [token, currentUser.username]);

  /** sets the user and token states to null, effectively removing access to
   * the user
  */
  function logOutUser() {
    setCurrentUser(null);
    setToken(null);
  }

  /** handles login. Updates currentUser and token with data from the server */
  async function logInUser(username, password) {
    const newToken = await JoblyApi.getUserToken(username, password);

    // NOTE unsure if need this:
    setCurrentUser({ ...currentUser, username: username });

    setToken(newToken);
  }





  return (
    <div className='App'>
      <UserContext.Provider value={{ currentUser }}>
        <BrowserRouter>
          <Navigation logOutUser={logOutUser} />
          <Routes logInUser={logInUser} />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
