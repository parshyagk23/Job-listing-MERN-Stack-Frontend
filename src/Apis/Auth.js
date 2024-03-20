import axios from "axios";
const AuthBackendURL = import.meta.env.VITE_REACT_APP_AUTH_BACKEND_URL

export const RegisterUser =async ({name , email, mobile, password}) =>{

    try {
        const reqUrl = `${AuthBackendURL}/register`
        const responce= await axios.post(reqUrl, {name,email,mobile,password})
        return responce.data
        
    } catch (error) {
        console.log(error)
        
    }
}

export const LoginUser = async ({email,password}) =>{
    try {
        const reqUrl = `${AuthBackendURL}/login`
        const responce = await axios.post(reqUrl,{email,password})
        return responce.data
        
    } catch (error) {
        console.log(error)
    }
}