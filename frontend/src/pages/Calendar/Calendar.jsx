import React, { createRef, useEffect, useState } from "react";
import "./Calendar.scss";
import CalendarSideNav from "../../components/CalendarSideNav/CalendarSideNav";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import dayjs from "dayjs";
import Modal from "../../components/Modal/Modal";
import CreateAppointment from "../../components/CreateAppointment/CreateAppointment";
import EditAppointment from "../../components/EditAppointment/EditAppointment";

const Calendar = ({ allClients, allAppointments, editAppointments, addAppointments, deleteAppointments }) => {
  const [createAppointmentView, setCreateAppointmentView] = useState({ open: false, data: null });
  const [editAppointmentView, setEditAppointmentView] = useState({ open: false, data: null, change: null });
  
    const [showModal, setShowModal] = useState(false);
    const [prevEvent, setPrevEvent] = useState();
    
    const [allEvents, setAllEvents] = useState([]);
    const [currentViewEvents, setCurrentViewEvents]=useState([])
    const [eventsRightAligned, setEventsRightAligned] = useState(false)
    
    const calendarRef = createRef();

    const handleDateClick = (e) => {
      let calendarApi = calendarRef.current.getApi();
      
        if (e.view.type === "dayGridMonth") calendarApi.changeView("timeGridDay", e.date);
        else handleCreateOpen(e);
    };
    
    const handleEventClick = (e) => {
        if (prevEvent) prevEvent.el.style.backgroundColor = "#3788D8";
        e.el.style.backgroundColor = "red";
    
        setPrevEvent(e);
        handleEditOpen(e)
    
    };

    const handleDateChange = (e) => {
      const appointmentLength = dayjs(editAppointmentView.data.end).get("hour") - dayjs(editAppointmentView.data.start).get("hour");

        let updatedAppointment = { ...editAppointmentView.data };

        updatedAppointment.start = dayjs(e).toISOString();
        updatedAppointment.end = dayjs(e).add(appointmentLength, "hour").toISOString();

        setEditAppointmentView({open: true, data: editAppointmentView.data, change: updatedAppointment,});
    };

    const alignEvents = () => {
      currentViewEvents.map((event) => {
        return event.el.style.textAlign = eventsRightAligned ? 'left' : 'right'
      })

      setEventsRightAligned(prev => !prev)

    }


    const editEvent = (id, start, end) => {
        let calendarApi = calendarRef.current.getApi();
        const event = calendarApi.getEventById(id);
        event.setStart(start);
        event.setEnd(end);
        editAppointments(id, start, end);
    };

    const handleCreateOpen = (e) => {
        if (e.view.type === "timeGridDay"){
          alignEvents()
        } 
        setCreateAppointmentView({ open: true, data: e });
        setShowModal((prev) => !prev);
    };

    const handleCreateClose = () => {
        if (eventsRightAligned){alignEvents()}
        setCreateAppointmentView({ open: false, data: null });
        setShowModal((prev) => !prev);
    };

    const handleEditOpen = (e) => {
      if (e.view.type === "timeGridDay"){
        alignEvents()
      }
      setEditAppointmentView({ open: true, data: e.event.toPlainObject() });
      setShowModal((prev) => !prev);

    }

    const handleEditClose = (del) => {
        if (del === true) {
            setEditAppointmentView({ open: false, data: null });
            setPrevEvent(null);
        } 

        if (prevEvent) {
            prevEvent.el.style.backgroundColor = "#3788D8";
            setEditAppointmentView({ open: false, data: null });
            setShowModal((prev) => !prev);
            setPrevEvent(null);
        }

        if(eventsRightAligned){alignEvents()}


        
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
        setAllEvents([]);
        allAppointments.forEach((appointment) => {
            const startDate = new Date(appointment.date + " " + appointment.start_time);
            const endDate = new Date(appointment.date + " " + appointment.end_time);

            const event = {
                id: appointment._id,
                title: appointment.title,
                start: startDate,
                end: endDate,
            };

            setAllEvents((events) => [...events, event]);
        });
    };

    useEffect(() => {
        populateEvents();
    }, [allAppointments]);

    return (
        <div className="calendar">

            {showModal && 
                <Modal showModal={() => setShowModal((prev) => !prev)} isOpen={showModal}>
                    {createAppointmentView.open &&( 
                        <CreateAppointment 
                            data={createAppointmentView.data} 
                            allClients={allClients} 
                            slotSelect={slotSelect} 
                            gotoDate={gotoDate} 
                            addAppointments={addAppointments} 
                            handleCreateClose={handleCreateClose} />)}
                    {editAppointmentView.open && (
                        <EditAppointment
                            data={editAppointmentView.data}
                            dateChange={handleDateChange}
                            change={editAppointmentView.change}
                            slotSelect={slotSelect}
                            gotoDate={gotoDate}
                            editAppointments={editAppointments}
                            editEvent={editEvent}
                            handleEditClose={handleEditClose}
                            deleteAppointments={deleteAppointments}
                        />
                    )}
                </Modal>}
            <div className="wrapper">
                <CalendarSideNav allClients={allClients} gotoDate={gotoDate} slotSelect={slotSelect} slotUnselect={slotUnselect} handleDateChange={handleDateChange} editEvent={editEvent} editAppointments={editAppointments} addAppointments={addAppointments} deleteAppointments={deleteAppointments} />
                <FullCalendar
                    unselectAuto={true}
                    events={allEvents}
                    eventTimeFormat={{hour: "numeric",minute: "2-digit",meridiem: true,}}
                    allDaySlot={false}
                    selectable={true}
                    ref={calendarRef}
                    initialView="timeGridDay"
                    headerToolbar={{start: "dayGridMonth,timeGridWeek,timeGridDay",center: "title",}}
                    plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
                    slotMinTime={"06:00:00"}
                    slotMaxTime={"22:00:00"}
                    eventBackgroundColor="#3788D8"
                    eventOverlap={false}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                    eventDidMount={(event) => setCurrentViewEvents((prev) => [...prev,event]) }
                />
            </div>
        </div>
    );
};

export default Calendar;
