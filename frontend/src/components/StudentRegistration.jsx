import { useState } from "react";

const StudentRegistration = () => {
  const [isUserRegistering, setIsUserRegistering] = useState(false);
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUserRegistering(true);

    try {
      const payload = {
        ...formData,
        admissionYear: formData.admissionYear.split("-")[0],
      };

      const res = await api.post("/auth/signup-student", payload);
      setIsUserRegistering(false);
      console.log("Student registered:", res.data);
      alert("Registration successful!");
        // Optionally, redirect or close the form
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
        name="studentName"
        value={formData.studentName}
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
        name="studentEmail"
        value={formData.studentEmail}
        onChange={handleChange}
        placeholder="Email"
        className="border text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        required
      />
      <input
        type="number"
        name="studentPhone"
        value={formData.studentPhone}
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
      <input
        type="text"
        name="studentAddress"
        value={formData.studentAddress}
        onChange={handleChange}
        placeholder="Address"
        className="border text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        required
      />
      <input
        type="date"
        name="studentDOB"
        value={formData.studentDOB}
        onChange={handleChange}
        className="border text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        required
      />

      <select
        name="studentBranch"
        value={formData.studentBranch}
        onChange={handleChange}
        className="border text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        required
      >
        <option value="" disabled>
          Select Branch
        </option>
        <option value="CSE">Computer Science and Engineering</option>
        <option value="IT">Information Technology</option>
        <option value="ECE">Electronics and Communication Engineering</option>
        <option value="EEE">Electrical and Electronics Engineering</option>
        <option value="ME">Mechanical Engineering</option>
        <option value="CE">Civil Engineering</option>
        <option value="CHE">Chemical Engineering</option>
        <option value="AE">Aeronautical Engineering</option>
      </select>

      <div className="select_gender flex justify-between items-center col-span-1 pr-45">
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
        className="border text-gray-600 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
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

export default StudentRegistration;
