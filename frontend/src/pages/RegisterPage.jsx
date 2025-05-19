import { useState } from "react";
import { BsRocketFill } from "react-icons/bs";
import StudentRegistration from "../components/StudentRegistration";
import WardenRegistration from "../components/WardenRegistration";

const RegisterPage = () => {

  //  switch button
  const [activeTab, setActiveTab] = useState("student");

  const tabStyle = (tab) =>{
    return tab === activeTab?
    "bg-white rounded-2xl px-6 py-1 text-indigo-600 font-semibold cursor-pointer "
    :"px-6 py-1 text-white font-semibold cursor-pointer hover:-mt-1"
  }

  return (
    <div className="top-0 left-0 signup_component  w-full h-screen fixed  flex justify-end items-center bg-gradient-to-l from-blue-300 to-blue-800">
      <div className="left_text text-white w-55 text-center m-auto flex justify-center flex-col items-center">
        <BsRocketFill className="text-8xl"/>
        <div className="font-semibold text-4xl my-7">Welcome</div>
        <span>No queues. No paperwork. Just smart hostel access.</span>
      </div>
      <div className="signup_card shadow-xl w-300 px-35 py-8 bent-edge bg-gray-100 h-150 mr-10">
        <div className="swith_button col-span-1 w-full flex justify-end ">
            <div className="w-55 rounded-4xl bg-indigo-600 p-0.5 flex justify-between ">
              <button className={tabStyle("student")}  onClick={() => setActiveTab("student")}>Student</button>
              <button className={tabStyle("warden")} onClick={() => setActiveTab("warden")}>Warden</button>
            </div>
        </div>
        <h2 className="text-center text-4xl font-bold text-gray-600 mb-6">
          {activeTab === "student"? "Student":"Warden"} Registration
        </h2>
        {
          activeTab === "student" ? (
            <StudentRegistration />
          ) : <WardenRegistration />
        }
      </div>

    </div>
  );
};

export default RegisterPage;
