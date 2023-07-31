import React from 'react'
import './Chip.scss'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Chip = ({top,middle,bottom,percent}) => {
    console.log('CHIP',percent)
  return (
    <div className='chip'>
         <div className="middle">
            {middle}
        </div>
        <div className="top">
            {top}
        </div>
       
        <div className="bottom">
            {percent 
                ? percent < 0 
                    ?<><ArrowDropDownIcon style={{color:'red'}}/>{Math.abs(percent)}% from last.</>
                    :<><ArrowDropUpIcon style={{color:'green'}}/>{percent}% from last.</>
                :''
            }
        </div>


    </div>
  )
}

export default Chip