import React, { useContext, useEffect, useRef } from 'react'
import './ContentItem.scss'

import { EditContext } from './ContentRow'

const ContentItem = ({value,label}) => {
  const handler = useContext(EditContext)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  },[handler.editable])
  return (
    <div className='contentItem'>
      <div className="wrapper">

        <div className="contain">

          <div 
            onInput={(e) => handler.editHandler(e)} 
            suppressContentEditableWarning={true} 
            contentEditable={handler.editable} 
            ref={inputRef} 
            className={handler.editable ? `value edit ${handler.error ? "error":""}` : "value"}>
              {value}
            </div>
            {handler.error && <span className='errorM'>Phone number already on record</span>}
        </div>

        <div className='label'>{label}</div>
    </div>
    
    </div>

  )
}

export default ContentItem