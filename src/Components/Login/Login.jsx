import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import { LoginUser } from "../../Apis/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import joblistimg from '../../assets/joblisting.png'
const Login = () => {

  const [UserDetails , setUserDetails] = useState({
     email:'' , password:''
  })
  const [error , setError] = useState("Something went Wrong")
  const [loading, setLoading] = useState(false)
  const navigate= useNavigate()
  const HandleFormChange =(e)=>{
    setUserDetails({...UserDetails,[e.target.name]:e.target.value})
  }
  const HandleSubmit = async ()=>{
    setLoading(true)
    if( !UserDetails.email && !UserDetails.password ){
      toast.error("Fields can't be empty",{position:"top-center"})
      setLoading(false)
      return
    }else if(!UserDetails.email){
      toast.error("Email field require",{position:"top-center"})
      setLoading(false)
      return
    }else if(!UserDetails.password){
      toast.error("Password field require",{position:"top-center"})
      setLoading(false)
      return
    }
    const responce = await LoginUser({...UserDetails},setError)
    
    if(!responce){
      toast.error(error,{position:"top-center"})
      setLoading(false)
      return
    }
    
    toast.success(responce.message,{position:"top-center"})
    setLoading(false)
    setTimeout(() => {
      navigate('/')
      window.location.reload()
    }, 2000);
  }
  console.log()
  return (
    <div className="flex flex-wrap">
      <div className="w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-2/4 ">
        <div className=" my-auto mx-20 lg:mx-8 md:mx-5 xs:mx-5">
          <h1 className="mt-24 text-black text-4xl font-semibold text-left xs:text-2xl">
            Already have an account?
          </h1>
          <p className="text-lg text-slate-600">
            Your personal job finder is here
          </p>
          <div className="mt-8 flex flex-col gap-3 ">
            <input
              className="w-full text-xl text-slate-600 h-16 p-3 border-2 outline-none rounded"
              name="email"
              type="email"
              placeholder="Email"  
              onChange={HandleFormChange}
            />

            <input
              className="w-full text-xl text-slate-600 h-16 p-3 border-2 outline-none rounded"
              name="password"
              type="password"
              placeholder="Password"
              required
              onChange={HandleFormChange}
            />

            <button
              className="w-64 bg-red-500 font-bold text-white text-3xl rounded p-4 xs:w-44 xs:text-2xl xs:p-2 cursor-pointer "
              onClick={HandleSubmit}
            >
              {loading ? <div style={{ margin:'0 auto'}} className="w-8 h-8 border-4 rounded-full border-gray-300 border-t-sky-700 animate-spin " ></div>:"Sign in"}
            </button>
          </div>
          <div className="my-3 ">
            <p className="font-medium text-xl text-slate-600">
              Don't have ac account?
              <Link
                to="/register"
                className="text-black underline cursor-pointer"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className=" w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-2/4">
        <h1 className="  mx-28 my-auto absolute mt-12 xl:text-4xl text-center text-white text-4xl font-medium  xs:text-center xs:text-3xl xs:mx-7  ">
          Your Personal Job Finder
        </h1>
        <img src={joblistimg} className="w-full h-full" alt="" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
