import axios from 'axios';
const User_Api_Base_Url = "http://localhost:8080/api";

class LoginService {
    
    getAccount(login,password) {
        return axios.get(User_Api_Base_Url + "/login/" + login + "/" + password);
    }
}

export default new LoginService()