import "./ClientHolder.scss";
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { deletePopup } from "../../helpers/deletePopup";

const ClientHolder = ({clients,keyword, setView, setClientId}) => {

  const [rows,setRows] = useState([]);

  const handleDelete = async (id) => {
      const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    try {
      const response = await fetch(`/api/clients/${id}`,
        requestOptions
      );
      if (response.ok){
        setRows(rows.filter((row) => row.id !== id))
      }
    } catch (err) {
      console.log(err);
    }
  };

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
    {
      field: 'actions',
      type:'actions', 
      headerName:"Actions",
      width:'200',
      cellClassName:'actions',
      sortable:false,
      getActions: ({id, row})=> {

        return [
          
          <GridActionsCellItem
          style={{border:'2px solid black'}}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={(e) => {deletePopup(() =>handleDelete(id),row.firstName + row.lastName)}}
            color="inherit"
          />,
        ];

      }
    }

  ];

  

  const makeRows = () => {
    const holder = []
    clients.forEach((client) =>{
      const row = {id: client._id, firstName: client.first_name, lastName:client.last_name, email:client.username,birthday:client.birthday}
      holder.push(row)
    })
    setRows(holder)
  }

  
  
  
  
  
  const handleCellClick = (e) => {
   
    if(e.field !== 'actions'){
      console.log('hi')
      setView('profile')
      setClientId(e.id)
    }
  }
  
  
  useEffect(() => {
    makeRows()
  }, [clients,keyword]);
  
  return (
    <div className="clients">
     {rows.length === 0 && keyword.length === 0 ? "Loading..." :  
     <DataGrid
        onCellClick={handleCellClick}
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
