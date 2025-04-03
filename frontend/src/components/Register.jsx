import React from "react";

const Register = (props) => {
  return (
    <div className="signup_component h-screen w-full fixed inset-0 z-10 bg-gray-800/40 flex justify-center items-center">
      <div className="signup_card bg-white shadow-xl rounded-lg p-8 w-200">
        <div
          className="close_button  h-full w-full flex justify-end text-red-500 hover:text-red-700 font-bold text-2xl cursor-pointer"
          onClick={props.onClose}
        >
          X
        </div>
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
          Hostel Registration
        </h2>
        <form
          action=""
          method="post"
          className="space-y-4 grid grid-cols-2 gap-2 gap-x-10"
        >
          <input
            type="text"
            placeholder="Full Name"
            className="border text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="number"
            placeholder="Phone Number"
            className="border text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Registration Number"
            className="border text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="date"
            placeholder="Date"
            className="border text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="branch"
            className="border text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <div className="select_gender flex justify-between items-center">
            <label className="text-black">Gender:</label>
            <div className="flex">
              <label className="flex mx-7">
                <input
                  type="radio"
                  placeholder="Address"
                  name="gender"
                  value="male"
                  className="border mx-2 text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none "
                  required
                />

                <span className="text-black">Male</span>
              </label>
              <label htmlFor="" className="flex">
                <input
                  type="radio"
                  placeholder="Address"
                  name="gender"
                  value="female"
                  className="border mx-2 text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none "
                  required
                />

                <span className="text-black">Female</span>
              </label>
            </div>
          </div>
          <input
            type="month"
            placeholder="Year"
            className="border text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 w-full rounded-md text-lg font-semibold hover:bg-blue-700 transition-all duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
