import axios from "axios";
const JobBackendURL = import.meta.env.VITE_REACT_APP_JOB_BACKEND_URL


export const CreatejobPost =  async (jobPostPayload)=>{
    try {
        const reqUrl = `${JobBackendURL}/create`
        const token =  localStorage.getItem("Token")
        
        axios.defaults.headers.common['Authorization']=token
        const responce= await axios.post(reqUrl, jobPostPayload)
        return responce.data
        
        
    } catch (error) {
        console.log(error)
    }
}