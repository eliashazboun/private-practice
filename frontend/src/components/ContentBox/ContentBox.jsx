import React from 'react'
import './ContentBox.scss'
import EditNoteIcon from '@mui/icons-material/EditNote';
import Button from '../../components/Button/Button'

const ContentBox = ({heading,children,addButton}) => {
  return (
    <div className='contentBox'>
      <div className="heading">
        <p className='title'>{heading}</p>
        {addButton && <button className='add'>+</button>}
      </div>
      <div className="content">
        {children}

      </div>

    </div>
  )
}

export default ContentBox