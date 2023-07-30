import React from "react";
import "./CalendarSideNav.scss";
import { DateCalendar } from "@mui/x-date-pickers";
import CreateAppointment from "../CreateAppointment/CreateAppointment";
import CloseIcon from "@mui/icons-material/Close";
import EditAppointment from "../EditAppointment/EditAppointment";
import ViewAppointment from '../ViewAppointment/ViewAppointment'

const CalendarSideNav = ({
  allClients,
  slotSelect,
  slotUnselect,
  gotoDate,
  createAppointmentView,
  editAppointmentView,
  appointmentInfoView,
  handleAppointInfoClose,
  handleCreateClose,
  handleEditOpen,
  handleEditClose,
  editAppointments,
  addAppointments,
  deleteAppointments,
  editEvent,
}) => {
  return (
    <div className="calendarSideNav">
      <div className="wrapper">
        {createAppointmentView.open ? (
          <>
            <CreateAppointment
              data={createAppointmentView.data}
              allClients={allClients}
              slotSelect={slotSelect}
              gotoDate={gotoDate}
              addAppointments={addAppointments}
              handleCreateClose={handleCreateClose}
            />
            <CloseIcon onClick={handleCreateClose} />
          </>
        ) : editAppointmentView.open ? (
          <>
            <EditAppointment 
              data={editAppointmentView.data} 
              change={editAppointmentView.change}
              slotSelect={slotSelect}
              gotoDate={gotoDate}
              editAppointments={editAppointments}
              editEvent={editEvent}
              handleEditClose={handleEditClose}
              deleteAppointments={deleteAppointments}

              /> 
              <CloseIcon onClick={handleEditClose} style={{cursor:'pointer'}} />
          </>
        ) : appointmentInfoView.open ? (
          <>
            <ViewAppointment
              data={appointmentInfoView.data}
              handleEditOpen={handleEditOpen}
              handleAppointInfoClose={handleAppointInfoClose}
            
            />
            <CloseIcon onClick={handleAppointInfoClose} style={{cursor:'pointer'}}/>
          </>
          ): (
          <DateCalendar
            onChange={(e) => {
              gotoDate(e.$d);
              slotSelect(new Date(e.$d.toDateString()));
            }}
          />
        )}
      </div>
      <div className="bottom" onClick={slotUnselect}></div>
    </div>
  );
};

export default CalendarSideNav;
