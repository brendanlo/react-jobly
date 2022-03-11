import { useContext, useState } from "react";
import UserContext from "./userContext";

/** Renders the profile form that allows a user to edit some of their user
 * details.
 * 
 * Context:
 * - currentUser: object containing user data
 *     {applications: [1,2,3] // array of job id's
        email: "email@mail.com"
        firstName: "john"
        isAdmin: false // boolean representing whether they're admin or not
        lastName: "doe"
        username: "username123"}
 * 
 * Props:
 * - changeUserData: function that changes the user data
 * 
 * State:
 * - formData: object containing the form data fields
 * 
 * App -> ProfileForm
 */
function ProfileForm({ changeUserData }) {
  const { currentUser } = useContext(UserContext);
  console.log("<ProfileForm>");

  const [formData, setFormData] = useState(currentUser);

  // handles keeping inputs up to date
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  // handles submitting form
  function handleSubmit(evt) {
    evt.preventDefault();
    changeUserData(
      formData.username,
      formData.firstName,
      formData.lastName,
      formData.email);
  }


  return (
    <div className="ProfileForm">
      <h1> Your profile!</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          disabled />

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
  )
}

export default ProfileForm;