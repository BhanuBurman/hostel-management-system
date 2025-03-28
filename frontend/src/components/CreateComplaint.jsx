import React, { useEffect, useState } from "react";
import axios from "axios";

const CreateComplaint = ({ onClose }) => {
  const [categoryTypeList, setCategoryTypeList] = useState([]);
  const [subCategoryTypeList, setSubCategoryTypeList] = useState([]);
  const [selectedCategoryTypeIndex, setSelectedCategoryTypeIndex] = useState(null);
  const [complaintDescription, setComplaintDescription] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/complain/get-all-complaint-categories")
      .then((response) => setCategoryTypeList(response.data))
      .catch((err) => console.log(err));

    axios.get("http://localhost:8080/complain/get-all-complaint-subcategories")
      .then((response) => setSubCategoryTypeList(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900/40 z-10">
      <div className="w-[450px] bg-gray-200 shadow-xl rounded-lg p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-red-600 text-2xl font-bold hover:text-red-800 cursor-pointer"
          onClick={onClose}
        >
          X
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-5">Create Complaint</h2>

        {/* Complaint Type Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Complaint Type:</label>
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
          <label className="block text-gray-700 font-medium mb-1">Subcategory:</label>
          <select
            className="w-full p-2 border border-gray-400 rounded-md focus:ring focus:ring-blue-300"
          >
            <option value="">Select Subcategory</option>
            {subCategoryTypeList
              .filter(
                (item) =>
                  selectedCategoryTypeIndex === null ||
                  item.categoryId === categoryTypeList[selectedCategoryTypeIndex]?.id
              )
              .map((subCategoryType, index) => (
                <option key={subCategoryType.subCategoryId} value={index}>
                  {index+1} - {subCategoryType.subCategoryName}
                </option>
              ))}
          </select>
        </div>

        {/* Complaint Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Describe Your Problem:</label>
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
          >
            Submit Complaint
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateComplaint;
