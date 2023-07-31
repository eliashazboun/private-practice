import "./ContentRow.scss";
import React, { useContext, useState, createContext } from "react";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from '@mui/icons-material/Save';

import { IdContext } from "../ClientTabs/ProfileTab/ProfileTab";
import { deletePopup } from "../../helpers/deletePopup";

export const EditContext = createContext()

const ContentRow = ({ children, edit, copy, del, value, handleChange, rowId }) => {
  const clientId = useContext(IdContext);

  const [showTooltip, setShowTooltip] = useState(false);
  const [editable, setEditable] = useState(false)
  const [editedField,setEditedField] = useState()
  const [error, setError] = useState(false)

  const handleDelete = async () => {
    const body = { [rowId]: value };
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    try {
      const response = await fetch(
        `/api/clients/removeContact/${clientId}`,
        requestOptions
      );
      const json = await response.json();
      handleChange(json);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(value);

    setShowTooltip(true);
    
    setTimeout(() => {
      setShowTooltip(false);
    }, "1000");
  };

  const toggleEdit = () => {
    setEditable(true)
    setEditedField(value)
  };

  const handleEdit = (e) => {
    setError(false)
    setEditedField(e.target.textContent)
  }

  const handleSave = async () => {
    setError(false)
    let updatedField;

    if ( value === editedField){
      setEditable(false)
      return
    }


    if (rowId === 'username'){ //This is the username field that the client uses to log in
      updatedField=rowId
    }else{
      updatedField = rowId + '.$' //This is for mongodb since its accessing an array
    }

    const body = { prev:{[rowId]: value},updated:{[updatedField]:editedField} };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    try {
      const response = await fetch(`/api/clients/editContact/${clientId}`,requestOptions);

      if (response.ok){
        const json = await response.json();
        handleChange(json);
        setEditable(false)
      }else{
        setError(true)
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={`contentRow`}>
      <EditContext.Provider value={{editHandler:handleEdit,editable:editable,error:error}}>
         {children}
      </EditContext.Provider>

      {(edit || copy || del) &&
       <div className="icons">
          {(edit && !editable) 
            ? <ModeEditIcon onClick={toggleEdit} />
            : <SaveIcon onClick={handleSave}/>}

          {copy && 
            <div className="copy">
              <ContentCopyIcon onClick={handleCopy} />
              <span className={showTooltip ? "tooltip" : "tooltip hide"}>Copied!</span>
            </div>
          }

          {del && <DeleteIcon onClick={() => deletePopup(handleDelete,value)} />}
        </div>
      }
    </div>
  );
};

export default ContentRow;
