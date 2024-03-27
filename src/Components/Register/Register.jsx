import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import joblistimg from '../../assets/joblisting.png'
import { RegisterUser } from "../../Apis/Auth";

const Register = () => {
  
  const [UserDetails , setUserDetails] = useState({
    name:'', email:'', mobile:'' , password:'',usertype:''
  })
  const [error , setError] = useState("Something went Wrong")
  const [loading ,setLoading] = useState(false)
  const navigate = useNavigate()
  const HandleChange =(e)=>{
      setUserDetails({...UserDetails,[e.target.name]:e.target.value})
  }

  const HandleSubmit = async ()=>{
    setLoading(true)
    if(!UserDetails.name || !UserDetails.email || !UserDetails.mobile || !UserDetails.password || !UserDetails.usertype ){
      toast.error("Fields can't be empty",{position:"top-center"})
      setLoading(false)
      return
    }
    const responce = await RegisterUser({...UserDetails},setError)
    if(!responce){
      toast.error(error,{position:"top-center"})
      setLoading(false)
      return
    }
    toast.success(responce.message,{position:"top-center"})
    setLoading(false)
    setTimeout(() => {
      navigate('/login')
    }, 2000);
   
  }
 
  return (
    <div className="flex flex-wrap">
      <div className="w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-2/4 ">
        <div className=" my-auto mx-20 xs:mx-2 md:mx-8 lg:mx-8">
          <h1 className="mt-24 text-black text-4xl font-semibold text-left xs:text-3xl">
            Create an account
          </h1>
          <p className="text-lg text-slate-600">
            Your personal job finder is here
          </p>
          <div className="mt-8 flex flex-col gap-3 ">
            <input
              className="w-full text-xl text-slate-600 h-16 p-3 border-2 outline-none rounded  "
              type="text"
              name="name"
              placeholder="Name"
              
              onChange={HandleChange}
            />

            <input
              className="w-full text-xl text-slate-600 h-16 p-3 border-2 outline-none rounded"
              type="email"
              name="email"
              placeholder="Email"
              onChange={HandleChange}
            />
            <input
              className="w-full text-xl text-slate-600 h-16 p-3 border-2 outline-none rounded"
              type="number"
              name="mobile"
              placeholder="Number"
              onChange={HandleChange}
            />
            <input
              className="w-full text-xl text-slate-600 h-16 p-3 border-2 outline-none rounded"
              type="password"
              name="password"
              placeholder="Password"
              onChange={HandleChange}
            />
             <div className="flex flex-row justify-between gap-10 xs:justify-between md:justify-between lg:justify-between ">
              <label htmlFor="" className="xl:w-3/12 text-2xl font-medium xs:text-xl xss:w-3/12 ">
               User-type
              </label>
              <select
                name="usertype"
                id=""
                className="w-40 rounded border-2 text-slate-600 h-10 text-lg text-center font-medium  "
                value={UserDetails.usertype}
                onChange={HandleChange}
              >
                <option
                  className="text-slate-600 h-8 p-2 text-base text-center font-medium"
                  value=""
                >
                  select
                </option>
                <option
                  className="text-slate-600 h-8 p-2 text-base text-center font-medium"
                  value="JobSeeker"
                >
                 JobSeeker
                </option>
                <option
                  className="text-slate-600 h-8 p-2 text-base text-center font-medium"
                  value="Recruiter"
                >
                  Recruiter
                </option>
              </select>
            </div>

            <button
              className="w-72 bg-red-500 font-bold text-white text-3xl rounded p-4 xs:w-48 xs:text-2xl xs:p-2 cursor-pointer "
              onClick={HandleSubmit}
            >
              {loading ? <div style={{ margin:'0 auto'}} className="w-8 h-8 border-4 rounded-full border-gray-300 border-t-sky-700 animate-spin " ></div>:"Create Account"}
            </button>
          </div>
          <div className="my-3 ">
            <p className="font-medium text-xl text-slate-600">
              Already have an account?
              <Link
                to="/login"
                className="text-black underline cursor-pointer "
              >
                Sign in
                
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className=" w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-2/4">
        <h1 className="mx-28 my-auto absolute mt-12 xl:text-4xl text-center text-white text-4xl font-medium  xs:text-center xs:text-3xl xs:mx-7 ">
          Your Personal Job Finder
        </h1>
        <img src={joblistimg} className="w-full h-full" alt="" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
