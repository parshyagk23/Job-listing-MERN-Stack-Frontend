import axios from "axios";
import Cookies from "js-cookie";

const AppliedJobUrl = import.meta.env.VITE_REACT_APP_APPIEDJOB_BACKEND_URL

export const CreateAppliedJob =async (jobId,jobDetails)=>{
    try {
        const token = Cookies.get('token')
        axios.defaults.headers.common['Authorization']=token
        const reqUrl = `${AppliedJobUrl}/createjobapplied`
        const responce = await axios.post(reqUrl,{jobId,jobDetails})
        return await responce.data
        
    } catch (error) {
        
    }
}
export const getAppliedJob =async (userId)=>{
    try {
        
        const token = Cookies.get('token')
        axios.defaults.headers.common['Authorization']=token
        const reqUrl = `${AppliedJobUrl}/getjobapplied/${userId}`
        const responce = await axios.get(reqUrl)
        return await responce.data
        
    } catch (error) {
        
    }
}