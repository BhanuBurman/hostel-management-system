import axios from 'axios';
import React, { useEffect } from 'react'

const Login = () => {
    useEffect(()=>{
        fetchLogin();
    },[])

    const fetchLogin = ()=>{
        axios.post("http://localhost:8080",{userName: bhanu})
        .then.
    }
  return (
    <div>
      
    </div>
  )
}

export default Login
