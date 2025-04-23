import React, { useState , useEffect} from "react";
import Logo from "../assets/react.svg";
import { NavLink } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import { useNavigate } from "react-router-dom";


import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isRegisterClicked, setIsRegisterClicked] = useState(false);
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true if token exists
  }, []);

  const handleScroll = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate("/"); 
  };

  return (
    <div className="nav__bar container flex  justify-between p-5 ">
      {isRegisterClicked && (
        <Register onClose={() => setIsRegisterClicked(false)} />
      )}
      {isLoginClicked && <Login onClose={() => setIsLoginClicked(false)} />}
      <img src={Logo} alt="logo" />
      <ul className="flex">
        <NavLink className="mx-5" to={"/"}>
          Home
        </NavLink>
        <NavLink className="mx-5" to={"/rooms"}>
          Book Room
        </NavLink>
        <NavLink className="mx-5" to={"/complain-page"}>
          Complain
        </NavLink>
        <NavLink className="mx-5" to={"/food-menu"}>
          Food Menu
        </NavLink>
        <li
          className="mx-5 cursor-pointer"
          onClick={() => handleScroll("about")}
        >
          About us
        </li>
        <li
          className="mx-5 cursor-pointer"
          onClick={() => handleScroll("contact")}
        >
          Contact us
        </li>
      </ul>
      { isLoggedIn? (
        <div className="relative">
        <FaUserCircle
          className="text-3xl cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        />
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-10">
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => alert("Go to profile")}
            >
              Profile
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
      ) : (

        <div className="buttons">
          <button
            className="login px-3 mx-1"
            onClick={() => setIsLoginClicked(true)}
            >
            Login
          </button>
          <button
            className="register bg-blue-600 p-1 px-5 rounded-md text-white hover:bg-blue-800 cursor-pointer"
            onClick={() => setIsRegisterClicked(true)}
            >
            Register
          </button>
        </div>
          )
      }
    </div>
  );
};

export default Navbar;
