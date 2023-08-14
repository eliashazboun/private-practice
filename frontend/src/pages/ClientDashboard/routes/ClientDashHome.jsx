import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import ContentBox from "../../../components/ContentBox/ContentBox";
import VideocamIcon from "@mui/icons-material/Videocam";

const ClientDashHome = () => {
  const { data: client, isLoading: isClientLoading } = useFetch("api/clientdash/me");
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);

  const timeToInteger = (string) => {
    let [time, meridiam] = string.toUpperCase().split(" ");
    time = Number(time.split(":")[0]);
    if (meridiam === "PM") {
      return time + 12;
    }
    return time;
  };

  const fetchAppointments = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/appointments/${client._id}`);
      const data = await res.json();
      const sortedAppointments = data.sort((a, b) => timeToInteger(a.start_time) - timeToInteger(b.start_time));
      sortedAppointments.sort((a, b) => new Date(a.date) - new Date(b.date));
      setAppointments(sortedAppointments);
      setAppointmentsLoading(false);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isClientLoading) return;
    fetchAppointments();
  }, [isClientLoading]);

  return (
    <div className="clientDashboard">
      <div className="wrap">
        <h1>Hello {isClientLoading ? '' : client.first_name + ' ' + client.last_name}</h1>
        <ContentBox heading="Upcoming Appointments">
          {appointmentsLoading ? "Loading": appointments.map((apt, index) => {
                return (
                  <div className="contentRow" key={index}>
                    <div className="contentItem">
                      <p className="value">Date</p>
                      <p className="label">{new Date(apt.date).toLocaleDateString()}</p>
                    </div>
                    <div className="contentItem">
                      <p className="value">Time</p>
                      <p className="label">{apt.start_time + "-" + apt.end_time}</p>
                    </div>
                    <VideocamIcon />
                  </div>
                );
              })}
        </ContentBox>
      </div>
    </div>
  );
};

export default ClientDashHome;
