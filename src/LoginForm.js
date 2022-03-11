import { useState } from "react";
import { Redirect } from "react-router-dom";

/** Shows login form and handles inputs
 * 
 * Props:
 * - logInUser(): function that handles authenticating user
 * 
 * State:
 * - formData: object containing form fields and data
 * - doRedirect: boolean, represents whether we should redirect to another page
 * 
 * Routes -> LoginForm
 */

function LoginForm({ logInUser }) {
  // NOTE set defaults to "" once out of development
  const defaults = { username: "testadmin", password: "password" };
  const [formData, setFormData] = useState(defaults);
  const [doRedirect, setDoRedirect] = useState(false);

  // keeps input values up to date
  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData(data => ({ ...data, [name]: value }));
  }

  // handles submitting the form and flagging for a redirect once done
  //CR try catch. await the loginUser. possible alert component if time
  function handleSubmit(evt) {
    evt.preventDefault();
    logInUser(formData.username, formData.password);
    setDoRedirect(true);
  }

  if (doRedirect) return <Redirect to="/companies" />

  return (
    <div className="LoginForm">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange} />
        <button>Submit</button>
      </form>
    </div>
  );

}

export default LoginForm;