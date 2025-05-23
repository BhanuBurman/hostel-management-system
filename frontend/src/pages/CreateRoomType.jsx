import { useEffect, useState } from "react";
import Room from "../assets/room_img.jpg";
import { useLocation } from "react-router-dom";
import api from "../AxiosConfig";
import Spinner from "../components/Spinner";

const CreateRoomType = () => {
  const location = useLocation();
  const roomObj = location.state?.roomsTypeId || -1;

  console.log(roomObj);

  const [isCreateTab, setIsCreateTab] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isImageUploading , setIsImageUploading] = useState(false);
  const [isRoomTypeSubmitting, setIsRoomTypeSubmitting] = useState(false);
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
  const [roomData, setRoomData] = useState({
    isAC: false,
    noOfBeds: "0",
    noOfFans:  "0",
    noOfLights:  "0",
    noOfTables:  "0",
    noOfAlmira:  "0",
    noOfChairs:  "0",
    price:  "0",
    image:"",
  });

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  const fetchRoomTypes = () => {
    api
      .get("/room-types/get-all-room-types")
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsRoomTypeSubmitting(true);
    if (imageFile === null || imageUrl.length == 0) {
      alert("Image uploading please wait...");
      return;
    } 
  
    const updatedRoomData = {
      ...roomData,
      image: imageUrl,
    };
  
    api
      .post("/room-types/add-room-type", updatedRoomData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setIsRoomTypeSubmitting(false);
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

  const handleUpload = async (e) =>{
    const file = e.target.files[0];
    if(!file){
      alert("No file selected");
      return;
    }
    setImageFile(file);
    setIsImageUploading(true);
    const uploadImageURL = await Cloudinary(file);
    setIsImageUploading(false);
    setImageUrl(uploadImageURL);
  }
  

  return (
    <div className="room__type h-full w-full flex justify-center bg-gray-100 p-10">
      <div className="room__info w-5xl rounded-lg shadow-2xl p-10 bg-white">
        <div className="tab_switch">
          <button
            className={`tab_buttons p-2 px-5 cursor-pointer ${
              isCreateTab ? "bg-violet-700 rounded-md  text-white  " : ""
            }`}
            onClick={() => setIsCreateTab(!isCreateTab)}
          >
            Create
          </button>
          <button
            className={`tab_buttons p-2 px-5 cursor-pointer ${
              isCreateTab ? "" : "bg-violet-700 rounded-md  text-white  "
            }`}
            onClick={() => setIsCreateTab(!isCreateTab)}
          >
            View List
          </button>
        </div>
        {/* Create room Type  */}
        {isCreateTab && (
          <form className="flex justify-between " onSubmit={handleSubmit}>
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

              {/* Input Fields */}
              {Object.entries(roomData)
                .filter(([key]) => key !== "isAC" && key !== "image")
                .map(([key, value]) => (
                  <div
                    key={key}
                    className="flex w-full justify-between items-center font-semibold"
                  >
                    <label className="capitalize mr-7">
                      {key.replace("noOf", "No of ")}
                    </label>
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
                className="w-50 h-12 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
                disabled={isRoomTypeSubmitting}
              >
                {isRoomTypeSubmitting ? (
                    <Spinner size={5} border="border-3" color="border-blue-300" text="Adding..."/>
                ):(
                  "Add Room Type"
                )}
              </button>
            </div>

            {/* Image Upload Section */}
            <div className="imageSection border-1 border-gray-300 shadow-lg h-140 w-110 flex flex-col items-center justify-center">
              {isImageUploading && <p>uploading...</p>}
              {imageUrl.length > 0 && (
                <img
                  className="w-100 h-100 mb-4 object-cover rounded-lg"
                  src={imageUrl}
                  alt="Room"
                />
              )}
              <label className="border-2 cursor-pointer rounded-md p-3 mt-4 bg-gray-100 hover:bg-gray-200">
                Choose Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className="hidden"
                />
              </label>
            </div>
          </form>
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
                      src={Room} 
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
                          ) 
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

export default CreateRoomType;
