import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import joblistimg from '../../assets/joblisting.png'
const Register = () => {
  const [UserDetails , setUserDetails] = useState({
    name:'', email:'', mobile:'' , password:''
  })

  const HandleChange =(e)=>{
      setUserDetails({...UserDetails,[e.target.name]:e.target.value})
  }

  const HandleSubmit =()=>{
    if(!UserDetails.name || !UserDetails.email || !UserDetails.mobile || !UserDetails.password ){
      alert("Fields can't be empty")
    }
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
              name="number"
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

            <button
              className="w-72 bg-red-500 font-bold text-white text-3xl rounded p-4 xs:w-44 xs:text-2xl xs:p-2 cursor-pointer "
              onClick={HandleSubmit}
            >
              Create Account
            </button>
          </div>
          <div className="my-3 ">
            <p className="font-medium text-xl text-slate-600">
              Already have an account?
              <Link
                to="/login"
                className="text-black underline cursor-pointer "
              >
                Sign In
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
    </div>
  );
};

export default Register;
