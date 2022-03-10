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


  // static async getCompanies() {
  //   let res = await this.request(`companies`);
  //   console.log("getCompanies(), res.companies =", res.companies);
  //   return res.companies;
  // }
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
    console.log("getJobs(), searchTitle = ", searchTitle);
    const titleFilter = (searchTitle) ? { title: searchTitle } : {};
    let res = await this.request(`jobs`, titleFilter);
    return res.jobs;
  }

}


export default JoblyApi;