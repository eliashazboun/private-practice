import "./ClientHolder.scss";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { deletePopup } from "../../helpers/deletePopup";
import DeleteIcon from "@mui/icons-material/Delete";

const ClientHolder = ({ clients, keyword, setView, setClientId,deleteClient }) => {
  const [rows, setRows] = useState([]);

  const handleDelete = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    try {
      const response = await fetch(`http://localhost:4000/api/clients/${id}`, requestOptions);
      
      if (response.ok) {
        const deletedClient = await response.json()
        console.log(deletedClient._id)
        deleteClient(deletedClient)
      }
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    { field: "number", headerName: " ", width: 50 },

    {
      field: "firstName",
      headerName: "First name",
      width: 150,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
    },
    {
      field: "birthday",
      headerName: "Birthday",
      width: 160,
    },

    {
      field: "id",
      headerName: "Client ID",
      width: 200,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: "200",
      cellClassName: "actions",
      sortable: false,
      getActions: ({ id, row }) => {
        return [
          <GridActionsCellItem
            style={{ color: "red" }}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={(e) => {
              deletePopup(() => handleDelete(id), row.firstName + row.lastName);
            }}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const makeRows = () => {
    const holder = [];
    clients.forEach((client, index) => {
      const row = { number: index + 1, id: client._id, firstName: client.first_name, lastName: client.last_name, email: client.username, birthday: client.birthday };
      holder.push(row);
    });
    setRows(holder);
  };

  const handleCellClick = (e) => {
    if (e.field !== "actions" && e.field !== "id") {
      setView("profile");
      setClientId(e.id);
    }

    if (e.field === "id") {
      navigator.clipboard.writeText(e.id);
    }
  };

  useEffect(() => {
    console.log('Hey there I ran Client Holder')
    makeRows();
  }, [clients, keyword]);

  return (
    <div className="clients">
      {rows.length === 0 && keyword.length === 0 ? (
        "Loading..."
      ) : (
        <DataGrid
          onCellClick={handleCellClick}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
        />
      )}
    </div>
  );
};

export default ClientHolder;
