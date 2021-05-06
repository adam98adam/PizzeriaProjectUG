import axios from 'axios';
import UserPanelComponent from '../components/UserPanelComponent';
const User_Api_Base_Url = "http://localhost:8080/api/accounts"
class AccountService {


    getAccount(login,password) {
        return axios.get(User_Api_Base_Url + "/" + login + "/" + password);
    }

    createAccount(account) {
        return axios.post(User_Api_Base_Url,account);
    }

    getAccountById(id) {
        return axios.get(User_Api_Base_Url + "/" + id);
    }

    updateAccount(account,id) {
        return axios.put(User_Api_Base_Url + "/" + id,account);
    }



}

export default new AccountService()