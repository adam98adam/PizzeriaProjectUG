import axios from "axios";
const User_Api_Base_Url = "http://localhost:8080/api/pizzasize";
class PizzasizeService {
  getAllPizzasize() {
    return axios.get(User_Api_Base_Url);
  }
  addNewPizzasize(pizzasize) {
    return axios.post(User_Api_Base_Url, pizzasize);
  }
  updatePizzasize(pizzasize, id) {
    return axios.put(User_Api_Base_Url + `/${id}`, pizzasize);
  }
  deletePizzasizeById(id) {
    return axios.delete(User_Api_Base_Url + `/${id}`);
  }
}

export default new PizzasizeService();
