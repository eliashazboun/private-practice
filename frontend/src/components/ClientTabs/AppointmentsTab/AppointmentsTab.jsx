import React, { useEffect, useState } from 'react'
import './AppointmentsTab.scss'
import TBI from '../../TBI/TBI'
import useFetch from '../../../hooks/useFetch'
import ContentBox from '../../ContentBox/ContentBox'

const AppointmentsTab = ({client}) => {
  const {data, isLoading} = useFetch(`api/appointments/${client._id}`)
  const [appointments,setAppointments] = useState([])

  const timeToInteger = (string) => {
    let [time, meridiam] = string.toUpperCase().split(" ");
    time = Number(time.split(":")[0]);
    if (meridiam === "PM") {
      return time + 12;
    }
    return time;
  };

  useEffect(() => {
    if (isLoading) return;
    if (data.length > 0){
      const sortedAppointments = data.sort((a, b) => timeToInteger(a.start_time) - timeToInteger(b.start_time));
      sortedAppointments.sort((a, b) => new Date(a.date) - new Date(b.date));
      setAppointments(sortedAppointments)
    }else{
      setAppointments(data)
    }
  },[data])

  return (
    <div className='appointmentsTab'>
      <ContentBox heading={`Appointments for ${client.first_name}`}>
        {isLoading ? 'Loading...' : appointments.length > 0 ? appointments.map((apt,index) => {
          return (
            <div className='contentRow'>
              <div className="contentItem">
                <p className="label">Date</p>
                <p className="value">{new Date(apt.date).toLocaleDateString()}</p>
              </div>
              
              <div className="contentItem">
                <p className="label">Time</p>
                <p className="value">{apt.start_time + "-" + apt.end_time}</p>
              </div>
              <div className="contentItem">
                <p className="label">Payment Status</p>
                <p className="value">{apt.isPaid ? <p className='paid'>Paid</p> : <p className='unpaid'>Not Paid</p>}</p>
              </div>
              
            </div>)})
        : 'No appointments'}

      </ContentBox>
     
   
    </div>
  )
}

export default AppointmentsTab