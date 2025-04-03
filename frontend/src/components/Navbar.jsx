import React, { useState } from "react";
import Logo from "../assets/react.svg";
import { NavLink } from "react-router-dom";
import Register from "./Register";

const Navbar = () => {
  const [isRegisterClicked, setIsRegisterClicked] = useState(false);
  return (
    <div className="nav__bar container flex  justify-between p-5 ">
      {isRegisterClicked && (
        <Register onClose={() => setIsRegisterClicked(false)} />
      )}
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
        <NavLink className="mx-5" to={"/"}>About</NavLink>
        <NavLink className="mx-5" to={"/"}>
          Contact us
        </NavLink>
      </ul>
      <div className="buttons">
        <button className="login px-3 mx-1">Login</button>
        <button
          className="register bg-blue-600 p-1 px-5 rounded-md text-white hover:bg-blue-800 cursor-pointer"
          onClick={()=>setIsRegisterClicked(true)}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Navbar;
