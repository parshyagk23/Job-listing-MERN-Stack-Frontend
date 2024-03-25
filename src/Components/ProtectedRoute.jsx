import React,{useState} from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
const ProtectedRoute = ({Component}) => {
    const [token] = useState(Cookies.get('token'));
    const [isLoggedIn] = useState(!!token)
  return (
    <div>
      {isLoggedIn?<Component/>:<Navigate to='/login' />}
    </div>
  )
}

export default ProtectedRoute
