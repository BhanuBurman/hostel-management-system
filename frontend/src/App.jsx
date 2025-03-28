import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateRoomType from "./pages/CreateRoomType";
import Home from "./pages/Home";
import Room from "./pages/Room";
import ComplainPage from "./pages/ComplainPage";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-room-type" element={<CreateRoomType />} />
        <Route path="/rooms" element={<Room />} />
        <Route path="/complain-page" element={<ComplainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
