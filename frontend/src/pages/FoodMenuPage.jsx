import React, { useState , useEffect} from "react";

import foodBg from "../assets/food-menu-bg.jpg"
import axios from "axios";

const FoodMenuPage = () => {

  const [foodMenu, setFoodMenu] = useState();
  const menu = {
    Monday: [
      ["Idli & Sambar", "Rice & Dal", "Samosa", "Paneer Butter Masala"],
      ["Milk & Juice", "Chapati & Curry", "Tea & Biscuits", "Chicken Curry"],
    ],
    Tuesday: [
      ["Poha & Jalebi", "Rajma Chawal", "Puff", "Aloo Paratha"],
      ["Fruits", "Roti & Sabzi", "Cold Coffee", "Fish Curry"],
    ],
    Wednesday: [
      ["Dosa & Chutney", "Chole Bhature", "Pakora", "Dal Tadka"],
      ["Cornflakes", "Fried Rice", "Lassi", "Egg Curry"],
    ],
    Thursday: [
      ["Upma & Chutney", "Veg Pulao", "Cookies", "Shahi Paneer"],
      ["Banana Shake", "Roti & Dal", "Bhel Puri", "Mutton Curry"],
    ],
    Friday: [
      ["Paratha & Curd", "Mix Veg Rice", "Kachori", "Methi Malai Matar"],
      ["Tea & Sandwich", "Dal & Sabzi", "Lemonade", "Chicken Biryani"],
    ],
    Saturday: [
      ["Dhokla & Chutney", "Pulao & Chole", "Chaat", "Paneer Do Pyaza"],
      ["Milk & Cornflakes", "Jeera Rice", "Hot Chocolate", "Prawn Curry"],
    ],
    Sunday: [
      ["Aloo Poori", "Hyderabadi Biryani", "Spring Rolls", "Butter Chicken"],
      ["Juice", "Tandoori Roti & Curry", "Fruit Salad", "Kadai Paneer"],
    ],
  };

  useEffect(() => {
    fetchFoodMenu();
  }, []);

  const fetchFoodMenu = () =>{
    axios.get("http://localhost:8080/food/get-food-menu")
    .then((response) => {
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
  {foodMenu && Object.entries(foodMenu).map(([day, meals], index) => (
    <tr key={index} className="bg-white/80 hover:bg-white">
      <td className="p-3 border font-semibold">{day}</td>
      <td className="p-3 border">{meals.BREAKFAST || "-"}</td>
      <td className="p-3 border">{meals.LUNCH || "-"}</td>
      <td className="p-3 border">{meals.SNACKS || "-"}</td>
      <td className="p-3 border">{meals.DINNER || "-"}</td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
};

export default FoodMenuPage;