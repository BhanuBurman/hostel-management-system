import React, { useState } from "react";
import axios from "axios";

const CreateRoomType = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [roomData, setRoomData] = useState({
    isAC: false,
    noOfBeds: 0,
    noOfFans: 0,
    noOfLights: 0,
    noOfTables: 0,
    noOfAlmira: 0,
    noOfChairs: 0,
    price: 0,
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ****** Commenting out image upload system for smooth developemtn and testing *****
    // if (imageFile !== null) {
    //   uploadOnCloudinary();
    // }
    // setRoomData({
    //   ...roomData,
    //   image: imageUrl,
    // });
    axios
      .post("http://localhost:8080/api/add-room-types", {
        body: JSON.stringify(roomData),
      })
      .then(function (response) {
        console.log(response);
        alert("Room Type Created Successfully");
      })
      .catch(function (error) {
        console.error("Error in Room Type Creation", error);
      });
  };

  const handleChange = (event) => {
    setRoomData({
      ...roomData,
      [event.target.name]: parseInt(event.target.value),
    });
  };

  const handleACSelection = (event) => {
    setRoomData({ ...roomData, isAC: event.target.value === "true" });
  };

  const uploadOnCloudinary = async () => {
    const cloudName = "dv5lxe8m7";
    const presetName = "meme-uploads";
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", presetName);

    axios
      .post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
      .then((response) => {
        console.log("Uploaded Image URL:", response.data.secure_url);
        setImageUrl(response.data.secure_url);
      })
      .catch((err) => {
        console.error("Error in Image Upload", err);
      });
  };

  return (
    <div className="room__type h-screen w-full flex justify-center">
      <div className="room__info w-5xl rounded-lg shadow-2xl p-10">
        <form className="flex justify-between" onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-center p-10 space-y-4">
            {/* ✅ Fixed Radio Button Implementation */}
            <div className="flex justify-between w-full items-start">
              <label className="font-semibold">Room Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="isAC"
                    value="true"
                    checked={roomData.isAC === true}
                    onChange={handleACSelection}
                  />
                  AC
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="isAC"
                    value="false"
                    checked={roomData.isAC === false}
                    onChange={handleACSelection}
                  />
                  Non-AC
                </label>
              </div>
            </div>

            {/* ✅ Input Fields */}
            {Object.entries(roomData)
              .filter(([key]) => key !== "isAC" && key !== "image")
              .map(([key, value]) => (
                <div key={key} className="flex w-full justify-between items-center font-semibold">
                  <label className="capitalize mr-7">{key.replace("noOf", "No of ")}</label>
                  <input
                    className="border-1 border-gray-200 rounded-2xl p-5 focus:outline-0 shadow-md w-50 h-12 px-2"
                    type="number"
                    name={key}
                    value={value}
                    onChange={handleChange}
                    placeholder={`Enter ${key}`}
                  />
                </div>
              ))}

            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Add Room Type
            </button>
          </div>

          {/* ✅ Image Upload Section */}
          <div className="imageSection border-1 border-gray-300 shadow-lg h-140 w-110 flex flex-col items-center justify-center">
            {imageFile && (
              <img
                className="w-100 h-100 mb-4 object-cover rounded-lg"
                src={URL.createObjectURL(imageFile)}
                alt="Room"
              />
            )}
            <label className="border-2 cursor-pointer rounded-md p-3 mt-4 bg-gray-100 hover:bg-gray-200">
              Choose Image
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="hidden"
              />
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoomType;
