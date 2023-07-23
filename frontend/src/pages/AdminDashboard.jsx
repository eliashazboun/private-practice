import React, { useState } from "react";
import "./AdminDashboard.scss";

import AdminDashView from "../components/AdminDashView/AdminDashView";
import Sidebar from "../components/Sidebar/Sidebar";

const AdminDashboard = () => {

  const [view, setView] = useState('client')
  const [selected, setSelected] = useState('client')


  const clickHandler = (e) => {
    setView(e.currentTarget.id)
    setSelected(e.currentTarget.id)
  }

  return (
    <div className="adminDash">
      <div className="wrapper">
        <Sidebar clickHandler={clickHandler} selected={selected}/>
        <div className="content">
          <AdminDashView view={view} setView={setView}/>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
