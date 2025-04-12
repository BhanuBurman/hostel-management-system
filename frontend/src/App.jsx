import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateRoomType from "./pages/CreateRoomType";
import Home from "./pages/Home";
import Room from "./pages/Room";
import ComplainPage from "./pages/ComplainPage";
import ComplainDetailPage from "./pages/ComplainDetailPage";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import FoodMenuPage from "./pages/FoodMenuPage";
import RoomViewPage from "./pages/RoomViewPage";
function App() {
  
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<>
        <Home />
      <AboutUs />
      <ContactUs />
      <Footer />
        </>
      } />
        <Route path="/create-room-type" element={<CreateRoomType />} />
        <Route path="/rooms" element={<Room />} />
        <Route path="/complain-page" element={<ComplainPage />} />
        <Route path="/complain-detail-page" element={<ComplainDetailPage />} />
        <Route path="/food-menu" element={<FoodMenuPage />} />
        <Route path="/room-view" element={<RoomViewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
