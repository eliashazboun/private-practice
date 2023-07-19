import { useEffect, useState } from "react";

import SearchBar from "../components/SearchBar/SearchBar";
import ClientHolder from "../components/ClientHolder/ClientHolder";

const Clients = () => {
  const [allClients, setAllClients] = useState([]);
  const [clients, setClients] = useState([]);
  const [keyword, setKeyword] = useState("");

  const fetchClients = async () => {
    try {
      const response = await fetch("/api/clients");
      const json = await response.json();

      if (response.ok) {
        setClients(json);
        setAllClients(json);
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
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="Clients">
      <SearchBar keyword={keyword} onChange={updateKeyword} />
      <ClientHolder clients={clients} />
    </div>
  );
};

export default Clients;
