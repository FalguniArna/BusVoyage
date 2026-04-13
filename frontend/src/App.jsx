import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import StudentDashboard from "./Pages/StudentDashboard";
import Driver from "./Pages/Driver";
import Admin from "./Pages/Admin";
import About from "./Pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/driver" element={<Driver />} />
           <Route path="/admin" element={<Admin />} />
            <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}