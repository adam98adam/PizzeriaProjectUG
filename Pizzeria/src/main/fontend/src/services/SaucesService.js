import axios from "axios";
const User_Api_Base_Url = "http://localhost:8080/api/sauces";
class SaucesService {
  getAllSauces() {
    return axios.get(User_Api_Base_Url);
  }
  addNewSauce(sauce) {
    return axios.post(User_Api_Base_Url, sauce);
  }
  updateSauce(sauce, id) {
    return axios.put(User_Api_Base_Url + `/${id}`, sauce);
  }
  deleteSauceById(id) {
    return axios.delete(User_Api_Base_Url + `/${id}`);
  }
}

export default new SaucesService();
