import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../AxiosConfig";
import { useUser } from "../context/UserContext";

const ComplainDetailPage = () => {
  const { user } = useUser();

  const [complainDetails, setComplainDetails] = useState(null);
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");
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
        console.log(response);
        
        setComplainDetails(response.data);
        setStatus(response.data.status);
        setComment(response.data.comment);
      } catch (error) {
        console.error("Error fetching complaint details:", error);
        setError(true);
      }
    };

    fetchComplainDetails();
  }, [complaintId]);

  const handleUpdate = () => {
    const request = {
      complaintId: complainDetails.complainId,
      adminRegNumber: user?.regNumber,
      comment: comment,
      status: status,
    };
    console.log(request);
    api.put("http://localhost:8080/complain/update-complaint",request)
    .then((response) =>{
      alert(response.data);
    }).catch((e)=> alert(e.message()));
  };

  // Show loading if data is not yet available
  if (!complainDetails) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="complain_detail w-full h-full bg-gray-200 py-5">
      <div className=" max-w-4xl mx-auto p-6  bg-white shadow-lg ">
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
            <select
              className={`px-2 py-1 text-sm font-semibold rounded flex border-none outline-none 
                ${ user?.roleType.toLowerCase() === "student"? "appearance-none" : " "}
                ${
                status === "Pending"
                  ? "bg-yellow-500 text-white"
                  : status === "In Progress"
                  ? "bg-orange-500 text-white"
                  : "bg-green-500 text-white"
              }`}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled = {user?.roleType.toLowerCase() === "student"}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
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
        <div className="admin_section w-full border-t-2 border-gray-400 pt-6 mt-8 border-dashed">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Warden comments:
          </p>
          {
            user?.roleType.toLowerCase() ==="student"?(
                <i>{comment?comment:"No comments yet"}</i>
            ):(
              <input
            type="text"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            placeholder="Add comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
            )
          }
          
        </div>
      </div>
      {user?.roleType.toLowerCase() === "warden" && (
        <div className="update_button max-w-4xl flex justify-start mx-auto mt-2 items-end">
          <button
            className="bg-blue-700 p-2 px-4 text-white text-2xl rounded-md cursor-pointer "
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default ComplainDetailPage;
