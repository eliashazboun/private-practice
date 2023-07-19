import { useState } from "react";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import * as React from "react";

import "./AppointmentInput.scss";

const AppointmentInput = ({ handler, id, name }) => {
  const [start_time, setStartTime] = useState(null);
  const [end_time, setEndTime] = useState(null);
  const [date, setDate] = useState(null);

  const [startError, setStartError] = useState(false);
  const [endError, setEndError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [createError, setCreateError] = useState(false);
  const [overLapError, setOverLapError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!start_time.isValid()) {
      setStartError(true);
      return;
    } else {
      setStartError(false);
    }

    if (!end_time.isValid()) {
      setEndError(true);
      return;
    } else {
      setEndError(false);
    }

    if (!date.isValid()) {
      setDateError(true);
      return;
    } else {
      setDateError(false);
    }

    if (start_time.isAfter(end_time)) {
      setTimeError(true);
      return;
    } else {
      setTimeError(false);
    }

    const start = start_time.$d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const end = end_time.$d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const unformattedDate = date.$d.toLocaleDateString();

    let formattedDate = new Date(unformattedDate),
      month = "" + (formattedDate.getMonth() + 1),
      day = "" + formattedDate.getDate(),
      year = formattedDate.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    formattedDate = [year, month, day].join("-");

    try {
      const response = await fetch(
        `/api/appointments/${start}/${end}/${formattedDate}`
      );

      if (response.status === 400) {
        setOverLapError(true);
        return;
      } else {
        setOverLapError(false);
      }
    } catch (ex) {
      console.log(ex);
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        start_time: start,
        end_time: end,
        date: formattedDate,
        client_id: id,
        title: name,
      }),
    };

    try {
      setCreateError(false);
      await fetch("/api/appointments", requestOptions);
      clear();
      handler();
    } catch (ex) {
      setCreateError(true);
      console.log(ex);
    }
  };

  const clear = () => {
    setStartTime(null);
    setEndTime(null);
    setDate(null);
  };

  return (
    <div className="create-appointment">
      <form onSubmit={handleSubmit} className="form">
        <div className="title">
          <h2>Create Appointment for {name} </h2>
        </div>
        <div className="picker">
          <TimePicker
            label="Start Time"
            value={start_time}
            onChange={(e) => {
              setStartTime(e);
            }}
            minutesStep={15}
            slotProps={{
              textField: { error: startError || timeError, required: true },
            }}
            skipDisabled={true}
          />
        </div>

        <div className="picker">
          <TimePicker
            label="End Time"
            value={end_time}
            onChange={(e) => {
              setEndTime(e);
            }}
            minutesStep={15}
            skipDisabled={true}
            slotProps={{
              textField: { error: endError || timeError, required: true },
            }}
          />
        </div>

        <div className="picker">
          <DatePicker
            label="Date"
            disablePast={true}
            value={date}
            onChange={(e) => {
              setDate(e);
            }}
            slotProps={{ textField: { error: dateError, required: true } }}
          />
        </div>

        <button type="submit" id="submit">
          Create
        </button>
      </form>

      {startError && <p id="error">Please select valid start time.</p>}
      {endError && <p id="error">Please select valid end time.</p>}
      {dateError && <p id="error">Please select valid date.</p>}
      {timeError && <p id="error">Start time must be before end time</p>}
      {createError && <p id="error">Unknown Error, try again.</p>}
      {overLapError && <p id="error">Appointment slot already taken.</p>}
    </div>
  );
};

export default AppointmentInput;
