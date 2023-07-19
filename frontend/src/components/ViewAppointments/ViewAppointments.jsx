import { useEffect, useState, useRef } from "react";
import AppointmentCard from "../AppointmentCard/AppointmentCard";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './ViewAppointments.scss'

const ViewAppointments = ({client}) => {
    const [appointments, setAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([])
    const [active, setActive] = useState('future')
    const dataFetched = useRef(false)

    const appointmentHandler = (state, appt) => {
        if (state === 'future'){
            setAppointments(appointments.filter(x => x._id !== appt._id ))
        }else{
            setPastAppointments(pastAppointments.filter(x => x._id !== appt._id))
        }
    };
    
    const fetchAppointments = async () => {
        if(appointments.length === 0 || pastAppointments.length === 0){
            try{
                const response = await fetch(`/api/appointments/${client._id}`);//HIDE THIS IN .ENV
                const json = await response.json();

                if (response.status === 404){
                    return;
                }
    
                const sortedJson = sortAppointments(json)
                const currDate = new Date()
                
                sortedJson.forEach(appointment => {
                    const date = appointment.date.replaceAll('-','/');
                    const appointDate = new Date(date + ' ' + appointment.end_time)

                    if(appointDate<currDate){
                        setPastAppointments(pastAppointments => [...pastAppointments, appointment])
                    }else{
                        setAppointments(appointments => [...appointments, appointment])
                    }
                })
            }catch(err){
                console.log(err,err.message)
            }
        }
    }

    const sortAppointments = (listOfAppointments) => {
        const sorted = listOfAppointments.sort((a,b) => {
            const aDate = new Date(a.date+' '+a.start_time)
            const bDate = new Date(b.date+' '+b.start_time)
            return aDate-bDate
        } )
        return sorted
    }

    useEffect(() => {
        if(dataFetched.current) return;
        dataFetched.current = true
        fetchAppointments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
            <div className="view-appointments">
                <Tabs>
                    <TabList className='tabs'>
                        <Tab className='tab' onClick={() => (setActive('future'))} style={{fontWeight:"bold"}}>Upcoming Appointments</Tab>
                        <Tab className='tab' onClick={() => (setActive('past'))} style={{fontWeight:"bold"}}>Previous Appointments</Tab>
                    </TabList>
                    <TabPanel className='panel'>
                        <h2>Upcoming Appointments</h2>
                        <table className="table">
                            <thead className="head">
                                <tr>
                                    <th>Patient</th>
                                    <th>Payment Status</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Phone</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody className="body">
                                {active === 'future' && appointments && appointments.map((appointment,index) => {
                                    return <AppointmentCard  state={active} key={index} appointment={appointment} client={client} apptHandler={appointmentHandler}/>
                                })}
                                {active === 'future' && appointments.length === 0 && <tr><td>No Appointments</td></tr>}
                            </tbody>
                        </table>
                    </TabPanel>
                    <TabPanel className='panel'>
                        <h2>Past Appointments</h2>
                        <table className="table">
                            <thead className="head">
                                <tr>
                                    <th>Patient</th>
                                    <th>Payment Status</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Phone</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody className="body">
                                {active === 'past' && pastAppointments && pastAppointments.map((appointment,index) => {
                                    return <AppointmentCard state={active} key={index} appointment={appointment} client={client} apptHandler={appointmentHandler}/>
                                })}
                                {active === 'past' && pastAppointments.length === 0 && <tr><td>No Appointments</td></tr>}
                            </tbody>
                        </table>
                    </TabPanel>
                </Tabs>
                {/* <button onClick={() => populateAppointments(client)} style={{justifyContent:"center"}}>Press Me</button> */}
            </div>

        
    )


}

export default ViewAppointments;