import { useEffect, useState } from "react";

import SearchBar from "../components/SearchBar/SearchBar";
import ClientHolder from "../components/ClientHolder/ClientHolder";
import ClipLoader from "react-spinners/ClipLoader";
import './Clients.scss'

const Clients = ({setView, setClientId}) => {
  const [allClients, setAllClients] = useState([]);
  const [clients, setClients] = useState([]);
  const [keyword, setKeyword] = useState('');

  const fetchClients = async () => {
    console.log("fetch ran");

    try {
      const response = await fetch("/api/clients");
      const json = await response.json();

      if (response.ok) {
        setClients(json);
        setAllClients(json);
      } else {
        console.log("Hi im the error thats killing you");
      }
    } catch (err) {
      console.log("Error", err);
    }
  };

  
  const updateKeyword = (keyword) => {
    const filtered = allClients.filter((client) => {
      return `${client.first_name.toLowerCase()} ${client.last_name.toLowerCase()}`.includes(
        keyword.toLowerCase()
      );
    });
    setKeyword(keyword);
    setClients(filtered);
    console.log(keyword)
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="Clients">
      <SearchBar keyword={keyword} onChange={updateKeyword} />
      {clients.length === 0 && keyword.length === 0 ? 

      <div className="loaderWrapper">
        <ClipLoader
        className="loader"
        loading={true}
        size={50}
        aria-label="Loading Spinner"/>
      </div>
      : <ClientHolder clients={clients} keyword={keyword} setView={setView} setClientId={setClientId}/>
  }
    </div>
  );
}

export default Clients;
