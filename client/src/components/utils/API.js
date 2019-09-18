import axios from "axios";
import config from "../../config/keys";

const apiCall = {
    // Upload Image
    uploadImage: (id, body)=>{
      return axios.post(`${config.siteUrl}/api/user/edit/${id}`, body)
    }, 
    // Search Vehicle By city
    SearchVehicle: (form)=>{
      return axios.get(`/api/city/${form}`)
    },
    // Search Vehicle By Type
    SearchVehicleByType: (form)=>{
      return axios.get(`/api/city/${form.city}/${form.vehicle}`)
    },

    getUser: (id)=>{
      return axios.get(`/api/user/${id}`)
    }


    

}

export default apiCall;