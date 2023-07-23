import React from 'react'
import './ContentItem.scss'

const ContentItem = ({value,label}) => {
  return (
    <div className='contentItem'>
        <p className='value'>{value}</p>
        <p className='label'>{label}</p>
    </div>
  )
}

export default ContentItem