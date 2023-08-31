import axios from "axios";


const url='http://localhost:7777/api/v1/contact';
const token=sessionStorage.getItem('token');

 class ContactService {
    getAllContacts(){
        return axios.get(url+'/filter-list', {
            headers: {
                'Authorization': 'Bearer '+token, 
                
              }});
    }

   addContact(data){
    return axios.post(url, data,{
      headers: {
          'Authorization': 'Bearer '+token, 
          'Content-Type': 'application/json',
        }});
   } 

   searchContact(text){
    return axios.get(url+'/filter-list',{
      params: {
        searchParam: text, 
        page: 0, 
        size: 10, 
      },
      headers: {
        'Authorization': 'Bearer '+token, 
        
      }
    })
   }

   importContact(data){
    return axios.post(url+'import', data,{
      headers: {
          'Authorization': 'Bearer '+token, 
          'Content-Type': 'application/json',
        }});
   }
    
}
export default new ContactService();