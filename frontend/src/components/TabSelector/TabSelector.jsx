import React, { useState } from 'react'
import './TabSelector.scss'
import TabItem from '../TabItem/TabItem'
import ClipLoader from "react-spinners/ClipLoader";


const TabSelector = ({tabs,client,isLoading}) => {

  const [active, setActive] = useState("0")
  
  const handleClick = (e) => {
    setActive(e.currentTarget.id.toString())
  }

  const View = tabs[parseInt(active)].view.type

  return (
    <div className="tabSelector">
      <div className='tabs'>
          {tabs.map((tab,index) => { return <TabItem handleClick={handleClick} info={tab} key={index} id={index} selected={index.toString() === active ? true : false}></TabItem>})}
      </div>
      <div className="tabView">
        {isLoading 
        ? <ClipLoader loading={isLoading} size={150} aria-label="Loading Spinner" data-testid="loader"/> 
        : <View client={client}/>
}
      </div>
    </div>

  )
}

export default TabSelector