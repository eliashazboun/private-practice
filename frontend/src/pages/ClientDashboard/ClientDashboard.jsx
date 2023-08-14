import "./ClientDashboard.scss";
import {Link, Outlet} from "react-router-dom"


const ClientDashboard = () => {

  return (
    <div className="clientDashboard">
      <div className="left">
        <h1>Client Dash</h1>
        <Link to='/api/clientdash/home'> <button className="button-green">Home</button></Link>
        <Link to='/api/clientdash/info'> <button className="button-green">Info</button></Link>
        <Link to='/api/clientdash/payments'> <button className="button-green">Payments</button></Link>
      </div>
      <div className="right">

        <Outlet/>
      </div>

    </div>
    
  );
}

export default ClientDashboard;
