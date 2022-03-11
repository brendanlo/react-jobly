import { useState } from "react";
import { Redirect } from "react-router-dom";

/** Shows signup form and handles inputs
 * 
 * Props:
 * - createNewUser(): function that handles creating a new user
 * 
 * State:
 * - formData: object containing form fields and data
 * - doRedirect: boolean representing whether or not to redirect to another page
 * 
 * Routes -> SignupForm
 */

function SignupForm({ createUserAndAuth }) {
  // NOTE set defaults to "" once out of development
  const defaults = {
    username: "newest",
    password: "newest",
    firstName: "newest",
    lastName: "newest",
    email: "newest@mail.com"
  };
  const [formData, setFormData] = useState(defaults);
  const [doRedirect, setDoRedirect] = useState(false);

  // keeps input data updated
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  // handles form submit and flagging for redirect
  function handleSubmit(evt) {
    evt.preventDefault();
    createUserAndAuth(
      formData.username,
      formData.password,
      formData.firstName,
      formData.lastName,
      formData.email);

    setDoRedirect(true);
  }

  if (doRedirect) return <Redirect to="/companies" />

  return (
    <div className="SignupForm">
      <h1>Sign up</h1>

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

        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange} />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange} />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange} />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default SignupForm;