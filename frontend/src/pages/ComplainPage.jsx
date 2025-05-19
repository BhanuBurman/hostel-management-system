import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CreateComplaint from "../components/CreateComplaint";
import api from "../AxiosConfig";
import { useUser } from "../context/UserContext";
import Spinner from "../components/Spinner";

const ComplainPage = () => {
  const { user } = useUser();
  if(user === null){
    alert("Please login to view this page");
    window.location.href = "/";
    return;
  }
  const location = useLocation();
  const roomObj = location.state?.roomsTypeId || -1;

  console.log(roomObj);

  const navigate = useNavigate();
  const [newComplaintClicked, setNewComplaintClicked] = useState(false);
  const [isCreateTab, setIsCreateTab] = useState(true);

  const [complaintList, setComplaintList] = useState([]);
  const [isLoadingComplaints, setIsLoadingComplaints] = useState(false);

  useEffect(() => {
    fetchCompaints();
  }, []);

  const fetchCompaints = () => {
    setIsLoadingComplaints(true);
    api
      .get("/complain/get-all-complaints")
      .then((response) => {
        setComplaintList(response.data);
        console.log(response.data);
        
        setIsLoadingComplaints(false);
      })
      .catch((err) => console.log(err));
  };

  const handleViewDetails = (complaintId) => {
    navigate("/complain-detail-page", {
      state: { complaintId: complaintId },
    });
  };

  return (
    <div className="room__type min-h-screen w-full flex flex-col  justify-start bg-gray-100 p-10 px-50">
      {newComplaintClicked && (
        <CreateComplaint onClose={() => setNewComplaintClicked(false)} />
      )}
      <div className="w-full mb-5">
        <div className="heading text-3xl font-bold">Complain Section</div>
        <p>
          Welcome to the Complaint Section. We value your feedback and are
          committed to maintaining a comfortable and safe environment for all
          residents. If you encounter any issues related to your room,
          facilities, or services, please do not hesitate to file a complaint.
          Our team will review your concerns promptly and take the necessary
          actions to resolve them. Your satisfaction and well-being are our top
          priorities.
        </p>
      </div>
      <div className="tab_switch w-full flex justify-between items-center">
        <div>
          <button
            className={`tab_buttons p-2 px-5 cursor-pointer rounded-tr-md rounded-tl-md  ${
              isCreateTab ? "bg-yellow-400 " : ""
            }`}
            onClick={() => setIsCreateTab(!isCreateTab)}
          >
            Pending
          </button>
          <button
            className={`tab_buttons p-2 px-5 cursor-pointer rounded-tr-md rounded-tl-md  ${
              isCreateTab ? "" : "bg-green-500 "
            }`}
            onClick={() => setIsCreateTab(!isCreateTab)}
          >
            Comlpeted
          </button>
        </div>

        {user?.roleType.toLowerCase() === "student" && (
          <button
            className="complain_button p-1 text-md px-2 rounded-md transition-all hover:scale-105 bg-gray-700 text-white cursor-pointer hover:bg-black"
            onClick={() => setNewComplaintClicked(true)}
          >
            New Complain
          </button>
        )}
      </div>
      <div className="room__info w-full shadow-2xl p-5 bg-white rounded-br-lg rounded-bl-lg">
        {/* Create room Type  */}
        {isLoadingComplaints ? (
          <Spinner />
        ) : (
          isCreateTab && (
            <div className="overflow-auto ">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left">ID</th>
                    <th className="px-4 py-3 text-left">Category</th>
                    <th className="px-4 py-3 text-left">Subcategory</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {complaintList
                    .filter(
                      (complaint) =>
                        complaint.status !== "Resolved" &&
                        complaint.status !== "Completed"
                    )
                    .map((complaint) => (
                      <tr
                        key={complaint.complaintId}
                        className="border-t border-gray-200"
                      >
                        <td className="px-4 py-3">{complaint.complaintId}</td>
                        <td className="px-4 py-3">{complaint.categoryName}</td>
                        <td className="px-4 py-3">{complaint.subcategoryName}</td>
                        <td className="px-4 py-3 flex">
                          <div
                            className={`px-4 py-1 text-sm font-semibold rounded flex  ${
                              complaint.status === "Pending"
                                ? "bg-red-500 text-white"
                                : complaint.status === "In Progress"
                                ? "bg-yellow-500 text-white"
                                : "bg-green-500 text-white"
                            }`}
                          >
                            {complaint.status}
                          </div>
                        </td>
                        <td className="px-4 py-3">{complaint.submittedAt}</td>
                        <td className="px-4 py-3">
                          <button
                            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2"
                            onClick={() => handleViewDetails(complaint.complaintId)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )
        )}
        {/*List of all the room types added */}
        {!isCreateTab && (
          <div className="border-2  border-gray-300 my-5 h-140 p-5 overflow-auto bg-gray-800 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">
              Resolved/Completed Complaints
            </h2>
            {complaintList.filter(
              (complaint) =>
                complaint.status === "Resolved" || complaint.status === "Completed"
            ).length === 0 ? (
              <p className="text-white">
                No resolved or completed complaints found.
              </p>
            ) : (
              <ul className="space-y-4">
                {complaintList
                  .filter(
                    (complaint) =>
                      complaint.status === "Resolved" || complaint.status === "Completed"
                  )
                  .map((complaint) => (
                    <li
                      key={complaint.complaintId}
                      className="bg-white rounded-md shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between"
                    >
                      <div>
                        <div className="font-semibold text-lg text-gray-800">
                          #{complaint.complaintId} - {complaint.categoryName}
                        </div>
                        <div className="text-gray-600 text-sm">
                          {complaint.subcategoryName}
                        </div>
                        <div className="text-gray-500 text-xs">
                          Submitted: {complaint.submittedAt}
                        </div>
                      </div>
                      <div className="flex items-center mt-2 md:mt-0">
                        <span className="px-3 py-1 rounded bg-green-500 text-white text-sm font-semibold mr-3">
                          {complaint.status}
                        </span>
                        <button
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          onClick={() => handleViewDetails(complaint.complaintId)}
                        >
                          View Details
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplainPage;
