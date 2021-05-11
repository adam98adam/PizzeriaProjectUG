import axios from 'axios';
const User_Api_Base_Url = "http://localhost:8080/api";

class PizzaService {
    
    getAllPizza() {
        return axios.get(User_Api_Base_Url + "/pizza");
    }
}

export default new PizzaService()