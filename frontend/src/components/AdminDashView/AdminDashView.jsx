import React, { useEffect, useState } from 'react'
import './AdminDashView.scss'

import Clients from '../../pages/Clients'
import Profile from '../../pages/Profile'
import Calendar from '../../pages/Calendar/Calendar'

import useFetch from '../../hooks/useFetch'


const AdminDashView = ({selected,allClients}) => {
    const [view, setView] = useState(selected)
    const [clientId, setClientId]= useState('none')

    const {data:allAppointments, isLoading, error} = useFetch('/api/appointments')


    useEffect(()=>{
        setView(selected)
        console.log('Rerender')
    },[selected])

  return (
    <div className='adminDashView'>
        {(() => {
            switch(view){
                case 'client':
                    return <Clients setView={setView} setClientId={setClientId} allClients={allClients} />
                case 'appointment':
                    return isLoading 
                        ? 'Loading...' 
                        : <Calendar allClients={allClients} allAppointments={allAppointments}/>
                case 'video':
                    return <h1>Video</h1>
                case 'profile':
                    return <Profile clientId={clientId} setView={setView}/>
                default:
                    return <h1>Dash</h1>
            }
        })()}
        

        
    </div>
  )
}

export default AdminDashView