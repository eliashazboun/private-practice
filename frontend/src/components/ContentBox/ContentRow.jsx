import React from 'react'
import './ContentRow.scss'

const ContentRow = ({children, spacing}) => {
  return (
    <div className={`contentRow ${spacing}`}>
        {children}

    </div>
  )
}

export default ContentRow