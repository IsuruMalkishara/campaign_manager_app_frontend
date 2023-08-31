import axios from "axios";


const url='http://localhost:7777/api/v1/contact';
const token=sessionStorage.getItem('token');

 class TagService {
    getAllTags(){
        console.warn("token "+token);
        return axios.get(url+'/tags', {
            headers: {
                'Authorization': 'Bearer '+token, 
                
              }});
    }

    
    
}
export default new TagService();