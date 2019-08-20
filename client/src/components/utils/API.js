import axios from "axios";
// import config from "../../config/keys";

const apiCall = {
    // Upload Image
    uploadImage: (id, body)=>{
      return axios.post(`/api/user/edit/${id}`, body)
    }, 

}
export default apiCall;