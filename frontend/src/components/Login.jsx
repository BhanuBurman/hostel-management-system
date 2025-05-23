
import { useState } from "react";
import api from "../AxiosConfig";
import { ButtonSpinner } from "./Spinner";

const Login = (props) => {
  const [isUserLoggingIn, setIsUserLoggingIn] = useState(false);

  const [formData, setFormData] = useState({
    regNumber: "",
    password: "",
    roleType: "Student",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    setIsUserLoggingIn(true);
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", formData);
      console.log(response);
      const token = response.data; 
      setIsUserLoggingIn(false);
      if (token) {
        localStorage.setItem("token", token); 

        console.log("Login successful! Token stored.");

        props.onClose?.();

        window.location.reload();
      } else {
        console.error("No token received!");
      }
    } catch (error) {
      setIsUserLoggingIn(false);
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      alert("Invalid credentials or something went wrong!");
    }
  };

  return (
    <div className="login absolute left-0 top-0 h-screen w-full flex justify-center items-center z-10">
      <div className="login_box bg-white w-100 flex flex-col justify-between items-center h-110 rounded-md">
        <div
          className="close_button h-10 w-full flex justify-end text-red-500 hover:text-red-700 font-bold text-2xl cursor-pointer px-2"
          onClick={props.onClose}
        >
          X
        </div>
        <h2 className="text-3xl font-semibold mb-7">Login to start</h2>
        <form
          onSubmit={handleLogin}
          className="w-80 h-100 flex justify-between items-center flex-col mb-20"
        >
          <input
            type="text"
            name="regNumber"
            value={formData.regNumber}
            onChange={handleChange}
            placeholder="Register Number"
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
          <select
            className="border text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="roleType"
            id="roleType"
            value={formData.roleType}
            onChange={handleChange}
          >
            <option value="Student">Student</option>
            <option value="Warden">Warden</option>
          </select>
          <button
            type="submit"
            className="col-span-2 bg-blue-600 text-white p-3 w-full rounded-md text-lg font-semibold hover:bg-blue-700 transition-all duration-300 cursor-pointer"
            disabled={isUserLoggingIn}
          >
            {isUserLoggingIn ? (
              <ButtonSpinner text={"Logging..."}/>
            ) : (
              <span>Log In</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
