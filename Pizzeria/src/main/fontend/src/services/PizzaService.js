import axios from "axios";
const User_Api_Base_Url = "http://localhost:8080/api/pizza";

class PizzaService {
  getAllPizza() {
    return axios.get(User_Api_Base_Url);
  }
  getPizzaById(id) {
    return axios.get(User_Api_Base_Url + `/${id}`);
  }
  addPizza(pizza) {
    return axios.post(User_Api_Base_Url, pizza);
  }
  updatePizza(pizza, id) {
    return axios.put(User_Api_Base_Url + `/${id}`, pizza);
  }
  deletePizzaById(id) {
    return axios.delete(User_Api_Base_Url + `/${id}`);
  }
}

export default new PizzaService();
