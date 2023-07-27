import React, { useState } from "react";
import "./AdminDashboard.scss";

import useFetch from "../hooks/useFetch";

import AdminDashView from "../components/AdminDashView/AdminDashView";
import Sidebar from "../components/Sidebar/Sidebar";

const AdminDashboard = () => {
  const { data: allClients } = useFetch(`/api/clients`);

  const [selected, setSelected] = useState("dash");

  const clickHandler = (e) => {
    setSelected(e.currentTarget.id);
  };

  return (
    <div className="adminDash">
      <div className="wrapper">
        <Sidebar clickHandler={clickHandler} selected={selected} />
        <div className="content">
          <AdminDashView selected={selected} allClients={allClients} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
