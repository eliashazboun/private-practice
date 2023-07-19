import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import ClientInfo from "../components/ClientInfo/ClientInfo";
import CreateAppointment from "../components/CreateAppointment/CreateAppointment";
import ViewAppointments from "../components/ViewAppointments/ViewAppointments";
import EditAppointment from "../components/EditAppointments/EditAppointment";
import Button from "../components/Button/Button";

import './Profile.scss'

const Profile = () => {
  const location = useLocation();
  const { clientId } = location.state;
  const URI = `/api/profile/${clientId}`;

  const [client, setClient] = useState([]);
  const [active, setActive] = useState("create");

  const handleClick = (e) => {
    console.log(e)
    setActive(e.target.id)
  }

  const fetchProfile = async () => {
    try {
      const response = await fetch(URI);
      const json = await response.json();

      const { password, ...newJson } = json;

      if (response.ok) {
        setClient(newJson);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="profile">
      <div className="heading">
          <h1>{client.first_name} Profile </h1>
      </div>
      <ClientInfo client={client} />
      <div className="buttons">
          <Button title='Create Appointment' id='create' kind='green' handler={handleClick}></Button>
          <Button title='Edit Appointment' id='edit' kind='orange' handler={handleClick}></Button>
          <Button title='View Appointment' id='view' kind='blue' handler={handleClick}></Button>
      </div>
        
      <div className="container">
        {active === "create" && (<CreateAppointment id={clientId} name={client.first_name + " " + client.last_name}/> )}
        {active === "edit" && <EditAppointment></EditAppointment>}
        {active === "view" && <ViewAppointments client={client} />}
      </div>
    </div>
  );
};

export default Profile;
