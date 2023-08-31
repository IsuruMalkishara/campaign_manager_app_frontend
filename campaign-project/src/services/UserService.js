import axios from "axios";


const url='http://localhost:7777';

 class UserService {
    signin(data){
        return axios.post(url+'/authenticate',data);
    }


    sendEmailOtp(data){
        return axios.post(url+'/user/auth/send-email-otp',data);
    }

      
    verifyEmail(data){
        return axios.post(url+'/user/auth/verify-email',data);
    }

    sendPhoneOtp(data){
        return axios.post(url+'/user/auth/send-phone-otp',data);
    }

    verifyPhone(data){
        return axios.post(url+'/user/auth/verify-phone',data);
    }
    
    signup(data){
        return axios.post(url+'/user/auth/sign-up',data);
    }
        
    }
export default new UserService()