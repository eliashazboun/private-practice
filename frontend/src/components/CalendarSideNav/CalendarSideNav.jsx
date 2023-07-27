import React from "react";
import "./CalendarSideNav.scss";
import { DateCalendar } from "@mui/x-date-pickers";
import CreateAppointment from "../CreateAppointment/CreateAppointment";
import CloseIcon from "@mui/icons-material/Close";
import EditAppointment from "../EditAppointment/EditAppointment";


const CalendarSideNav = ({
    gotoDate,
    createAppointment,
    handleCreateClose,
    editAppointment,
    handleEditClose,
    allClients,
    slotSelect,
    slotUnselect,
    updateAppointments,
}) => {

  return (
    <div className="calendarSideNav" >
      <div className="wrapper">
        {createAppointment.open ? 
            <> <CreateAppointment data={createAppointment.data} allClients={allClients} slotSelect={slotSelect} gotoDate={gotoDate} updateAppointments={updateAppointments} /><CloseIcon onClick={handleCreateClose} /> </>: 
        editAppointment.open 
            ? <><EditAppointment/> <CloseIcon onClick={handleEditClose}/></>
            : <DateCalendar onChange={(e) => {gotoDate(e.$d);slotSelect(new Date(e.$d.toDateString()))}} />
        }
      </div>
      <div className="bottom" onClick={slotUnselect}>

      </div>
    </div>
  );
};

export default CalendarSideNav;
