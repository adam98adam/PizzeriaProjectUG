import axios from "axios";
const User_Api_Base_Url = "http://localhost:8080/api/cutstyle";
class CutstyleService {
  getAllCutstyle() {
    return axios.get(User_Api_Base_Url);
  }
  addNewCutstyle(cutstyle) {
    return axios.post(User_Api_Base_Url, cutstyle);
  }
  updateCutstyle(cutstyle, id) {
    return axios.put(User_Api_Base_Url + `/${id}`, cutstyle);
  }
  deleteCutstyleById(id) {
    return axios.delete(User_Api_Base_Url + `/${id}`);
  }
}

export default new CutstyleService();
