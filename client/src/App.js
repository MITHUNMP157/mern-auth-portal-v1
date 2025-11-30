import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminPage from "./pages/AdminPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import Navbar from "./component/Navbar";
import Home from "./pages/Home.js";
import UpdatedUser from "./pages/UpdatedUser.js";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/updateuser" element={<UpdatedUser />} />
      </Routes>
    </BrowserRouter>
  );
}
