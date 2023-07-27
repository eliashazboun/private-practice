import React, { createRef, useEffect, useState } from 'react'
import './Calendar.scss'
import CalendarSideNav from '../../components/CalendarSideNav/CalendarSideNav'
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import useFetch from '../../hooks/useFetch';
import { formatDate } from '../../helpers/formatDate';

const Calendar = ({allClients,allAppointments}) => {
    const calendarRef = createRef()
    const [appointments, setAppointments] = useState(allAppointments)
    const [events, setEvents] = useState([])
    const [clients, setClients] = useState(allClients)
    const [createAppointment, setCreateAppointment] = useState({open:false,data:null})
    const [editAppointment,setEditAppointment] = useState({open:false,data:null})


    const handleCreateOpen = (e) => {
        setCreateAppointment({open:true,data:e})
        console.log(createAppointment)
    }

    const handleCreateClose = () => {
        setCreateAppointment({open:false,data:null})
    }


    const handleEditOpen = (e) => {
        setEditAppointment({open:true,data:e})

    }

    const handleEditClose = (e) => {
        setEditAppointment({open:false,data:null})
    }

    const gotoDate = (date) => {
        let calendarApi = calendarRef.current.getApi()
        calendarApi.gotoDate(date)
    }

    const slotSelect = (start) => {
        let calendarApi = calendarRef.current.getApi()
        calendarApi.select(start)
    }

    const slotUnselect = () => {
        let calendarApi = calendarRef.current.getApi()
        calendarApi.unselect()
    }

    const updateAppointments = (appointment) => {
        setAppointments(appointments => [...appointments, appointment])
    }

    const populateEvents = () => {
        appointments.forEach((appointment) => {
            const startDate = new Date(appointment.date + " " + appointment.start_time);
            const endDate = new Date(appointment.date + " " + appointment.end_time);
            console.log(startDate)

            const event = {
                id: appointment._id,
                title: appointment.title,
                start: startDate,
                end: endDate,
              };
            setEvents(events => [...events,event]) 
        });
    }

    useEffect(() => {
        setAppointments(allAppointments)
        populateEvents()
    },[appointments])


  return (
    <div className='calendar'>
        <div className="wrapper">
            <CalendarSideNav 
                gotoDate={gotoDate}
                slotSelect={slotSelect}
                slotUnselect={slotUnselect}
                createAppointment={createAppointment}
                handleCreateOpen={handleCreateOpen}
                handleCreateClose={handleCreateClose}
                editAppointment={editAppointment}
                handleEditClose={handleEditClose}
                allClients={allClients}
                updateAppointments={updateAppointments}
                />
            <FullCalendar
                unselectAuto={false}
                events={events}
                allDaySlot={false}
                selectable={true}
                ref={calendarRef}
                initialView="timeGridDay"
                headerToolbar={{start: 'dayGridMonth,timeGridWeek,timeGridDay',center: 'title' }}
                plugins={[timeGridPlugin, interactionPlugin,dayGridPlugin]}
                slotMinTime={'06:00:00'}
                slotMaxTime={'23:00:00'}
                dateClick={handleCreateOpen}
                eventClick={handleEditOpen}
            />
        </div>
        
    </div>
  )
}

export default Calendar