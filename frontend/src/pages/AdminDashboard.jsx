import React, { useEffect, useState } from "react";
import "./AdminDashboard.scss";

import { decodeToken } from "react-jwt";
import axios from "axios";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);

  const populateDash = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await axios.get("/api/admindash", {
        headers: { "x-access-token": token },
      });
      console.log(res.data);
      setLoading(false);
    } else {
      console.log("No token found");
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = decodeToken(token);
      if (user) {
        populateDash();
      } else {
        localStorage.removeItem("token");
        window.location.href = "/api/login";
      }
    } else {
      window.location.href = "/";
    }
  }, []);
  return (
    <div className="adminDash">
      <div className="wrapper">
        {loading ? <h1>Loading</h1> : <h1>Admin Dash</h1>}
      </div>
    </div>
  );
};

export default AdminDashboard;
