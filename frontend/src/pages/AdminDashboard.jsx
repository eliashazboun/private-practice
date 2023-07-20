import React, { useState } from "react";
import "./AdminDashboard.scss";

import { decodeToken } from "react-jwt";
import SidebarItem from "../components/SidebarItem/SidebarItem";
import AdminDashView from "../components/AdminDashView/AdminDashView";

const AdminDashboard = () => {

  const [view, setView] = useState()

  const clickHandler = (e) => {
    setView(e.target.id)

  }

  return (
    <div className="adminDash">
      <div className="wrapper">
        <div className="sidebar">
          <SidebarItem id='client' title='client' onClick={clickHandler}></SidebarItem>
          <SidebarItem id='appointment' title='appointment' onClick={clickHandler}></SidebarItem>
          <SidebarItem id='video' title='video' onClick={clickHandler}></SidebarItem>
        </div>
        <div className="content">
          <AdminDashView view={view}/>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
