import { useState } from "react";

/** Shows signup form and handles inputs
 * 
 * Props:
 * - createNewUser(): function that handles creating a new user
 * 
 * State:
 * - formData: object containing form fields and data
 * 
 * Routes -> SignupForm
 */

function SignupForm({ createNewUser }) {
  // NOTE set defaults to "" once out of development
  const defaults = {
    username: "newest",
    password: "newest",
    firstName: "newest",
    lastName: "newest",
    email: "newest@mail.com"
  };
  const [formData, setFormData] = useState(defaults);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    createNewUser(formData);
  }
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
          value={formData.password}
          onChange={handleChange} />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.password}
          onChange={handleChange} />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.password}
          onChange={handleChange} />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default SignupForm;