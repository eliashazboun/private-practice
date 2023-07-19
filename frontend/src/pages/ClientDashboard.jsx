import React, { useEffect } from "react";
import './ClientDashboard.scss'

import { decodeToken } from "react-jwt";

const ClientDashboard = () => {
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          const user = decodeToken(token);
          console.log(user)
          if (!user){
            localStorage.removeItem('token')
            window.location.href= '/api/home'
          }
        }
      }, []);
  return (
    <div className="clientDashboard">
        <div className="wrapper">
            <h1>Client Dashboard</h1>
        </div>
    </div>
  )
}

export default ClientDashboard