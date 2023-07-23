import { Link } from "react-router-dom";
import "./ClientHolder.scss";
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";

const ClientHolder = ({clients,keyword, setView, setClientId}) => {

  const [rows,setRows] = useState([]);

  const columns = [
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
    },
    {
      field: 'birthday',
      headerName: 'Birthday',
      width: 160,
    },
    { field: 'id', headerName: 'ID', width: 250 },

  ];

  const makeRows = () => {
    const holder = []
    clients.forEach((client) =>{
      const row = {id: client._id, firstName: client.first_name, lastName:client.last_name, email:client.email, phone:client.phone, birthday:client.birthday}
      holder.push(row)
    })
    setRows(holder)
  }

  useEffect(() => {
    makeRows()
  }, [clients,keyword]);

  const handleRowClick = (e) => {
    setClientId(e.id)
    setView('profile')
  }



  return (
    <div className="clients">
     {rows.length === 0 && keyword.length === 0 ? "Loading..." :  
     <DataGrid
        onRowClick={handleRowClick}
        rows={rows}
        columns={columns}
        initialState={{
          pagination:{
            paginationModel:{
              pageSize:10,
            },
          },
        }}
        pageSizeOptions={[10]}
      />}
      
    </div>
  );
};

export default ClientHolder;
