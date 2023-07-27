import { useState,useEffect } from "react";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import * as React from "react";
import dayjs from 'dayjs'
import { Autocomplete } from "@mui/material";
import TextField from '@mui/material/TextField';
import { formatTime } from "../../helpers/formatTime";
import { formatDate } from "../../helpers/formatDate";


import "./CreateAppointment.scss";


const CreateAppointment = ({ data, allClients, slotSelect, gotoDate, updateAppointments }) => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [date, setDate] = useState(null);
  const [clients, setClients] = useState([])
  const [selectedClient, setSelectedClient] = useState({id:null,name:null})

  const [timeError, setTimeError] = useState(false);
  const [createError, setCreateError] = useState(false);
  const [overLapError, setOverLapError] = useState(false);

  const handleStartTimeChange = (e) => {
    setStartTime(new Date(e))
    console.log(new Date(e))
  }

  const handleEndTimeChange = (e) => {
    setEndTime(new Date(e))
    console.log(new Date(e))
  }

  const handleDateChange = (e) => {
    gotoDate(new Date(e.$d))
    slotSelect(new Date(e.$d.toDateString()))
  }

  const handleClientSelect = (event,newValue) => {
    setSelectedClient({id:newValue?.id,name:newValue?.label})
  }

  const formatClients = () => {
    allClients.forEach((client,index) => {
      console.log(index, client._id)
      const slot = {
        label:client.first_name + ' ' + client.last_name,
        id:client._id
      }
      setClients(clients => [...clients, slot])
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(endTime.$d)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title:selectedClient.name,
        date:formatDate(date),
        start_time:formatTime(startTime.$d),
        end_time:formatTime(endTime.$d),
        client_id:selectedClient.id
      }),
    };

    try{
      const response = await fetch('/api/appointments',requestOptions)
      if (response.ok){
        setOverLapError(false)
        const res = await response.json()
        updateAppointments(res)
      }else{
        setOverLapError(true)
      }
     
    }catch(err){
      console.log(err)
    }
  }


  useEffect(() => {
    setStartTime(dayjs(data.date))
    setEndTime(dayjs(data.date).add(1,'hour'))
    setDate(dayjs(data.date))
  }, [data])

  useEffect(() => {
    formatClients()
  },[])


  return (
    <div className="create-appointment">
      <h2>Create Appointment</h2>

      <div className="wrapper">

      <form onSubmit={handleSubmit} className="form">
          <TimePicker
            label="Start Time"
            value={startTime}
            onChange={handleStartTimeChange}
            minutesStep={15}
            skipDisabled={true}
            className="picker"
          />

          <TimePicker
            label="End Time"
            value={endTime}
            onChange={handleEndTimeChange}
            minutesStep={15}
            
            skipDisabled={true}
            className="picker"
          />

          <DatePicker
            label="Date"
            value={date}
            onChange={handleDateChange}
            
            className="picker"

          />

          <Autocomplete
          disablePortal
          options={clients}
          renderInput={(params) => <TextField {...params} label="Client"  /> }
          onChange={handleClientSelect}
          />
        <button type="submit" id="submit">Create</button>
        {timeError && <p id="error">Start time must be before end time</p>}
        {createError && <p id="error">Unknown Error, try again.</p>}
        {overLapError && <p id="error">Appointment slot already taken.</p>} 
      </form>

      
      </div>

    </div>
  );
};

export default CreateAppointment;
