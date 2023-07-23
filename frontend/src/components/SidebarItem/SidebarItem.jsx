import React, { useState } from 'react'
import './SidebarItem.scss'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';


const SidebarItem = ({id, clickHandler, title, selected}) => {

 
  return (
    <div className="sidebarItem" id={id}  onClick={clickHandler}>
        <div className="left" id={id} style={selected === id ? {color:'blue'}: {color:"white"}} onClick={clickHandler}>
          {id === 'video' ? <VideocamOutlinedIcon/> 
            : id === 'appointment' ? <CalendarMonthOutlinedIcon/> 
            : id === 'client' ? <PersonOutlineOutlinedIcon/>
            : <GridViewOutlinedIcon/>}
            <p id={id}  onClick={clickHandler}>{title}</p>
        </div>
        <div className="right" id={id} style={selected === id ? {backgroundColor:'blue',border:'2px solid blue'}: {color:"#3b3a48"}}  onClick={clickHandler}>

        </div>
         
    </div>
  )
}

export default SidebarItem