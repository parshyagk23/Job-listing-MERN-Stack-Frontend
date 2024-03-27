import axios from "axios";
import Cookies from "js-cookie";
const AuthBackendURL = import.meta.env.VITE_REACT_APP_AUTH_BACKEND_URL

export const RegisterUser =async ({name , email, mobile, password,usertype},setError) =>{

    try {
        const reqUrl = `${AuthBackendURL}/register`
        const responce= await axios.post(reqUrl, {name,email,mobile,password,usertype})
        return responce.data
        
    } catch (error) {
        setError(error.message)     
    }
}

export const LoginUser = async ({email,password},setError) =>{
    try {
        const reqUrl = `${AuthBackendURL}/login`
        const responce = await axios.post(reqUrl,{email,password})
        Cookies.set("token",responce.data.token)
        Cookies.set("userName",responce.data.name)
        Cookies.set("userId",responce.data.userId)
        Cookies.set("usertype",responce.data.usertype)
       
       
        return responce.data
        
    } catch (error) {
        setError(error.message)
    }
}