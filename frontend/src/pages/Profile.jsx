import { useEffect, useState } from "react";
import TabSelector from "../components/TabSelector/TabSelector";
import CreateAppointment from "../components/CreateAppointment/CreateAppointment";
import ViewAppointments from "../components/ViewAppointments/ViewAppointments";
import EditAppointment from "../components/EditAppointments/EditAppointment";

import ProfileTab from '../components/ClientTabs/ProfileTab/ProfileTab'
import MessagesTab from '../components/ClientTabs/MessagesTab/MessagesTab'
import AppointmentsTab from '../components/ClientTabs/AppointmentsTab/AppointmentsTab'
import RecordsTab from '../components/ClientTabs/RecordsTab/RecordsTab'
import BillingTab from '../components/ClientTabs/BillingTab/BillingTab'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FolderIcon from '@mui/icons-material/Folder';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


import './Profile.scss'

const Profile = ({clientId, setView}) => {
  const [client, setClient] = useState([]);

  const URI = `/api/profile/${clientId}`;

  
  const fetchProfile = async () => {
    try {
      const response = await fetch(URI);
      const json = await response.json();
      if (response.ok) {
        setClient(json);
      }
    } catch (err) {
      console.log(err);
    }
  };


  const tabs=[ 
    {
      title: 'Profile',
      icon: <AccountBoxIcon/>,
      view: <ProfileTab/>
    },
    {
      title: 'Messages',
      icon: <EmailIcon/>,
      view: <MessagesTab/>

    },
    {
      title: 'Appointments',
      icon: <CalendarMonthIcon/>,
      view: <AppointmentsTab/>

    },
    {
      title:'Records',
      icon: <FolderIcon/>,
      view: <RecordsTab/>

    },
    {
      title: 'Billing',
      icon: <AttachMoneyIcon/>,
      view: <BillingTab/>

    }]
  
  
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="profile">
      <div className="top">
        <ArrowBackIcon className="backArrow" onClick={() => {setView('client')}} />
        <div className="heading">
            <p>{client.first_name} {client.last_name} </p>
        </div>
      </div>
        <TabSelector
        client={client ? client : null}
        tabs={tabs}
        />
          {/* <Button title='Create Appointment' id='create' kind='green' handler={handleClick}></Button>
          <Button title='Edit Appointment' id='edit' kind='orange' handler={handleClick}></Button>
          <Button title='View Appointment' id='view' kind='blue' handler={handleClick}></Button> */}
    </div>
  );
};

export default Profile;
