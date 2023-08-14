import React from 'react'
import SidebarItem from '../SidebarItem/SidebarItem'
import './Sidebar.scss'

const Sidebar = ({clickHandler, selected}) => {

    return (
    <div className='sidebar'>
        <div className="top">
            <img src={require("../../pictures/sitelogo.png")} alt="" />

        </div>
       
        <div className="bottom">
            <SidebarItem id='dash' title='Dashboard' clickHandler={clickHandler} selected={selected}></SidebarItem>
            <SidebarItem id='client' title='Clients' clickHandler={clickHandler} selected={selected}></SidebarItem>
            <SidebarItem id='appointment' title='Appointments' clickHandler={clickHandler} selected={selected}></SidebarItem>
            <SidebarItem id='video' title='Video' clickHandler={clickHandler} selected={selected}></SidebarItem>

        </div>


    </div>
  )
}

export default Sidebar