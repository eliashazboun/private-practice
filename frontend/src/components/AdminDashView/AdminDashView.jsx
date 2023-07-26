import React, { useEffect, useState } from 'react'
import './AdminDashView.scss'

import Clients from '../../pages/Clients'
import Profile from '../../pages/Profile'
import useFetch from '../../hooks/useFetch.js'
import ClipLoader from "react-spinners/ClipLoader";


const AdminDashView = ({selected}) => {
    const [view, setView] = useState(selected)

    const [clientId, setClientId]= useState('none')
    const {data:allClient, isLoading:isLoadingAllClients, error:allClientError} = useFetch(`/api/clients`)

    useEffect(()=>{
        setView(selected)
    },[selected])

  return (
    <div className='adminDashView'>
        {(() => {
            switch(view){
                case 'client':
                    return (isLoadingAllClients 
                    ? "Loading..."
                    : <Clients setView={setView} setClientId={setClientId} allClients={allClient} />)
                case 'appointment':
                    return <h1>Appointment</h1>
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