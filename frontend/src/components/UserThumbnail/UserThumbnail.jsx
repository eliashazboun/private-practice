import React from 'react'
import './UserThumbnail.scss'

const UserThumbnail = ({name}) => {
  return (
    <div className='userThumbnail'>
        <div className="letter">
            {name && name.charAt(0).toUpperCase()}
        </div>
    </div>
  )
}

export default UserThumbnail