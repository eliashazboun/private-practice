import React, { useEffect, useState } from "react";
import "./AdminDashboard.scss";

import useFetch from "../hooks/useFetch";

import AdminDashView from "../components/AdminDashView/AdminDashView";
import Sidebar from "../components/Sidebar/Sidebar";

const AdminDashboard = () => {
  const { data: clients, isLoading } = useFetch("api/clients");

  const [selected, setSelected] = useState("dash");

  const clickHandler = (e) => {
    setSelected(e.currentTarget.id);
  };

  useEffect(() => {
    console.log("I ran");
  }, []);

  return (
    <div className="adminDashboard">
      <div className="wrapper">
        <Sidebar clickHandler={clickHandler} selected={selected} />
        <div className="content">
          {isLoading ? 'Loading' :  <AdminDashView selected={selected} clients={clients} />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
