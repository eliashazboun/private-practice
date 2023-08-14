import React, { useEffect, useState } from "react";
import "./AdminDash.scss";
import ContentBox from "../../components/ContentBox/ContentBox";
import ContentRow from "../../components/ContentBox/ContentRow";
import ContentItem from "../../components/ContentBox/ContentItem";
import VideocamIcon from "@mui/icons-material/Videocam";
import dayjs from "dayjs";
import Chip from "../../components/Chip/Chip";
import { Button } from "@mui/material";

var isBetween = require("dayjs/plugin/isBetween");
var isToday = require("dayjs/plugin/isToday");

dayjs.extend(isToday);
dayjs.extend(isBetween);

const AdminDash = ({ allAppointments }) => {
  const [todaysAppointments, setTodaysAppointments] = useState(null);
  const [futureAppointments, setFutureAppointments] = useState(null);
  const [pastAppointments, setPastAppointments] = useState(null);
  const [weekCount, setWeekCount] = useState(0);
  const [prevWeekCount, setPrevWeekCount] = useState(0);

  //Takes in appointment object
  const isToday = (input) => {
    return dayjs(input.date).isToday();
  };

  const isBetween = (input, days) => {
    const today = dayjs().startOf("day");
    const nextInterval = today.add(days, "day").endOf("day");
    const date = dayjs(input.date).startOf("day").add(1, "minute");
    return date.isBetween(today, nextInterval);
  };

  const isFuture = (input) => {
    return dayjs(input.date).isAfter(dayjs());
  };

  const timeToInteger = (string) => {
    let [time, meridiam] = string.toUpperCase().split(" ");
    time = Number(time.split(":")[0]);
    if (meridiam === "PM") {
      return time + 12;
    }
    return time;
  };

  useEffect(() => {
    let past = [],
      present = [],
      future = [];

    const sortedAppointments = allAppointments.sort((a, b) => timeToInteger(a.start_time) - timeToInteger(b.start_time));
    sortedAppointments.sort((a, b) => new Date(a.date) - new Date(b.date));

    sortedAppointments.forEach((appointment) => {
      if (isBetween(appointment, 7)) {
        setWeekCount((prev) => prev + 1);
      }

      if (isBetween(appointment, -7)) {
        setPrevWeekCount((prev) => prev + 1);
      }

      if (isToday(appointment)) {
        present.push(appointment);
      } else if (isFuture(appointment)) {
        future.push(appointment);
      } else {
        past.push(appointment);
      }
    });

    setPastAppointments(past.reverse());
    setTodaysAppointments(present);
    setFutureAppointments(future);
  }, []);
  return (
    <div className="adminDash">
      <div className="even-columns">
        <div className="left">
          <ContentBox heading={"Todays Appointments"}>
            {todaysAppointments && todaysAppointments.length > 0 ? (
              todaysAppointments.map((appointment) => {
                return (
                  <ContentRow>
                    <ContentItem value={appointment.title} label={`${appointment.start_time} - ${appointment.end_time}`} />
                    {appointment.date}
                    <VideocamIcon style={{ color: "gray" }} onClick={() => console.log(isBetween(appointment, 1))} />
                  </ContentRow>
                );
              })
            ) : (
              <ContentRow>
                <ContentItem value={"No Appointments today!"} />
              </ContentRow>
            )}
          </ContentBox>

          <ContentBox heading={"Appointment Requests"}>
            <ContentRow>
              <ContentItem value={"John Doe - 8/15/2023"} label={""}>
                <p>10:00 am - 11:00 am</p>
              </ContentItem>
              <div className="buttons">
                <Button variant="contained" color="success">
                  {" "}
                  Approve
                </Button>
                <Button variant="contained" color="error">
                  {" "}
                  Decline
                </Button>
              </div>
            </ContentRow>
          </ContentBox>
          <div className="even-columns">
            {todaysAppointments && <Chip top={todaysAppointments.length} middle={"Sessions Today"} />}
            <Chip top={weekCount} middle={"Sessions this week"} percent={Math.round(((weekCount - prevWeekCount) / prevWeekCount) * 100)} />
          </div>
        </div>
        <div className="right">
          <ContentBox heading={"Upcoming Appointments"}>
            {futureAppointments && futureAppointments.length > 0 ? (
              futureAppointments.map((appointment) => {
                return (
                  <ContentRow>
                    <ContentItem value={appointment.title} label={`${appointment.start_time} - ${appointment.end_time} `} />
                    <p>{dayjs(appointment.date).format("M/D/YYYY")}</p>
                    <VideocamIcon style={{ color: "gray" }} onClick={() => console.log(isBetween(appointment, 7))} />
                  </ContentRow>
                );
              })
            ) : (
              <ContentRow>
                <ContentItem value={"No Appointments today!"} />
              </ContentRow>
            )}
          </ContentBox>
        </div>
      </div>
      <div className="even-columns"></div>
    </div>
  );
};

export default AdminDash;
