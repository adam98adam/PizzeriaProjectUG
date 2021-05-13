import axios from "axios";
const User_Api_Base_Url = "http://localhost:8080/api";

class CrustService {
  getAllCrust() {
    return axios.get(User_Api_Base_Url + "/crusts");
  }
}

export default new CrustService();
