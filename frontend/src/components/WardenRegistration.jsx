import { useState } from "react";
import api from "../AxiosConfig";
import { ButtonSpinner } from "./Spinner";

const WardenRegistration = () => {
  const [isUserRegistering, setIsUserRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    phone: "",
    regNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUserRegistering(true);

    try {

      const res = await api.post("/auth/signup-admin", formData);
      setIsUserRegistering(false);
      console.log("Student registered:", res.data);
      alert("Registration successful!");
       window.location.href = "/";
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Signup failed. Check logs.");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 grid grid-cols-2 gap-2 gap-x-10"
    >
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
        className="border text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className="border text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="border text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        required
      />
      <input
        type="number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        className="border text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        required
      />
      <input
        type="text"
        name="regNumber"
        value={formData.regNumber}
        onChange={handleChange}
        placeholder="Registration Number"
        className="border text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        required
      />
      <div className="col-span-2 flex justify-end items-center w-full">
        <button
          type="submit"
          className="w-50   bg-blue-600 text-white p-2 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300"
        >
          {isUserRegistering ? (
            <ButtonSpinner text={"Registering..."} />
          ) : (
            "Register"
          )}
        </button>
      </div>
    </form>
  );
};

export default WardenRegistration;
