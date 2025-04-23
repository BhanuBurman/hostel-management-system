import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../AxiosConfig";

const ComplainDetailPage = () => {
  const [complainDetails, setComplainDetails] = useState(null);
  const location = useLocation();
  const complaintId = location.state?.complaintId ?? -1; // Ensure valid ID
  console.log(complaintId);
  console.log(location.state);

  useEffect(() => {
    if (complaintId === -1) {
      return;
    }

    const fetchComplainDetails = async () => {
      try {
        const response = await api.get(
          `http://localhost:8080/complain/get-complain-detailsById/${complaintId}`
        );
        setComplainDetails(response.data);
      } catch (error) {
        console.error("Error fetching complaint details:", error);
        setError(true);
      }
    };

    fetchComplainDetails();
  }, [complaintId]);

  // Show loading if data is not yet available
  if (!complainDetails) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="complain_detail w-full h-full bg-gray-200 py-5">
      <div className="h-200 max-w-4xl mx-auto p-6  bg-white shadow-lg ">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Complaint Details
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-6 ml-10">
          <div>
            <p className="text-gray-600">Category:</p>
            <p className="font-semibold">{complainDetails.categoryName}</p>
          </div>
          <div>
            <p className="text-gray-600">Subcategory:</p>
            <p className="font-semibold">{complainDetails.subcategoryName}</p>
          </div>
          <div>
            <p className="text-gray-600">Status:</p>
            <span
              className={`px-3 py-1 rounded-md text-white ${
                complainDetails.status === "Pending"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            >
              {complainDetails.status}
            </span>
          </div>
          <div>
            <p className="text-gray-600">Submitted At:</p>
            <p className="font-semibold">{complainDetails.submittedAt}</p>
          </div>
          <div className="col-span-2 h-30">
            <p className="text-gray-600">Description:</p>
            <p className="font-semibold">{complainDetails.description}</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4 ">
          Student Details
        </h2>
        <div className="grid grid-cols-2 gap-4 ml-10">
          <div>
            <p className="text-gray-600">Name:</p>
            <p className="font-semibold">{complainDetails.studentName}</p>
          </div>
          <div>
            <p className="text-gray-600">Email:</p>
            <p className="font-semibold">{complainDetails.studentEmail}</p>
          </div>
          <div>
            <p className="text-gray-600">Phone:</p>
            <p className="font-semibold">{complainDetails.studentPhone}</p>
          </div>
          <div>
            <p className="text-gray-600">Room Number:</p>
            <p className="font-semibold">{complainDetails.roomNumber}</p>
          </div>
          <div>
            <p className="text-gray-600">Gender:</p>
            <p className="font-semibold">{complainDetails.studentGender}</p>
          </div>
          <div>
            <p className="text-gray-600">Date of Birth:</p>
            <p className="font-semibold">{complainDetails.studentDOB}</p>
          </div>
          <div>
            <p className="text-gray-600">Branch:</p>
            <p className="font-semibold">{complainDetails.studentBranch}</p>
          </div>
          <div>
            <p className="text-gray-600">Admission Year:</p>
            <p className="font-semibold">{complainDetails.admissionYear}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-600">Address:</p>
            <p className="font-semibold">{complainDetails.studentAddress}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplainDetailPage;
