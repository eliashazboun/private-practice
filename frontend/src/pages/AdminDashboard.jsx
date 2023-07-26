import React, { useState } from "react";
import "./AdminDashboard.scss";

import AdminDashView from "../components/AdminDashView/AdminDashView";
import Sidebar from "../components/Sidebar/Sidebar";

const AdminDashboard = () => {

  const [selected, setSelected] = useState('dash')
  
  const clickHandler = (e) => {
    setSelected(e.currentTarget.id)
  }

  return (
    <div className="adminDash">
      <div className="wrapper">
        <Sidebar clickHandler={clickHandler} selected={selected}/>
        <div className="content">
          <AdminDashView selected={selected}/>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
