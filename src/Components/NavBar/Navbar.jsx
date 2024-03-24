
import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Navbar = () => {
  const [isLoggedIn] = useState(!!localStorage.getItem('token'))
  const navigate = useNavigate()
  const handleLogout = () =>{
    localStorage.clear()
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
        </div>:<div className="flex gap-3 items-start ">
          <div  className="  rounded-lg  px-2 mr-3 text-white font-medium text-2xl text-center cursor-pointer xs:text-xl ">
          {localStorage.getItem('userName')}
          </div>
          <button onClick={handleLogout} className=" border-white rounded-lg  text-red-500 border-2  bg-white px-2  font-medium text-2xl text-center cursor-pointer xs:text-xl ">
            logout
          </button>
        </div>}
      </nav>
    
  )
}

export default Navbar