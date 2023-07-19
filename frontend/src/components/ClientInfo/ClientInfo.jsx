import './ClientInfo.scss'
const ClientInfo = ({client}) => {
    
    return(
        <div className="client-info">
            <div className="wrapper">
                <div className="item">
                    <h1>Contact</h1>
                    <p><strong>Name:</strong>{client.first_name} {client.last_name}</p>
                    <p><strong>Phone:  </strong>{client.phone}</p>
                    <p><strong>Email:  </strong>{client.email}</p>
                </div>
                <div className="item">
                    <h1>Personal</h1>
                    <p><strong>Gender:  </strong>{client.gender}</p>
                    <p><strong>Age:  </strong>{client.age}</p>
                    <p><strong>Birthday:  </strong>{client.birthday}</p>
                </div>
                <div className="item">
                    <h1>Diagnosis</h1>
                    <p><strong>Phone:  </strong>{client.phone}</p>
                    <p><strong>Email:  </strong>{client.email}</p>
                    <p><strong>Birthday:  </strong>{client.birthday}</p>
                </div>
            </div>
            
        </div>
    )
}

export default ClientInfo;