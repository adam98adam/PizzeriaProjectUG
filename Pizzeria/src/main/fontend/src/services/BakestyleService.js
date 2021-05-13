import axios from 'axios';
const User_Api_Base_Url = "http://localhost:8080/api/bakestyle"
class BakestyleService {

    getAllBakestyle() {
        return axios.get(User_Api_Base_Url)
    }    

    
}

export default new  BakestyleService()