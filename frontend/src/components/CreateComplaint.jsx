import React, { useEffect, useState } from "react";
import axios from "axios";
import complainDefaultImg from "../assets/complain_default.png";
import api from "../AxiosConfig";

const CreateComplaint = ({ onClose }) => {
  const [categoryTypeList, setCategoryTypeList] = useState([]);
  const [subCategoryTypeList, setSubCategoryTypeList] = useState([]);
  const [selectedCategoryTypeIndex, setSelectedCategoryTypeIndex] = useState("");
  const [selectedSubCategoryTypeId, setSelectedSubCategoryTypeId] = useState("");
  const [complaintDescription, setComplaintDescription] = useState("");

  useEffect(() => {
    api
      .get("http://localhost:8080/complain/get-all-complaint-categories")
      .then((response) => setCategoryTypeList(response.data))
      .catch((err) => console.log(err));

    api
      .get("http://localhost:8080/complain/get-all-complaint-subcategories")
      .then((response) => setSubCategoryTypeList(response.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmitComplaint = () =>{
    if(!selectedCategoryTypeIndex ||!complaintDescription){
      alert("Please fill all the required fields");
      return;
    }
    const complaintData = {
      studentId: 1,
      description: complaintDescription,
      categoryId:  parseInt(selectedCategoryTypeIndex) +1 ,
      subcategoryId: parseInt(selectedSubCategoryTypeIndex) +1
    };
    console.log("complaintData : ", complaintData);
    api
    .post("http://localhost:8080/complain/add-complaint", complaintData)
    .then((response) => alert(response.data))
    .catch((err) => alert(err.message));
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900/40 z-10">
      <div className="w-fit bg-gray-200 shadow-xl rounded-lg p-6 relative flex items-center">
        <div className="w-[450px]">
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 text-red-600 text-2xl font-bold hover:text-red-800 cursor-pointer"
            onClick={onClose}
          >
            X
          </button>

          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-5">
            Create Complaint
          </h2>

          {/* Complaint Type Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Complaint Type:
            </label>
            <select
              value={selectedCategoryTypeIndex}
              onChange={(e) => setSelectedCategoryTypeIndex(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded-md focus:ring focus:ring-blue-300"
            >
              <option value="">Select Complaint Type</option>
              {categoryTypeList.map((categoryType, index) => (
                <option key={categoryType.id} value={index}>
                  {categoryType.id} - {categoryType.categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Subcategory:
            </label>
            <select 
              value={selectedSubCategoryTypeId}
              onChange={(e) => setSelectedSubCategoryTypeId(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded-md focus:ring focus:ring-blue-300"
            >
              <option value="">Select Subcategory</option>
              {subCategoryTypeList
                .filter(
                  (item) =>
                    selectedCategoryTypeIndex === null ||
                    item.categoryId ===
                      categoryTypeList[selectedCategoryTypeIndex]?.id
                )
                .map((subCategoryType, index) => (
                  <option key={subCategoryType.subCategoryId} value={subCategoryType.subCategoryId}>
                    {index + 1} - {subCategoryType.subCategoryName}
                  </option>
                ))}
            </select>
          </div>

          {/* Complaint Description */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Describe Your Problem:
            </label>
            <textarea
              value={complaintDescription}
              onChange={(e) => setComplaintDescription(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded-md h-24 resize-none focus:ring focus:ring-blue-300"
              placeholder="Write your complaint..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition-all duration-200"
            onClick={handleSubmitComplaint}
            >
              Submit Complaint
            </button>
          </div>
        </div>
        <div className="img_section w-100 h-100 ml-10">
          <img
            className=""
            src={complainDefaultImg}
            alt="Complaint Default Image"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateComplaint;
