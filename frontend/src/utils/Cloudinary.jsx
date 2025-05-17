import axios from "axios";

const Cloudinary = async (file) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const presetName = import.meta.env.VITE_CLOUDINARY_PRESET_NAME;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", presetName);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );
    console.log("Uploaded Image URL:", response.data.secure_url);
    return response.data.secure_url; // important for chaining
  } catch (err) {
    console.error("Error in Image Upload", err);
    throw err;
  }
};

export default Cloudinary;
