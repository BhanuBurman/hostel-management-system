import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../AxiosConfig";

const UserProfile = () => {
  const location = useLocation();
  const userInfo = location.state?.userInfo;

  const [studentDetails, setStudentDetails] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = () => {
    if (userInfo !== null) {
      api
        .post(
          "http://localhost:8080/auth/student-full-details",
          userInfo.regNumber,
          {
            headers: {
              "Content-Type": "text/plain",
            },
          }
        )
        .then((response) => {
          setStudentDetails(response.data);
        })
        .catch((error) => {
          console.error("Error fetching student details:", error);
        });
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          <div className="flex-shrink-0">
            <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg border-4 border-blue-300">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-center text-xl font-bold text-gray-700">
              {studentDetails?.studentName || "Student Name"}
            </h3>
            <p className="text-center text-sm text-gray-500">
              {studentDetails?.studentBranch || "Branch"}
            </p>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
            <ProfileField label="Email" value={studentDetails?.studentEmail} />
            <ProfileField label="Phone" value={studentDetails?.studentPhone} />
            <ProfileField
              label="Room Number"
              value={studentDetails?.roomNumber}
            />
            <ProfileField
              label="Registration Number"
              value={studentDetails?.regNumber}
            />
            <ProfileField
              label="Gender"
              value={studentDetails?.studentGender}
            />
            <ProfileField
              label="Date of Birth"
              value={
                studentDetails?.studentDOB
                  ? new Date(studentDetails.studentDOB).toLocaleDateString()
                  : ""
              }
            />
            <ProfileField
              label="Admission Year"
              value={studentDetails?.admissionYear}
            />
            <div className="col-span-2">
              <ProfileField
                label="Address"
                value={studentDetails?.studentAddress}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ label, value }) => (
  <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-medium">{value || "N/A"}</p>
  </div>
);

export default UserProfile;
