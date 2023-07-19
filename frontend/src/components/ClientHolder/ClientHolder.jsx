import { Link } from "react-router-dom";
import "./ClientHolder.scss";
const ClientHolder = ({ clients = [] }) => {
  return (
    <div className="clients">
      <div className="header">
        <div className="item">
          <p>Name</p>
        </div>
        <div className="item">
          <p>Phone</p>
        </div>
        <div className="item">
          <p>Email</p>
        </div>
        <div className="item">
          <p>Birthday</p>
        </div>
      </div>
      {clients &&
        clients.map((client, index) => (
          <Link to="/api/profile/" state={{ clientId: client._id }} key={index}>
            <div
              className="client-details"
              key={index}
            >
              <div className="name">
                <h4>
                  {client.first_name} {client.last_name}
                </h4>
              </div>
              <div className="phone">
                <p>{client.phone}</p>
              </div>
              <div className="email">
                <p>{client.email}</p>
              </div>
              <div className="birthday">
                <p>{client.birthday}</p>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default ClientHolder;
