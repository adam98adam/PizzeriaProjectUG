import axios from "axios";
const User_Api_Base_Url = "http://localhost:8080/api/cutstyle";
class CutstyleService {
  getAllCutstyle() {
    return axios.get(User_Api_Base_Url);
  }
}

export default new CutstyleService();
