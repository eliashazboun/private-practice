import { useState} from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import DeleteIcon from '@mui/icons-material/Delete';

const MySwal = withReactContent(Swal)


const AppointmentCard = (props) => {
    const [isPaid, setIsPaid] = useState(false);

    const handlePayment = () => {
        if(isPaid){
            setIsPaid(false)
        }else{
            setIsPaid(true);
        }
    };

    const confirmPopup = () => {
      MySwal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          deleteAppointment()
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    }

    const deleteAppointment = async () => {
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ })
      };

      try{
        const appt = await fetch(`/api/appointments/${props.appointment._id}`,requestOptions)
        const apptJson = await appt.json()
       
        await props.apptHandler(props.state, apptJson)
      }catch(err){
        console.log(err)
      }
    }
  
    return (
          <tr style={{backgroundColor:`${props.color}`}}>
						<td>
							<div className="user-info">
							  <h5>{props.client.first_name+' '+props.client.last_name}</h5>
							</div>
						</td>

						<td>
                <div className={`${props.appointment.isPaid ? 'paid' : 'unpaid'}`} onClick={handlePayment}>
                  <div className="status">{props.appointment.isPaid ? 'PAID' : 'UNPAID'}</div>
                  
                </div>
						</td>

						<td>
							<h5>{new Date((props.appointment.date).replace('-','/')).toLocaleDateString()}</h5>
						</td>
						<td>
							<h5>{props.appointment.start_time + ' - ' + props.appointment.end_time}</h5>
						</td>

						<td>
							<h5>{props.client.phone}</h5>
						</td>

            <td>
              <DeleteIcon className="icon" onClick={confirmPopup}/>
               
            </td>

					</tr>
    );
  };
  
  export default AppointmentCard;
  