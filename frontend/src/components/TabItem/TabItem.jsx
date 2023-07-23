import React from 'react'
import './TabItem.scss'

const TabItem = ({info,handleClick,id, selected}) => {
  return (
    <div className={selected ? 'tabItem selected' : 'tabItem'} id={id} onClick={handleClick}>
        {info.icon}        
        {info.title}
    </div>
  )
}

export default TabItem