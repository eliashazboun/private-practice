import React, { useState } from 'react'
import './AdminDashView.scss'

import Clients from '../../pages/Clients'
import Profile from '../../pages/Profile'

const AdminDashView = ({view, setView}) => {
    const [clientId, setClientId]= useState()
    
  return (
    <div className='adminDashView'>
        {(() => {
            switch(view){
                case 'client':
                    return <Clients setView={setView} setClientId={setClientId}/>
                case 'appointment':
                    return <h1>Appointment</h1>
                case 'video':
                    return <h1>Video</h1>
                case 'profile':
                    return <Profile clientId={clientId} setView={setView}/>
                default:
                    return <h1>Default</h1>
            }
        })()}
        

        
    </div>
  )
}

export default AdminDashView