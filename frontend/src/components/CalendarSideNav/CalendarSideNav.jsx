import React from "react";
import "./CalendarSideNav.scss";
import { DateCalendar } from "@mui/x-date-pickers";

const CalendarSideNav = ({
  slotSelect,
  slotUnselect,
  gotoDate,
}) => {
  return (
    <div className="calendarSideNav">
      <div className="wrapper">
      <DateCalendar
            onChange={(e) => {
              gotoDate(e.$d);
              slotSelect(new Date(e.$d.toDateString()));
            }}
          />
       
      </div>
      <div className="bottom" onClick={slotUnselect}></div>
    </div>
  );
};

export default CalendarSideNav;


