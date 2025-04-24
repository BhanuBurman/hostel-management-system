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
        : props.totalFloors + 1;

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
    <div
      className={
        "create_room_window h-screen w-full z-10 absolute flex left-0 top-0 bg-gray-900/40  justify-center items-center flex-col"
      }
    >
      <div className=" flex w-full justify-end">
        <button
          className="bg-red-500 text-white p-2 px-5 m-2 top-0 absolute text-3xl cursor-pointer"
          onClick={props.onClose}
        >
          X
        </button>
      </div>
      <div className="create_room_card h-auto border-2 w-[400px] rounded-md bg-gray-200 flex flex-col justify-center items-center p-4 gap-4">
        {/* Room Type Dropdown */}
        <div className="flex flex-col items-center">
          <label className="mb-1">Room Type:</label>
          <select
            value={selectedRoomTypeIndex}
            onChange={(e) => {
              const value = e.target.value;
              if(value === "custom"){
                navigate("/create-room-type");
                return ;
              }
              setSelectedRoomTypeIndex(e.target.value);
            }}
            className="p-1 rounded"
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

        {/* Show room type details if selected */}
        {selectedRoomTypeIndex !== "" && (
          <div className="flex flex-col items-start gap-2">
            <p>AC: {roomTypeList[selectedRoomTypeIndex].isAC ? "Yes" : "No"}</p>
            <p>No of Beds: {roomTypeList[selectedRoomTypeIndex].noOfBeds}</p>
            <p>Price: ₹{roomTypeList[selectedRoomTypeIndex].price}</p>
          </div>
        )}

        {/* Floor Selection Radio */}
        <div className="flex flex-col items-start mt-4">
          <p className="mb-2">Floor:</p>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="floor"
                value="current"
                checked={floorOption === "current"}
                onChange={(e) => setFloorOption(e.target.value)}
                className="mr-1"
              />
              Current
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="floor"
                value="next"
                checked={floorOption === "next"}
                onChange={(e) => setFloorOption(e.target.value)}
                className="mr-1"
              />
              New
            </label>
          </div>
        </div>

        {/* No of Rooms Input */}
        <div className="flex flex-col items-center mt-4">
          <label className="mb-1">Number of Rooms:</label>
          <input
            type="number"
            value={noOfRooms}
            onChange={(e) => setNoOfRooms(e.target.value)}
            className="p-1 rounded border"
            placeholder="Enter number"
          />
        </div>

        {/* For Debugging */}
        <div className="mt-4 text-sm text-gray-700">
          <p>Selected Floor: {floorOption}</p>
          <p>No of Rooms: {noOfRooms}</p>
        </div>
        <div className="submit_button border-2 p-2 px-5 rounded-sm">
          <button onClick={handleCreateRoom}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default CreateRooms;
