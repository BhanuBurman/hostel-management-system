import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../AxiosConfig";
import CreateRoomType from "../pages/CreateRoomType.jsx"
import { useNavigate } from "react-router-dom";

const CreateRooms = (props) => {
    const [roomList, setRoomList] = useState([]);
  const [roomTypeList, setRoomTypeList] = useState([]);
  const [selectedRoomTypeIndex, setSelectedRoomTypeIndex] = useState("");
  const [floorOption, setFloorOption] = useState("current");
  const [noOfRooms, setNoOfRooms] = useState(0);

  const navigate = useNavigate();

  const floorNames = 
    {
      0: "G",
      1: "A",
      2: "B",
      3: "C",
      4: "D",
      5: "E",
      6: "F",
      7: "H",
      8: "I",
      9: "J",
      10: "K",
      11: "L",
      12: "M",
      13: "N",
      14: "O",
      15: "P",
      16: "Q",
      17: "R",
      18: "R",
      19: "S",
      20: "T",
      21: "U",
    };

  // Fetch room types
  const fetchRoomTypes = () => {
    api
      .get("http://localhost:8080/room-types/get-all-room-types")
      .then((response) => {
        setRoomTypeList(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  const handleCreateRoom = () => {
    if (selectedRoomTypeIndex === "") {
      alert("Please select a room type");
      return;
    }

    const floorNumber =
      floorOption === "current"
        ? props.currentFloorNumber
        : props.totalFloors;

    const startingRoomNumber =
      floorOption === "current" ? props.currentFloorTotalRooms : 0;

      const newRoomList = Array.from({ length: noOfRooms }, (_, index) => ({
        roomNumber: `${floorNames[floorNumber]}-${(startingRoomNumber + index + 1)
          .toString()
          .padStart(3, "0")}`,
        roomTypeId: roomTypeList[selectedRoomTypeIndex].id,
        totalBeds: roomTypeList[selectedRoomTypeIndex].noOfBeds,
        availableBeds: roomTypeList[selectedRoomTypeIndex].noOfBeds,
        occupiedBeds: 0,
        floorNumber: floorNumber,
      }));
    console.log("RoomList:", newRoomList);
    uploadRoomList(newRoomList);
  };


  const uploadRoomList = (newRoomList) => {
    api
     .post("http://localhost:8080/room/add-multiple-rooms-info", newRoomList)
     .then((response) => {
        console.log(response.data);
        alert("Rooms uploaded successfully");
        props.onClose();
      })
     .catch((err) => console.log(err));
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
  <div className="relative w-full max-w-md mx-auto p-8 bg-white rounded-3xl shadow-2xl">
    
    {/* Close Button */}
    <button
      className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-all duration-300 text-2xl"
      onClick={props.onClose}
    >
      ×
    </button>

    {/* Heading */}
    <h2 className="text-2xl font-bold text-center text-blue-700 mb-8">
      Create Room
    </h2>

    {/* Room Type Dropdown */}
    <div className="mb-6">
      <label className="block text-gray-700 font-semibold mb-2">Room Type</label>
      <select
        value={selectedRoomTypeIndex}
        onChange={(e) => {
          const value = e.target.value;
          if (value === "custom") {
            navigate("/create-room-type");
            return;
          }
          setSelectedRoomTypeIndex(value);
        }}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Select Room Type</option>
        {roomTypeList.map((roomType, index) => (
          <option key={roomType.id} value={index}>
            {roomType.noOfBeds} Beds - {roomType.isAC ? "AC" : "Non-AC"}
          </option>
        ))}
        <option key="custom" value="custom">
          Create Custom Room Type
        </option>
      </select>
    </div>

    {/* Room Type Details */}
    {selectedRoomTypeIndex !== "" && (
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <p className="text-gray-800">AC: {roomTypeList[selectedRoomTypeIndex].isAC ? "Yes" : "No"}</p>
        <p className="text-gray-800">Beds: {roomTypeList[selectedRoomTypeIndex].noOfBeds}</p>
        <p className="text-gray-800">Price: ₹{roomTypeList[selectedRoomTypeIndex].price}</p>
      </div>
    )}

    {/* Floor Selection */}
    <div className="mb-6">
      <p className="block text-gray-700 font-semibold mb-2">Select Floor</p>
      <div className="flex gap-6">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="floor"
            value="current"
            checked={floorOption === "current"}
            onChange={(e) => setFloorOption(e.target.value)}
            className="accent-blue-600"
          />
          Current
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="floor"
            value="next"
            checked={floorOption === "next"}
            onChange={(e) => setFloorOption(e.target.value)}
            className="accent-blue-600"
          />
          New
        </label>
      </div>
    </div>

    {/* Number of Rooms */}
    <div className="mb-6">
      <label className="block text-gray-700 font-semibold mb-2">Number of Rooms</label>
      <input
        type="number"
        value={noOfRooms}
        onChange={(e) => setNoOfRooms(e.target.value)}
        placeholder="Enter number"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    {/* Debug Info (Optional) */}
    <div className="text-xs text-gray-500 mb-4">
      <p>Selected Floor: {floorOption}</p>
      <p>No of Rooms: {noOfRooms}</p>
    </div>

    {/* Submit Button */}
    <div className="flex justify-center">
      <button
        onClick={handleCreateRoom}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
      >
        Submit
      </button>
    </div>
  </div>
</div>

  );
};

export default CreateRooms;
