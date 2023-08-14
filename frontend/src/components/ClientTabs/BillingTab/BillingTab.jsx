import React from 'react'
import './BillingTab.scss'
import TBI from '../../TBI/TBI'

const BillingTab = ({client}) => {
  return (
    <div className='billingTab'>
      <div className="even-columns">
        <div className="left">
          <h1>Charge</h1>
          <input type="number"  />
        </div>
      </div>
    </div>
  )
}

export default BillingTab