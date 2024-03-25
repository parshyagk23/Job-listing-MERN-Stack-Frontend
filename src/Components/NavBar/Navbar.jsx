
import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
const Navbar = () => {
  const token = Cookies.get('token')
  const [isLoggedIn] = useState(!!token)
  const navigate = useNavigate()
  const handleLogout = () =>{
    Cookies.remove('token')
    Cookies.remove('userName')
    Cookies.remove('userId')
    navigate('/login')
  }

  return (
    
        <nav className=" w-full flex justify-between bg-red-400 px-8 pt-7 h-24 rounded-b-3xl fixed top-0 xs:px-1 xs:h-20 ">
        <div>
          <h1 className="font-bold text-3xl text-center text-white xs:text-2xl ">
            Jobfinder
          </h1>
        </div>
        {!isLoggedIn?<div className="">
          <Link to='/login' className="border-white rounded-lg border-2 px-2 mr-3 text-white font-medium text-2xl text-center cursor-pointer xs:text-xl ">
            Login
          </Link>
          <Link to='/register' className=" border-white rounded-lg  text-red-500 border-2  bg-white px-2  font-medium text-2xl text-center cursor-pointer xs:text-xl ">
            Register
          </Link>
        </div>:<div className="flex gap-3 items-start xs:gap-1 ">
          <div  className="  rounded-lg  mr-3 text-white font-medium text-2xl text-center cursor-pointer xs:text-base xs:mr-0">
          {Cookies.get('userName')}
          </div>
          <button onClick={handleLogout} className=" border-white rounded-lg  text-red-500 border-2  bg-white px-2  font-medium text-2xl text-center cursor-pointer xs:text-xl ">
            logout
          </button>
        </div>}
      </nav>
    
  )
}

export default Navbar