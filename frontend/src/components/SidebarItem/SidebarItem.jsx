import React from 'react'
import './SidebarItem.scss'

const SidebarItem = ({id, onClick, title}) => {
  return (
    <div className='sidebarItem'>
        <button id={id} onClick={onClick}>{title}</button>

    </div>
  )
}

export default SidebarItem