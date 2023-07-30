import React, { createRef, useEffect, useState } from "react";
import "./Calendar.scss";
import CalendarSideNav from "../../components/CalendarSideNav/CalendarSideNav";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import dayjs from "dayjs";
import Modal from "../../components/Modal/Modal";
import { formatTime } from "../../helpers/formatTime";

const Calendar = ({
  allClients,
  allAppointments,
  editAppointments,
  addAppointments,
  deleteAppointments,
}) => {
  const calendarRef = createRef();

  // const [appointments, setAppointments] = useState(allAppointments)
  const [events, setEvents] = useState([]);
  const [createAppointmentView, setCreateAppointmentView] = useState({
    open: false,
    data: null,
  });
  const [appointmentInfoView, setAppointmentInfoView] = useState({
    open:false,
    data:null
  })
  const [editAppointmentView, setEditAppointmentView] = useState({
    open: false,
    data: null,
    change: null,
  });
  const [showModal, setShowModal] = useState(false);
  const [prevEvent, setPrevEvent] = useState();

  const handleDateClick = (e) => {
    //Allows date clicking to change input values when edit is open
    let calendarApi = calendarRef.current.getApi();
    if (e.view.type === "dayGridMonth") {
      calendarApi.changeView("timeGridDay", e.date);
    } else {
      if (editAppointmentView.open) {
        const appointmentLength =
          dayjs(editAppointmentView.data.end).get("hour") -
          dayjs(editAppointmentView.data.start).get("hour");
        let updatedAppointment = { ...editAppointmentView.data };
        updatedAppointment.start = dayjs(e.date).toISOString();
        updatedAppointment.end = dayjs(e.date)
          .add(appointmentLength, "hour")
          .toISOString();
        setEditAppointmentView({
          open: true,
          data: editAppointmentView.data,
          change: updatedAppointment,
        });
      } else {
        handleCreateOpen(e);
      }
    }
  };

  const handleEventClick = (e) => {
    if (prevEvent) {
      prevEvent.el.style.backgroundColor = "#3788D8";
    }
    setPrevEvent(e);

    e.el.style.backgroundColor = "red";
    handleCreateClose();
    setAppointmentInfoView({
        open:true,
        data:e.event.toPlainObject()
    })

    // setEditAppointmentView({
    //   open: true,
    //   data: e.event.toPlainObject(),
    //   change: null,
    // });
  };

  const editEvent = (id, start, end) => {
    let calendarApi = calendarRef.current.getApi();
    const event = calendarApi.getEventById(id);
    event.setStart(start);
    event.setEnd(end);
    editAppointments(id, start, end);
  };
  const handleCreateOpen = (e) => {
    handleEditClose();
    setCreateAppointmentView({ open: true, data: e });
  };

  const handleCreateClose = () => {
    setCreateAppointmentView({ open: false, data: null });
  };

  const handleAppointInfoClose = () => {
    if (prevEvent) {
        prevEvent.el.style.backgroundColor = "#3788D8";
      }
    setAppointmentInfoView({
        open:false,
        data:null
    })
  }

  const handleEditOpen = (data) => {
    setEditAppointmentView({
        open:true,
        data:data
    })

    setAppointmentInfoView({
        open:false,
        data:null
    })

  }

  const handleEditClose = (del) => {
    console.log(del);
    if (del === true) {
      setEditAppointmentView({ open: false, data: null });
      setPrevEvent(null);
    } else {
      if (prevEvent) {
        prevEvent.el.style.backgroundColor = "#3788D8";
        setEditAppointmentView({ open: false, data: null });
        setPrevEvent(null);
      }
    }
  };

  const gotoDate = (date) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(date);
  };

  const slotSelect = (start) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.select(start);
  };

  const slotUnselect = () => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.unselect();
  };


  const populateEvents = () => {
    setEvents([]);
    allAppointments.forEach((appointment) => {
      console.log(appointment.date);
      const startDate = new Date(
        appointment.date + " " + appointment.start_time
      );
      const endDate = new Date(appointment.date + " " + appointment.end_time);

      const event = {
        id: appointment._id,
        title: appointment.title,
        start: startDate,
        end: endDate,
      };
      setEvents((events) => [...events, event]);
    });
  };

  useEffect(() => {
    populateEvents();
  }, [allAppointments]);



  return (
    <div className="calendar">
      <div className="wrapper">
        <CalendarSideNav
          allClients={allClients}
          gotoDate={gotoDate}
          slotSelect={slotSelect}
          slotUnselect={slotUnselect}
          appointmentInfoView={appointmentInfoView}
          createAppointmentView={createAppointmentView}
          editAppointmentView={editAppointmentView}
          handleAppointInfoClose={handleAppointInfoClose}
          handleCreateOpen={handleCreateOpen}
          handleCreateClose={handleCreateClose}
          handleEditOpen={handleEditOpen}
          handleEditClose={handleEditClose}
          editEvent={editEvent}
          editAppointments={editAppointments}
          addAppointments={addAppointments}
          deleteAppointments={deleteAppointments}
        />
        <FullCalendar
          unselectAuto={false}
          events={events}
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
            meridiem: true,
          }}
          allDaySlot={false}
          selectable={true}
          ref={calendarRef}
          initialView="timeGridDay"
          headerToolbar={{
            start: "dayGridMonth,timeGridWeek,timeGridDay",
            center: "title",
          }}
          plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
          slotMinTime={"06:00:00"}
          slotMaxTime={"22:00:00"}
          eventBackgroundColor="#3788D8"
          eventOverlap={false}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          viewWillUnmount={() => handleCreateClose()}
        />
        <Modal
          handleOpen={showModal}
          handleClose={() => setShowModal((showModal) => !showModal)}
        >
          <h1>Success</h1>
          <button onClick={() => setShowModal((showModal) => !showModal)}>
            close
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default Calendar;
