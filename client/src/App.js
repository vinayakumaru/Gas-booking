import "./App.css";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import React, { StrictMode } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterGas from './Pages/RegisterGas';
import Booking from "./Pages/Booking";
import BookForGas from "./Pages/BookForGas";
import OrderHistory from "./Pages/OrderHistory";
import ForgotPas from "./Pages/ForgotPas";
import Admin from "./Pages/Admin";
import Dealer from "./Pages/Dealer";
function App() {
  return (
    <StrictMode>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/admin" element={<Admin/>} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/RegisterGas" element={<RegisterGas />} />
            <Route path="/bookforgas" element={<BookForGas/>} />
            <Route path="/orderhistory" element={<OrderHistory/>} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/forgotpassword" element={<ForgotPas />} />
            <Route path="/dealer" element={<Dealer />} />
          </Routes>
        </Router>
      </div>
    </StrictMode>
  );
}

export default App;
