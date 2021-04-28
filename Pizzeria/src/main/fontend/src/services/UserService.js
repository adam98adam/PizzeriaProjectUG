import axios from 'axios';
const User_Api_Base_Url = "http://localhost:8080/api/users"
class UserService{
    
    getUsers(){
        return axios.get(User_Api_Base_Url);
    }

    createUser(user){
        return axios.post(User_Api_Base_Url,user);
    }

    getUserById(userId) {
        return axios.get(User_Api_Base_Url + "/" + userId)
    }

    updateUser(user,userId) {
        return axios.put(User_Api_Base_Url + "/" + userId,user);
    }

    deleteUser(userId) {
        return axios.delete(User_Api_Base_Url + "/" + userId);
    }


}

export default new  UserService()