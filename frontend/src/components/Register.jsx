import React, { useState } from "react";
import axios from "axios";

const Register = (props) => {
  const [formData, setFormData] = useState({
    studentName: "",
    password: "",
    studentEmail: "",
    studentPhone: "",
    regNumber: "",
    studentAddress: "",
    studentDOB: "",
    studentBranch: "",
    studentGender: "",
    admissionYear: "",
    roomNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        admissionYear: formData.admissionYear.split("-")[0], // convert month to year
      };

      const res = await axios.post("http://localhost:8080/auth/signup-student", payload);
      console.log("✅ Student registered:", res.data);
      alert("Registration successful!");
      props.onClose();
    } catch (err) {
      console.error("❌ Registration failed:", err);
      alert("Signup failed. Check logs.");
    }
  };

  return (
    <div className="signup_component h-screen w-full fixed inset-0 z-10 bg-gray-800/40 flex justify-center items-center">
      <div className="signup_card bg-white shadow-xl rounded-lg p-8 w-200">
        <div
          className="close_button h-full w-full flex justify-end text-red-500 hover:text-red-700 font-bold text-2xl cursor-pointer"
          onClick={props.onClose}
        >
          X
        </div>
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
          Hostel Registration
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 grid grid-cols-2 gap-2 gap-x-10"
        >
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
          <input
            type="email"
            name="studentEmail"
            value={formData.studentEmail}
            onChange={handleChange}
            placeholder="Email"
            className="border text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="number"
            name="studentPhone"
            value={formData.studentPhone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="border text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="regNumber"
            value={formData.regNumber}
            onChange={handleChange}
            placeholder="Registration Number"
            className="border text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="studentAddress"
            value={formData.studentAddress}
            onChange={handleChange}
            placeholder="Address"
            className="border text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="date"
            name="studentDOB"
            value={formData.studentDOB}
            onChange={handleChange}
            className="border text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="studentBranch"
            value={formData.studentBranch}
            onChange={handleChange}
            placeholder="Branch"
            className="border text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <div className="select_gender flex justify-between items-center col-span-2">
            <label className="text-black font-medium">Gender:</label>
            <div className="flex gap-10">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="studentGender"
                  value="Male"
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                <span className="text-black">Male</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="studentGender"
                  value="Female"
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                <span className="text-black">Female</span>
              </label>
            </div>
          </div>

          <select
  name="admissionYear"
  value={formData.admissionYear}
  onChange={handleChange}
  className="border text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
  required
>
  <option value="" disabled>
    Select Admission Year
  </option>
  {Array.from({ length: new Date().getFullYear() - 2000 + 1 }, (_, i) => {
    const year = 2000 + i;
    return (
      <option key={year} value={year}>
        {year}
      </option>
    );
  })}
</select>


          <input
            type="text"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            placeholder="Room Number"
            className="border text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="col-span-2 bg-blue-600 text-white p-3 w-full rounded-md text-lg font-semibold hover:bg-blue-700 transition-all duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
