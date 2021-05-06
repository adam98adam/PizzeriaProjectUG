import axios from 'axios';
const User_Api_Base_Url = "http://localhost:8080/api/users"
class UserService{


 
    getUsers(){
        return axios.get(User_Api_Base_Url);
    }

    createUser(user){
        return axios.post(User_Api_Base_Url,user);
    }

    getUserById(id) {
        return axios.get(User_Api_Base_Url + "/" + id)
    }

    updateUser(user,id) {
        return axios.put(User_Api_Base_Url + "/" + id,user);
    }

    deleteUser(id) {
        return axios.delete(User_Api_Base_Url + "/" + id);
    }


}

export default new  UserService()