import React from 'react'
import './Button.scss'

const Button = ({title,id,kind, handler}) => {
  return (
    <>
      {kind === 'orange' && <button className='button-orange' id={id} onClick={handler}>{title}</button>}
      {kind === 'red' && <button className='button-red' id={id} onClick={handler}>{title}</button>}
      {kind === 'green' && <button className='button-green' id={id} onClick={handler}>{title}</button>}
      {kind === 'blue' && <button className='button-blue' id={id} onClick={handler}>{title}</button>}
    </>
    
  )
}

export default Button