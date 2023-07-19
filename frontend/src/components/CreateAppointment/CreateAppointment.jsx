import * as React from 'react';
import DemoApp from '../DemoApp/DemoApp';

export default class CreateAppointment extends React.Component {

  render(){
    
    return(
      <div className='view'>
        <DemoApp  name={this.props.name} id={this.props.id}/>
      </div>
    )
  }
}


