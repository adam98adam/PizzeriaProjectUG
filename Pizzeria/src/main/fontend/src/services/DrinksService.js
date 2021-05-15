import axios from "axios";
const User_Api_Base_Url = "http://localhost:8080/api/drinks";
class DrinksService {
  getAllDrinks() {
    return axios.get(User_Api_Base_Url);
  }
  addNewDrink(drink) {
    return axios.post(User_Api_Base_Url, drink);
  }
  updateDrink(drink, id) {
    return axios.put(User_Api_Base_Url + `/${id}`, drink);
  }
  deleteDrinkById(id) {
    return axios.delete(User_Api_Base_Url + `/${id}`);
  }
}

export default new DrinksService();
