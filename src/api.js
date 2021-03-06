import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes -----------------------------------------------------

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get list of companies. 
   * Can optionally provide search term on company name.
   */

  static async getCompanies(searchName) {
    console.log("getCompanies(), searchName = ", searchName);
    let nameFilter = (searchName) ? { name: searchName } : {};
    let res = await this.request(`companies`, nameFilter);
    return res.companies;
  }

  /** Get list of jobs. 
   * Can optionally provide search term on job title. 
   * */

  static async getJobs(searchTitle) {
    const titleFilter = (searchTitle) ? { title: searchTitle } : {};
    let res = await this.request(`jobs`, titleFilter);
    return res.jobs;
  }

  /** Get list of jobs from a single company */
  static async getCompanyJobs(handle) {
    let res = await this.request(`jobs`, { handle: handle });
    return res.jobs;
  }


  /** Logging in a user. Returns the token and udpates the static JoblyApi.token
   * to that user's token.
   */
  // CR call fn login
  static async getUserToken(username, password) {
    // get token
    let tokenRes = await this.request('auth/token', {
      username: username,
      password: password
    }, "post");

    JoblyApi.token = tokenRes.token;
    console.log("logInUser, JoblyApi.token=", JoblyApi.token);

    return JoblyApi.token;
  }

  /** Retrieves user details given a username string. Returns a user object */
  static async getUserData(username) {
    // get user data
    console.log("getUserData, JoblyApi.token =", JoblyApi.token);
    let res = await this.request(`users/${username}`);
    console.log("getUserData, res=", res);

    return res.user;
  }

  /** Updates the firstName, lastName, or email of the current user. Returns
   * the user object
   */
  static async updateUserData(username, firstName, lastName, email) {
    const updateData = {
      firstName: firstName,
      lastName: lastName,
      email: email
    }
    let res = await this.request(`users/${username}`, updateData, "patch");

    return res.user;
  }

  /** Creates a user given username, password, firstName, lastName, and email.
   * Sets the static JoblyApi.token to the retrieved token and returns it.
   */
  static async createUser(username, password, firstName, lastName, email) {
    console.log("createUser, username =", username);

    let tokenRes = await this.request('auth/register', {
      "username": username,
      "password": password,
      "firstName": firstName,
      "lastName": lastName,
      "email": email
    }, "post");

    console.log("createUser, tokenRes=", tokenRes);
    JoblyApi.token = tokenRes.token;

    return JoblyApi.token;
  }

  /** applies to a job & returns an object of {applied: jobId}*/
  static async applyToJob(username, id) {
    const data = {};
    let appliedRes = await this.request(
      `users/${username}/jobs/${id}`,
      data,
      "post");

    return appliedRes;
  }

}



export default JoblyApi;