import React, { useState , useEffect} from "react";

import foodBg from "../assets/food-menu-bg.jpg"
import axios from "axios";
import api from "../AxiosConfig";

const FoodMenuPage = () => {

  const [foodMenu, setFoodMenu] = useState();
  const [isMenuLoading, setIsMenuLoading] = useState(true);

  useEffect(() => {
    fetchFoodMenu();
  }, []);
  
  const fetchFoodMenu = () =>{
    api.get("/food/get-food-menu")
    .then((response) => {
      
      setIsMenuLoading(false);
      setFoodMenu(response.data);
    }).catch((error) => {alert(error.message);});
  }


  return (
    <div className="p-10">
        <div className="fixed left-0 top-17 h-screen bg-gray-900/40 w-full -z-10"></div>
        <div className="w-full h-full background fixed left-0 top-17 -z-20">
            <img src={foodBg} alt="bg" className="object-cover"/>
        </div>
      <h2 className="text-3xl font-bold text-center mb-5 text-white">Weekly Food Menu</h2>
      <table className="w-full border-collapse border border-gray-400 text-center">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="p-3 border">Day</th>
            <th className="p-3 border">Breakfast</th>
            <th className="p-3 border">Lunch</th>
            <th className="p-3 border">Snacks</th>
            <th className="p-3 border">Dinner</th>
          </tr>
        </thead>
        <tbody>
  {isMenuLoading? (
    <tr>
      <td colSpan="5" className="text-2xl p-3 border text-center text-white">Loading...</td>
    </tr>
  ): (foodMenu && Object.entries(foodMenu).map(([day, meals], index) => (
    <tr key={index} className="bg-white/80 hover:bg-white">
      <td className="p-3 border font-semibold">{day}</td>
      <td className="p-3 border">{meals.Breakfast || "-"}</td>
      <td className="p-3 border">{meals.Lunch || "-"}</td>
      <td className="p-3 border">{meals.Snacks || "-"}</td>
      <td className="p-3 border">{meals.Dinner || "-"}</td>
    </tr>
  )))}
</tbody>
      </table>
    </div>
  );
};

export default FoodMenuPage;