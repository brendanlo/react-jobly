import './App.css';
import Navigation from './Navigation';
import Routes from './Routes';
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from 'react';
import JoblyApi from './api';
import UserContext from './userContext';
import jwt_decode from "jwt-decode";



//CR docstring
function App() {
  const localUser = JSON.parse(localStorage.getItem("currentUser"));
  const [currentUser, setCurrentUser] = useState(localUser);
  const [token, setToken] = useState(null);

  console.log("<App> currentUser =", currentUser);

  /** whenever the token state changes, query the DB to pull the rest of the 
   * user data
   */
  useEffect(function updateUserWhenTokenChanges() {
    async function updateUser() {
      const decode = jwt_decode(token);
      const newUserData = await JoblyApi.getUserData(decode.username);
      const newUserDataJSON = JSON.stringify(newUserData);
      localStorage.setItem("currentUser", newUserDataJSON);

      setCurrentUser(newUserData);
    }
    if (token) {
      updateUser()
    }
  }, [token]);

  /** sets the user and token states to null, effectively removing access to
   * the user
  */
  function logOutUser() {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem("currentUser");
  }

  /** handles login. Updates currentUser and token with data from the server */
  async function logInUser(username, password) {
    // get and set token
    const newToken = await JoblyApi.getUserToken(username, password);
    setToken(newToken);
  }

  /** makes a new user and updates the user and token values
   */
  async function signUpUser(
    username, password, firstName, lastName, email) {
    //get & set token
    const newToken = await JoblyApi.createUser(
      username, password, firstName, lastName, email);
    setToken(newToken.token);
  }

  /** updates the current user data */
  async function changeUserData(username, firstName, lastName, email) {
    const updatedUser = await JoblyApi.updateUserData(
      username,
      firstName,
      lastName,
      email);
    setCurrentUser(updatedUser);
  }

  /** applies to a job and updates the user state */
  async function applytoJobAndUpdate(username, id) {
    await JoblyApi.applyToJob(username, id);
    setCurrentUser(user => ({ ...user }));
  }




  return (
    <div className='App'>
      <UserContext.Provider value={{ currentUser }}>
        <BrowserRouter>
          <Navigation logOutUser={logOutUser} />
          <Routes
            logInUser={logInUser}
            signUpUser={signUpUser}
            changeUserData={changeUserData}
            applytoJobAndUpdate={applytoJobAndUpdate} />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
