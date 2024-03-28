import React, { useEffect, useState } from "react";
import Navbar from "../NavBar/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { getAppliedJob } from "../../Apis/AppliedJob";
import JobView from "../JobView/JobView";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppliedJob = () => {
  const { userId } = useParams();
  const [AppliedJob, setAppliedJob] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
    fetchAllAppliedJob();
  }, []);
  const fetchAllAppliedJob = async () => {
    try {
      setLoading(false);
      if (!userId) return;
      const responce = await getAppliedJob(userId);
      if(!responce){
        setTimeout(() => {
          navigate('/login')
        }, 2000);
        return
      }
      setLoading(true);
      setAppliedJob(responce?.data);
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong" ,{position:'top-center'})
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mt-32">
        <h1
          style={{ margin: "0 auto" }}
          className="bg-red-200 p-3 rounded-lg border-2 border-black text-gray-800  w-96 font-bold text-4xl text-center xs:text-2xl xs:w-72"
        >
          Jobs Applied by You
        </h1>
      </div>
      {loading ? (
        AppliedJob?.map((Job, index) => (
          <div key={index}>
            <JobView job={Job?.jobDetails} link="https://joblisting-six.vercel.app/job-details/" />
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
    </div>
  );
};
export default AppliedJob;
