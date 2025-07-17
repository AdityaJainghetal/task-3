import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Component/Home";
import CheckoutPage from "./Pages/Checkoutpage";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
// import Navbar from "./Pages/Navbar";
import Layout from "./Pages/Layout";
import AdminDashboard from "./Component/AdminDashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Layout/>} >
        <Route path="/dashboard" element={<Home />} />
        
        <Route path="/register" element={<Register/>}/>
        <Route path="/adminlogin" element={<Login/>}/>
        <Route path="/admindashbaord" element={<AdminDashboard/>}/>



        <Route path="/checkout/:id" element={<CheckoutPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
