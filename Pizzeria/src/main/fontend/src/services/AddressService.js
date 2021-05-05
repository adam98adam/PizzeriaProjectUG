import axios from 'axios';
const User_Api_Base_Url = "http://localhost:8080/api/users/address"
class AddressService {

    createAddress(address) {
        return axios.post(User_Api_Base_Url,address)
    }
}

export default new  AddressService()