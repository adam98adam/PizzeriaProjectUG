import axios from 'axios';
const User_Api_Base_Url = "http://localhost:8080/api/users/address"
class AddressService {

    createAddress(address) {
        return axios.post(User_Api_Base_Url,address)
    }

    getAddressById(id) {
        return axios.get(User_Api_Base_Url + "/idAddress/" + id)
    }

    getAddressByUserId(id) {
        return axios.get(User_Api_Base_Url + "/" + id)

    }

    updateAddress(address,id) {
        return axios.put(User_Api_Base_Url + "/" + id,address)
    }
}

export default new  AddressService()