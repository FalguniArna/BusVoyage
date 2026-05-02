import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import StudentDashboard from "../Pages/StudentDashboard";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Admin from "../Pages/Admin";
import Driver from "../Pages/Driver";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/driver" element={<Driver />} />
      </Routes>
    </BrowserRouter>
  );
}