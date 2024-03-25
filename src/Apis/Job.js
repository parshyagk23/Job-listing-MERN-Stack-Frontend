import axios from "axios";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
const JobBackendURL = import.meta.env.VITE_REACT_APP_JOB_BACKEND_URL

export const CreatejobPost =  async (jobPostPayload)=>{
    try {
        const reqUrl = `${JobBackendURL}/create`
        const token = Cookies.get('token')
        
        axios.defaults.headers.common['Authorization']=token
        const responce= await axios.post(reqUrl, jobPostPayload)
        return responce.data
        
        
    } catch (error) {
      if(error.isTokenExpired){
            Cookies.remove('token')
            Cookies.remove('userName')
            Cookies.remove('userId')
            Navigate('/login')
      }
    }
}
export const getJobPost =  async (jobid)=>{
    try {
        const reqUrl = `${JobBackendURL}/job-details/${jobid}`
        const token = Cookies.get('token')
        
        axios.defaults.headers.common['Authorization']=token
        const responce= await axios.get(reqUrl)
        return responce.data
        
        
    } catch (error) {
        error
    }
}

export const updateJobPost = async(jobid, updatedFormData,userid) =>{

    try {
        const reqUrl = `${JobBackendURL}/update/${jobid}`
        const token = Cookies.get('token')
        axios.defaults.headers.common['Authorization']=token
        const responce = await axios.put(reqUrl,{
            ...updatedFormData,
            userid
        })
        return responce.data
    } catch (error) {
        error
        
    }
}

export const getAllJobPost = async ({title,skill})=>{
        try {
            
            let reqUrl = `${JobBackendURL}/all/?title=${title}&skills=${skill}`
            if(!title){
                reqUrl = `${JobBackendURL}/all/?skills=${skill}`
            }
            if(!skill){
                reqUrl = `${JobBackendURL}/all/?title=${title}`
            }
            const responce = await axios.get(reqUrl)
            return responce.data
        } catch (error) {
            error
        }
}