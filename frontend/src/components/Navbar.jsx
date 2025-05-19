import React, { useState, useEffect } from "react";
import Logo from "../assets/react.svg";
import { NavLink } from "react-router-dom";
import Register from "../pages/RegisterPage";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import NavLogo from "../../public/hostel tab logo.png";

import { FaUserCircle } from "react-icons/fa";
import api from "../AxiosConfig";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();
  const { setUser } = useUser();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true if token exists
    if (token) {
      fetchUserDetails(token);
    }
  }, []);

  const fetchUserDetails = (token) => {
    api.post("/auth/user-details", token).then((response) => {
      setUserInfo(response.data);
      setUser(response.data);
    });
  };

  const handleScroll = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setShowDropdown(false);
    window.location.href = "/";
  };

  return (
    <div className="nav__bar container flex  justify-between p-5 ">
      {isLoginClicked && <Login onClose={() => setIsLoginClicked(false)} />}
      <div className="w-20 h-8  overflow-hidden">
        <img
          src={NavLogo}
          alt="logo"
          className="relative -top-10 w-28 h-30 object-contain"
        />
      </div>
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
      {isLoggedIn ? (
        <div className="relative">
          <FaUserCircle
            className="text-3xl cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          />
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-10">
              <div className="w-full text-left px-4 py-2 border-b-gray-300 border-b-2">
                Hi👋, {userInfo?.name.split(" ")[0] || "User"}
              </div>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() =>
                  navigate("/user-profile", { state: { userInfo } })
                }
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
            onClick={() => (window.location.href = "/register")}
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
