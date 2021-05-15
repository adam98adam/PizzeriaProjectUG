import axios from "axios";
const User_Api_Base_Url = "http://localhost:8080/api/bakestyle";
class BakestyleService {
  getAllBakestyle() {
    return axios.get(User_Api_Base_Url);
  }
  addNewBakestyle(bakestyle) {
    return axios.post(User_Api_Base_Url, bakestyle);
  }
  updateBakestyle(bakestyle, id) {
    return axios.put(User_Api_Base_Url + `/${id}`, bakestyle);
  }
  deleteBakestyleById(id) {
    return axios.delete(User_Api_Base_Url + `/${id}`);
  }
}

export default new BakestyleService();
