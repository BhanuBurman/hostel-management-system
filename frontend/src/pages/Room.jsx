import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import CreateRooms from "../components/CreateRooms";

const Room = () => {

  const floorNames = 
  {
    0: "G",
    1: "A",
    2: "B",
    3: "C",
    4: "D",
    5: "E",
    6: "F",
    7: "G",
    8: "H",
    9: "I",
    10: "J",
    11: "K",
    12: "L",
    13: "M",
    14: "N",
    15: "O",
    16: "P",
    17: "Q",
    18: "R",
    19: "R",
    20: "S",
    21: "T",
    22: "U",
  };


  const navigation = useNavigate();

  const [totalFloors, setTotalFloors] = useState(0);
  const [floorNumber, setFloorNumber] = useState(0);
  const [isCreateRoomsClicked, setIsCreateRoomsClicked] = useState(false);

  const [roomsInfoList, setRoomsInfoList] = useState([]);

  const fullRoomStyle =
    "bg-gradient-to-l from-amber-700 to-red-700 hover:from-red-700 hover:to-amber-700";
  const availableRoomStyle =
    "bg-gradient-to-l from-green-600 to-green-700 hover:from-green-700  ";

  const fetchRoomInfo = () => {
    axios
      .get(
        "http://localhost:8080/room/get-rooms-by-floor-number/" + floorNumber
      )
      .then((response) => {
        setRoomsInfoList(response.data);
      })
      .catch((err) => {
        alert("Error fetching rooms information");
        console.log(err);
      });
  };

  const fetchTotalFloors = () => {
    axios
      .get("http://localhost:8080/room/get-total-floors")
      .then((response) => {
        setTotalFloors(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddFloor = () => {
    if (roomsInfoList.length === 0) {
      alert("No rooms found on this floor. Add rooms first");
      return;
    }
    setTotalFloors(totalFloors + 1);
    setFloorNumber(totalFloors);
  };

  const handlePrev = () => {
    if (floorNumber === 0) {
      alert("No more floors available");
      return;
    }
    setFloorNumber(floorNumber - 1);
    fetchRoomInfo();
  };

  const handleNext = () => {
    if (floorNumber >= totalFloors - 1) {
      alert("No more floors available");
      return;
    }
    setFloorNumber(floorNumber + 1);
    fetchRoomInfo();
  };

  useEffect(() => {
    fetchRoomInfo();
    fetchTotalFloors();
  }, []);
  
  const handleCreateRoomNavigation = (index) =>{
    const state = {
      roomNumber: roomsInfoList[index].roomNumber,
      roomTypeId:roomsInfoList[index].roomTypeId
    }
    navigation("/room-view", {state})
  }


  return (
    <div className="rooms_info_container  h-screen w-full p-7 bg-gray-100 flex justify-center items-center flex-col">
      {isCreateRoomsClicked && (
        <CreateRooms
          isVisible={isCreateRoomsClicked}
          onClose={() => setIsCreateRoomsClicked(false)}
          currentFloorNumber = {floorNumber}
          totalFloors = {totalFloors}
          currentFloorTotalRooms = {roomsInfoList.length}
        />
      )}
      <div className="room_info w-300 shadow-md rounded-lg h-150 bg-white p-5">
        <div className="room_info_header flex justify-between">
          <div className="floor_heading text-5xl font-semibold">
            Floor-{floorNames[floorNumber]}
          </div>
          <div className="buttons flex items-center">
            {/* <button className="add_rooms add_floor mt-3 border-2 text-blue-700 p-1 px-2 rounded-md font-semibold hover:bg-blue-700 hover:text-white transition-colors duration-300 hover:border-blue-700 cursor-pointer"
            
            >Add Rooms</button>
            <button className="add_floor mx-5 mt-3 border-2 text-blue-700 p-1 px-2 rounded-md font-semibold hover:bg-blue-700 hover:text-white transition-colors duration-300 hover:border-blue-700 cursor-pointer"
            onClick={handleAddFloor}
            >Add Floor</button> */}
            <button
              className="upload p-2 text-2xl px-3 rounded-md transition-all hover:scale-105 bg-green-600 text-white cursor-pointer hover:bg-green-700"
              onClick={() => setIsCreateRoomsClicked(true)}
            >
              Create Rooms
            </button>
          </div>
        </div>
        <div className="floor_area w-full h-125 border-1 border-gray-200 flex flex-wrap gap-y-0 gap-5 p-5 mt-4 overflow-y-auto bg-gray-800">
          {roomsInfoList.map((item, index) => {
            return (
              <div
                className={`room_card text-sm border-0 h-30 rounded-md text-white p-2 cursor-pointer
                transition-all hover:scale-105
                ${
                  item.availableBeds === 0 ? fullRoomStyle : availableRoomStyle
                }`
              }
              onClick={() => handleCreateRoomNavigation(index)}
                key={item.roomId}
              >
                <p className="text-lg font-semibold">{item.roomNumber}</p>
                <p>Beds : {item.totalBeds}</p>
                <p>
                  Available beds : {item.availableBeds}/{item.totalBeds}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="next_prev_buttons w-full text-center p-5">
        <button
          className="prev_button next_button bg-blue-700 p-2 px-5 rounded-md text-white cursor-pointer"
          onClick={handlePrev}
        >
          Prev
        </button>
        <span className="text-2xl font-semibold px-10 ">
          {floorNumber}/{totalFloors}
        </span>
        <button
          className="next_button bg-blue-700 p-2 px-5 rounded-md text-white cursor-pointer"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Room;
