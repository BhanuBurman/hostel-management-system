import axios from 'axios';
import React, { useEffect } from 'react'

const Login = () => {
    useEffect(()=>{
        fetchLogin();
    },[])

    const fetchLogin = ()=>{
        // axios.post("http://localhost:8080",{userName: bhanu})
        // .then.
    }
  return (
    <div>
      <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            placeholder="Full Name"
            className="border text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="border text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
    </div>
  )
}

export default Login
