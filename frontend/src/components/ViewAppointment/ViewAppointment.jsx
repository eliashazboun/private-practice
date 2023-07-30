import React from 'react'
import './ViewAppointment.scss'
import { formatTime } from '../../helpers/formatTime'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ViewAppointment = ({data,handleEditOpen,handleAppointInfoClose}) => {
  console.log(data)
  return (
    <div className='viewAppointment'>
      <h2>Appointment Information</h2>
      <br/>
        <h3>{data.title}</h3>
        <h3>{formatTime(data.start)} - {formatTime(data.end)} </h3>
        <h3>{new Date(data.start).toLocaleDateString()}</h3>
        <br/>
        <div className="buttons">
          <button className='button-blue' onClick={() => handleEditOpen(data)}>Edit</button>
          <button className='button-red' onClick={handleAppointInfoClose}>Cancel</button>
        </div>
    </div>
  )
}

export default ViewAppointment