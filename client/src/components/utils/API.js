import axios from "axios";
import keys from "../../config/keys";

const apiCall = {
    // Upload Image
    uploadImage: (id, body)=>{
      return axios.post(`/api/user/${id}`, body)
    }, 

}
export default apiCall;