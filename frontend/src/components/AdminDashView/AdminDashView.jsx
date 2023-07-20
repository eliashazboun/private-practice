import React from 'react'
import './AdminDashView.scss'

const AdminDashView = ({view}) => {
  return (
    <div className='adminDashView'>
        {(() => {
            switch(view){
                case 'client':
                    return <h1>Client</h1>
                case 'appointment':
                    return <h1>Appointment</h1>
                case 'video':
                    return <h1>Video</h1>
                default:
                    return <h1>Default</h1>
            }
        })()}
        

        
    </div>
  )
}

export default AdminDashView