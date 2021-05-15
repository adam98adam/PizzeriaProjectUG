import axios from "axios";
const User_Api_Base_Url = "http://localhost:8080/api";

class CrustService {
  getAllCrust() {
    return axios.get(User_Api_Base_Url + "/crusts");
  }
  addNewCrust(crust) {
    return axios.post(User_Api_Base_Url + "/crusts", crust);
  }
  updateCrust(crust, id) {
    return axios.put(User_Api_Base_Url + `/crusts/${id}`, crust);
  }
  deleteCrustById(id) {
    return axios.delete(User_Api_Base_Url + `/crusts/${id}`);
  }
}

export default new CrustService();
