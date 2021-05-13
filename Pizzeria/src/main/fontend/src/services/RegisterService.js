import axios from 'axios';
const User_Api_Base_Url = "http://localhost:8080/api";

class RegisterService {

    createAccount(account) {
        return axios.post(User_Api_Base_Url + "/register/account",account)
    }

    createUser(user) {
        return axios.post(User_Api_Base_Url + "/register/user",user)
    }


}


export default new RegisterService()