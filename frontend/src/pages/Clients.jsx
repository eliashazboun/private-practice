import { useEffect, useState } from "react";

import SearchBar from "../components/SearchBar/SearchBar";
import ClientHolder from "../components/ClientHolder/ClientHolder";
import './Clients.scss'

const Clients = ({setView, setClientId, allClients,flag, setFlag}) => {
  const [clients, setClients] = useState(allClients);
  const [keyword, setKeyword] = useState('');

  const updateKeyword = (keyword) => {
    const filtered = allClients.filter((client) => {
      return `${client.first_name.toLowerCase()} ${client.last_name.toLowerCase()}`.includes(
        keyword.toLowerCase()
      );
    });
    setKeyword(keyword);
    setClients(filtered);
  };
  
  const deleteClient = (deletedClient) => {
    const filtered = clients.filter((client) => client._id !== deletedClient._id)
    setClients(filtered)
  }


  return (
    <div className="Clients">
      <SearchBar keyword={keyword} onChange={updateKeyword} />
      <ClientHolder clients={clients} deleteClient={deleteClient} keyword={keyword} setView={setView} setClientId={setClientId} flag={flag} setFlag={setFlag}/>
    </div>
  );
}

export default Clients;
