import React,{ useEffect, useState } from 'react'
import Navbar from '../NavBar/Navbar'
import { useParams, useNavigate } from 'react-router-dom';
import { getJobPostbyrefUserId } from '../../Apis/Job';
import JobView from '../JobView/JobView';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PostedJobs = () => {
    const {refuserid}= useParams()
    const [PostedJobs, setPostedJobs] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    useEffect(() => {
        fetchPostedjobs();
      }, []);
      const fetchPostedjobs = async () => {
        try {
          setLoading(false);
          if (!refuserid) return;
          const responce = await getJobPostbyrefUserId(refuserid);
          
          if(!responce){
            
            setTimeout(() => {
              navigate('/login')
            }, 2000);
            return
          }
          setLoading(true);
          setPostedJobs(responce?.data);
          
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <div>
    <Navbar />
    <div className="mt-32  ">
      <h1
        style={{ margin: "0 auto" }}
        className="bg-red-200 p-4 rounded-lg border-2 border-black text-gray-800  w-96 font-bold text-4xl text-center xs:text-2xl xs:w-60"
      >
        Jobs posted by you
      </h1>
    </div>
    {loading ? (
      PostedJobs?.map((PostedJob, index) => (
        <div key={index}>
          <JobView job={PostedJob} link="http://localhost:5173/job-details/" />
        </div>
      ))
    ) : (
      <div
        style={{ margin: "0 auto", marginTop: "125px" }}
        className="w-12 h-12 border-8 rounded-full border-gray-300 border-t-sky-700 animate-spin "
      >
        {" "}
      </div>
    )}
    <ToastContainer/>
  </div>
    
  )
}

export default PostedJobs