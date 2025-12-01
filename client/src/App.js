import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminPage from "./pages/AdminPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import Navbar from "./component/Navbar";
import WelcomePage from "./pages/WelcomePage.js";
import Home from "./pages/Home.js";
import ProductedRoute from "./routes/productedRoute.js";
import UpdateUser from "./pages/UpdateUser.js";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={
            <ProductedRoute>
              <Navbar />
              <Home />
            </ProductedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProductedRoute>
              <Navbar />
              <ProfilePage />
            </ProductedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProductedRoute>
              <Navbar />
              <AdminPage />
            </ProductedRoute>
          }
        />
        <Route
          path="/update/:id"
          element={
            <ProductedRoute>
              <Navbar />
              <UpdateUser />
            </ProductedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<WelcomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
