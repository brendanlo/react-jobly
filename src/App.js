import './App.css';
import Navigation from './Navigation';
import Routes from './Routes';
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from 'react';
import JoblyApi from './api';
import UserContext from './userContext';


//CR docstring
function App() {

  //CR initial value null
  const userDefault = {
    username: "",
    firstName: "",
    lastName: "",
    isAdmin: "",
    applications: []
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
    // CR update this for null initial value -> pull jwt decode to pull the username out of the token 
    // jwt-decode 
    if (currentUser.username !== userDefault.username) {
      updateUser()
    }
  }, [token, currentUser.username, userDefault.username]);

  /** sets the user and token states to null, effectively removing access to
   * the user
  */
  function logOutUser() {
    setCurrentUser(userDefault); // CR set to null
    setToken(null);
  }

  /** handles login. Updates currentUser and token with data from the server */
  async function logInUser(username, password) {
    // get and set token
    const newToken = await JoblyApi.getUserToken(username, password);
    setToken(newToken);

    // set username
    setCurrentUser({ username: username }); //CR not needed when token decoding
  }

  /** makes a new user and updates the user and token values
   */
  // CR signup function
  async function createUserAndAuth(
    username, password, firstName, lastName, email) {
    //get & set token
    const newToken = await JoblyApi.createUser(
      username, password, firstName, lastName, email);
    setToken(newToken.token);

    console.log("createUserAndAuth, newToken =", newToken);

    // set username
    setCurrentUser({ username: username }); //CR not needed
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
            createUserAndAuth={createUserAndAuth}
            changeUserData={changeUserData}
            applytoJobAndUpdate={applytoJobAndUpdate} />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
