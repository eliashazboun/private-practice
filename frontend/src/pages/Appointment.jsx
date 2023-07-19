import { useEffect, useState} from "react"
import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import dayGridPlugin from "@fullcalendar/daygrid"

const Appointment = () => {
    const [calendarEvents, setCalendarEvents] = useState([]);

    const fetchEvents = async() => {

        let appointments;
        const events = []
      
        const response = await fetch("/api/appointments/");//TODO REMOVE THIS AND USE .ENV
        const json = await response.json();
      
        if (response.ok){
          appointments = json;
      
          appointments.forEach((appointment) => {
            let startDate = appointment.date +" "+appointment.start_time
            let endDate = appointment.date +" "+appointment.end_time
      
            startDate = new Date(startDate)
            endDate = new Date(endDate)
            let newEvent = {
                id: appointment._id,
                title: appointment.title, 
                start: startDate,
                end: endDate,
                extendedProps:{type: 'Appointment'},
            }
            events.push(newEvent)
        });
        setCalendarEvents(events)
        }
      }
    useEffect(()=>{
        fetchEvents()
    },[])
   

    return(
        <div className="Appointments">
            <h1>Appointments Page!</h1>
            <FullCalendar
            initialView="timeGridDay"
            headerToolbar={{start: 'dayGridMonth,timeGridWeek,timeGridDay',center: 'title' }}
            plugins={[timeGridPlugin, interactionPlugin,dayGridPlugin]}
            slotMinTime={'06:00:00'}
            slotMaxTime={'23:00:00'}
            events={calendarEvents}/>
        </div>
    )
}

export default Appointment