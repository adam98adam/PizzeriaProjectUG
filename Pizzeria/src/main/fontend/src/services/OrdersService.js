import axios from "axios";
const User_Api_Base_Url = "http://localhost:8080/api/user";
class OrdersService {
  getOrdersByUserId(id) {
    return axios.get(User_Api_Base_Url + "/" + id + "/orders");
  }
  postOrdersByUserId(id, order) {
    return axios.post(User_Api_Base_Url + "/" + id + "/orders", order);
  }
  getAllOrders() {
    return axios.get(User_Api_Base_Url + "/orders");
  }
}

export default new OrdersService();
