import { useState } from "react";
import { Redirect } from "react-router-dom";

/** Shows login form and handles inputs
 * 
 * Props:
 * - handleLogin(): function that handles authenticating user
 * 
 * State:
 * - formData: object containing form fields and data
 * 
 * Routes -> LoginForm
 */

function LoginForm({ logInUser }) {
  // NOTE set defaults to "" once out of development
  const defaults = { username: "testadmin", password: "password" };
  const [formData, setFormData] = useState(defaults);
  const [doRedirect, setDoRedirect] = useState(false);

  function handleChange(evt) {
    const { name, value } = evt.target;

    // QQ why does the new object need to be wrapped in parentheses?
    setFormData(data => ({ ...data, [name]: value }));
  }

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