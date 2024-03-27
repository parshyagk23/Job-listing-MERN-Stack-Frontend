import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Navbar = () => {
  const token = Cookies.get("token");
  const userId  = Cookies.get("userId"); 
  const usertype=Cookies.get('usertype')
  const [isLoggedIn] = useState(!!token);
  const navigate = useNavigate();
  const [isuserLogoClicked,setisuserLogoClicked] = useState(false)
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userName");
    Cookies.remove("userId");
    Cookies.remove("usertype")
    toast.success("logout Successfully", { position: "top-center" });
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <nav className=" w-full flex justify-between  items-start bg-red-400 px-8 pt-5 h-24 rounded-b-3xl fixed top-0 xs:px-1 xs:h-20 ">
      <div>
        <ToastContainer />
        <h1 className="font-bold text-3xl text-center text-white xs:text-2xl ">
         <Link to='/' > Jobfinder</Link>
        </h1>
      </div>
      {
        !isLoggedIn ? (
          <div className="">
            <Link
              to="/login"
              className="border-white rounded-lg border-2 px-2 mr-3 text-white font-medium text-2xl text-center cursor-pointer xs:text-xl "
            >
              Login
            </Link>
            <Link
              to="/register"
              className=" border-white rounded-lg  text-red-500 border-2  bg-white px-2  font-medium text-2xl text-center cursor-pointer xs:text-xl "
            >
              Register
            </Link>
          </div>
        ) : (
          <div>
            <div className="flex justify-end mr-2 cursor-pointer " title={Cookies.get('userName')} onClick={()=>{setisuserLogoClicked((prev)=>!prev)}} >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="65"
                viewBox="0 -960 960 960"
                width="65"
                fill="#fff"
              >
                <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
              </svg>
              </div>
              {isuserLogoClicked?(
                    <div className=" w-64  bg-red-300 rounded mr-3 xs:w-44   " >
                      <ul className="pt-1 mt-3 pb-1" >
                        <li className=" rounded-lg mr-3 mb-2 text-gray-800 font-medium text-2xl text-center cursor-pointer xs:text-lg xs:mr-0" >
                        <Link to='/' >{Cookies.get('userName')}</Link></li>
                        <li  className="w-full h-0.5 bg-white " ></li>
                        {usertype==="Recruiter" && <><li className="  border-white mb-2 bottom-2 mr-3 text-gray-800 font-medium text-2xl text-center cursor-pointer xs:text-xl xs:mr-0" > <Link to='/job-post' >Post job</Link> </li>
                        <li  className="w-full h-0.5 bg-white " ></li></>}
                        {usertype!=="Recruiter" && <><li className="  border-white mb-2 bottom-2 mr-3 text-gray-800 font-medium text-2xl text-center cursor-pointer xs:text-xl xs:mr-0" > <Link to= {`/applied-job/${userId}`} >Applied jobs</Link> </li>
                        <li  className="w-full h-0.5 bg-white " ></li></> }
                        {usertype==="Recruiter" && <><li className="  border-white mb-2 bottom-2 mr-3 text-gray-800 font-medium text-2xl text-center cursor-pointer xs:text-xl xs:mr-0" > <Link to= {`/postedjobs/${userId}`} >view posted jobs</Link> </li>
                        <li  className="w-full h-0.5 bg-white " ></li></>}
                        <li className=" rounded-lg  mr-3  text-gray-800 font-medium text-2xl text-center cursor-pointer xs:text-xl xs:mr-0" onClick={handleLogout} >Logout</li>
                      </ul>
                    </div>
              ):(<></>)}
            
          </div>
        )
        
      }
    </nav>
  );
};

export default Navbar;
