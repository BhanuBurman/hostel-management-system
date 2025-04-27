import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import api from '../AxiosConfig';
import { useUser } from '../context/UserContext';

const RoomViewPage = () => {
    const location = useLocation();
    // console.log(location.state);
    const [roomTypeInfo, setRoomTypeInfo] = useState(null);
    const roomTypeId = location.state?.roomTypeId || -1;
    

    const {user} = useUser();

    useEffect(()=>{
        fetchRoomTypeById();
    },[]);
    const fetchRoomTypeById = () =>{
        if(roomTypeId == -1) return;
        api.get("http://localhost:8080/room-types/get-roomType-by-id/"+roomTypeId)
        .then((response) => {
            console.log("Fetched Room Type Info:", response.data); 
            setRoomTypeInfo(response.data)})
        .catch(() => alert("Error fetching data"))
    }

    const handleBooking = ()=>{
      console.log(roomTypeInfo);
      const request = {
        roomNumber:location.state?.roomNumber,
        regNumber:user?.regNumber
      }
      console.log("Room book request: ",request);
      
      api.put("http://localhost:8080/room/book-room", request)
      .then((response)=>{
        alert(response.data);
      }).catch((err)=> alert(err.message()));
    }
  return (
    <div className="room__view min-h-screen w-full bg-gray-100 flex justify-center items-center px-4 py-8">
  <div className="room_view_box w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2">
    
    {/* Info Section */}
    <div className="info_section p-6 flex flex-col justify-center space-y-3">
  <h2 className="text-2xl font-bold text-gray-800">
    Room: {location.state?.roomNumber || "N/A"}
  </h2>

  {roomTypeInfo ? (
    <div className='w-2xs '>
      <p className='flex justify-between shadow-md p-2 px-5 m-5'><span className="font-semibold">Tables:</span> <span>{roomTypeInfo.noOfTables}</span></p>
      <p className='flex justify-between shadow-md p-2 px-5 m-5'><span className="font-semibold">Beds:</span> <span>{roomTypeInfo.noOfBeds}</span></p>
      <p className='flex justify-between shadow-md p-2 px-5 m-5'><span className="font-semibold">Chairs:</span> <span>{roomTypeInfo.noOfChairs}</span></p>
      <p className='flex justify-between shadow-md p-2 px-5 m-5'><span className="font-semibold">Almiras:</span> <span>{roomTypeInfo.noOfAlmira}</span></p>
      <p className='flex justify-between shadow-md p-2 px-5 m-5'><span className="font-semibold">Fans:</span> <span>{roomTypeInfo.noOfFans}</span></p>
      <p className='flex justify-between shadow-md p-2 px-5 m-5'><span className="font-semibold">Lights:</span> <span>{roomTypeInfo.noOfLights}</span></p>
      <p className='flex justify-between shadow-md p-2 px-5 m-5'><span className="font-semibold">AC:</span> <span>{roomTypeInfo.isAC ? "Yes" : "No"}</span></p>
      <p className='flex justify-between shadow-md p-2 px-5 m-5'><span className="font-semibold">Price:</span> <span>₹{roomTypeInfo.price.toFixed(2)}</span></p>
      <div className="booking_button w-full flex justify-center">
        <button 
        className={` bg-green-600   p-2 px-10 text-2xl text-white font-semibold rounded-md
          ${user?.roomNumber === location.state?.roomNumber?"cursor-not-allowed opacity-50 ":" cursor-pointer hover:bg-green-700 "}
          ${user?.roleType.toLowerCase() === "student"?"":"hidden"}`}
        onClick={handleBooking}
        disabled={user?.roomNumber === location.state?.roomNumber}
        >
          {user?.roomNumber === location.state?.roomNumber?"Booked":"Book"}
        </button>
    </div>
    </div>
  ) : (
    <p className="text-gray-500">Loading room type info...</p>
  )}
</div>


    {/* Image Section */}
    <div className="img_section w-2xs h-100 m-auto">
      {roomTypeInfo?.image ? (
        <img
          src={roomTypeInfo.image}
          alt="Room Preview"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg">
          No Image Available
        </div>
      )}
    </div>

    
   
  </div>
</div>

  )
}

export default RoomViewPage
