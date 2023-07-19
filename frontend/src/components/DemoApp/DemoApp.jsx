import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import AppointmentInput from "../AppointmentInput/AppointmentInput";
import './DemoApp.scss'

export default class DemoApp extends React.Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
  }

  calendarComponentRef = React.createRef();

  state = {
    calendarWeekends: true,
    calendarEvents: [],
  };

  //Updates the calendar with the new appointment
  async handler() {
    let appointments;
    const events = [];

    const response = await fetch("/api/appointments");
    const json = await response.json();

    if (response.ok) {
      appointments = json;

      appointments.forEach((appointment) => {
        let startDate = appointment.date + " " + appointment.start_time;
        let endDate = appointment.date + " " + appointment.end_time;

        startDate = new Date(startDate);
        endDate = new Date(endDate);

        const newEvent = {
          id: appointment._id,
          title: appointment.title,
          start: startDate,
          end: endDate,
        };
        events.push(newEvent);
      });
      this.setState({ calendarEvents: events });
    }
  }

  //Populate the calendar with the appointments
  async componentDidMount() {
    let appointments;
    const events = [];

    const response = await fetch("/api/appointments/"); //TODO REMOVE THIS AND USE .ENV
    const json = await response.json();

    if (response.ok) {
      appointments = json;

      appointments.forEach((appointment) => {
        let startDate = appointment.date + " " + appointment.start_time;
        let endDate = appointment.date + " " + appointment.end_time;

        startDate = new Date(startDate);
        endDate = new Date(endDate);
        let newEvent = {
          id: appointment._id,
          title: appointment.title,
          start: startDate,
          end: endDate,
          extendedProps: { type: "Appointment" },
        };
        events.push(newEvent);
      });
      this.setState({ calendarEvents: events });
    }
  }

  render() {
    return (
      <div className="demoapp">
        <div className="input">
          <AppointmentInput
          handler={this.handler}
          id={this.props.id}
          name={this.props.name}
        />
        </div>
        <div className="calendar">
          <FullCalendar
            initialView="timeGridDay"
            headerToolbar={{ center: "title", left: "" }}
            plugins={[timeGridPlugin, interactionPlugin]}
            slotMinTime={"06:00:00"}
            slotMaxTime={"23:00:00"}
            height={"auto"}
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            events={this.state.calendarEvents}
          />
        </div>
        
      </div>
    );
  }
}
