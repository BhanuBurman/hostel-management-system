import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../assets/room_img.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import CreateComplaint from "../components/CreateComplaint";
import { RiArrowDropDownLine } from "react-icons/ri";
import api from "../AxiosConfig";
import { useUser } from "../context/UserContext";
const ComplainPage = () => {
  const { user } = useUser();
  const location = useLocation();
  const roomObj = location.state?.roomsTypeId || -1;

  // console.log(roomObj);

  const navigate = useNavigate();
  const [status, setStatus] = useState("Pending");
  const [newComplaintClicked, setNewComplaintClicked] = useState(false);
  const [isCreateTab, setIsCreateTab] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [complaintList, setComplaintList] = useState([]);

  const [allRoomTypeList, setAllRoomTypeList] = useState([
    // {
    //   id: 0,
    //   isAC: true,
    //   noOfBeds: 2,
    //   noOfFans: 2,
    //   noOfLights: 4,
    //   noOfTables: 2,
    //   noOfAlmira: 2,
    //   noOfChairs: 6,
    //   price: 50000.0,
    //   image: "{Room}",
    // },
  ]);
  useEffect(() => {
    fetchRoomTypes();
    fetchCompaints();
  }, []);

  const fetchCompaints = () => {
    api
      .get("http://localhost:8080/complain/get-all-complaints")
      .then((response) => {
        setComplaintList(response.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchRoomTypes = () => {
    // try{
    //   const response = await fetch("http://localhost:8080/api/get-all-room-types");
    //   const json = await response.json();
    //   console.log(json);
    //   setAllRoomTypeList(json);
    // }catch(e){
    //   console.log(e);
    // }
    api
      .get("http://localhost:8080/room-types/get-all-room-types")
      .then((response) => {
        setAllRoomTypeList(response.data);
        if (roomObj !== -1) {
          const foundRoom = response.data.find((item) => item.id === roomObj);
          console.log(foundRoom);
          if (foundRoom) {
            setRoomData(foundRoom);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const handleViewDetails = (complaintId) => {
    navigate("/complain-detail-page", {
      state: { complaintId: complaintId },
    });
  };

  return (
    <div className="room__type h-screen w-full flex flex-col  justify-start bg-gray-100 p-10 px-50">
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
        {isCreateTab && (
          //   <div className="p-6 bg-gray-100 min-h-screen bg-red-600">
          <div className="overflow-auto ">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Subcategory</th>
                  {/* <th className="px-4 py-3 text-left">Priority</th> */}
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {complaintList.map((complaint) => (
                  <tr
                    key={complaint.complaintId}
                    className="border-t border-gray-200"
                  >
                    <td className="px-4 py-3">{complaint.complaintId}</td>
                    <td className="px-4 py-3">{complaint.categoryName}</td>
                    <td className="px-4 py-3">{complaint.subcategoryName}</td>
                    {/* <td className="px-4 py-3">{complaint.category}</td>
                        <td className="px-4 py-3">{complaint.subcategory}</td> */}
                    {/* <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 text-sm font-semibold rounded ${
                              complaint.priority === "Urgent"
                                ? "bg-red-500 text-white"
                                : complaint.priority === "High"
                                ? "bg-yellow-500 text-white"
                                : "bg-green-500 text-white"
                            }`}
                          >
                            {complaint.priority}
                          </span>
                        </td> */}
                    <td className="px-4 py-3 flex">
                      {/* <select
                        className={`pl-2 py-1 text-sm font-semibold rounded flex  ${
                          complaint.status === "Pending"
                            ? "bg-red-500 text-white"
                            : complaint.status === "In Progress"
                            ? "bg-yellow-500 text-white"
                            : "bg-green-500 text-white"
                        }`}
                        value={status}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select> */}
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
                      {/* <button className="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                        Edit
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          // </div>
        )}
        {/*List of all the room types added */}
        {!isCreateTab && (
          <div className="border-2  border-gray-300 my-5 h-140 p-5 overflow-auto bg-gray-800">
            {allRoomTypeList.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center space-x-4 shadow-2xl border-1 border-gray-400 shadow-amber-50 rounded-md h-25 bg-gray-200 mb-5 px-3"
                >
                  {item.image ? (
                    <img
                      className="w-20 h-20 rounded-full object-cover"
                      src={item.image}
                      alt="Room"
                    />
                  ) : (
                    <img
                      className="w-20 h-20 rounded-full object-cover"
                      src={Room} // Your default imported image
                      alt="Default Room"
                    />
                  )}
                  <p className="text-2xl textblack flex items-center font-semibold w-35">
                    {item.isAC ? "AC" : "Non-AC"}
                  </p>
                  <div className="flex w-full justify-between ">
                    <div className="text-sm text-gray-500 max-w-2xl">
                      <span className="underline">Accesories:</span>
                      <span className="flex">
                        {Object.keys(item)
                          .filter(
                            (key) =>
                              item[key] !== 0 &&
                              key !== "isAC" &&
                              key !== "price" &&
                              key !== "image" &&
                              key !== "id"
                          ) // Filter keys whose value is zero
                          .map((key) => (
                            <div key={key} className="mr-1">
                              {key.replace("noOf", "")} : {item[key]},
                            </div>
                          ))}
                      </span>
                    </div>
                    <div className="price flex flex-col items-center justify-start">
                      <p className="text-2xl font-semibold ">{item.price} </p>
                      <span className="text-gray-500 ml-2 text-sm">
                        Rs/month
                      </span>
                    </div>
                    <div className="edit_button flex items-center text-2xl font-semibold px-5 rounded-md bg-green-500">
                      Edit
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplainPage;
