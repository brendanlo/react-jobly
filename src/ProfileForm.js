import { useContext, useState } from "react";
import UserContext from "./userContext";

function ProfileForm({ changeUserData }) {
  const { currentUser } = useContext(UserContext);
  console.log("<ProfileForm>");

  const [formData, setFormData] = useState(currentUser);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

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
  )
}

export default ProfileForm;