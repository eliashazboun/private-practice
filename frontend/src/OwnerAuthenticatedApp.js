import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Home from "./pages/Home";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./pages/Profile";
import Clients from "./pages/Clients";
import Appointment from "./pages/Appointment";
import Video from "./pages/Video";
import Footer from "./components/Footer/Footer";
import AdminDashboard from "./pages/AdminDashboard";
import Loading from "./pages/Loading";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import React, { useEffect, useState } from "react";

export const UserContext = React.createContext();

function OwnerAuthenticatedApp({ isLoggedIn, setIsLoggedIn, user }) {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <BrowserRouter>
          <NavBar isLoggedIn={isLoggedIn} user={user && user} />
          <div className="pages">
            <UserContext.Provider value={userInfo}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/api/clients" element={<Clients />} />
                <Route path="/api/profile/" element={<Profile />} />
                <Route path="/api/appointments" element={<Appointment />} />
                <Route path="/api/video" element={<Video />} />
                <Route path="/api/login"element={<Login setIsLoggedIn={setIsLoggedIn} />}/>
                <Route path="/api/signup" element={<Signup />} />
                <Route path="/api/admindash" element={<AdminDashboard />} />
                <Route path="/api/loading" element={<Loading />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </UserContext.Provider>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </LocalizationProvider>
  );
}

export default OwnerAuthenticatedApp;
