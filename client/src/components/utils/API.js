import axios from "axios";
import config from "../../config/keys";

const apiCall = {
    // Upload Image
    uploadImage: (id, body)=>{
      return axios.post(`${config.siteUrl}/api/user/edit/${id}`, body)
    }, 
    // Search Vehicle By city
    SearchVehicle: (city)=>{
      return axios.get(`/api/city/${city}`)
    }
    

}

export default apiCall;