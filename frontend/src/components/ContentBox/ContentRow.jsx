import "./ContentRow.scss";
import React, { useContext, useState, createContext } from "react";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

import { IdContext } from "../ClientTabs/ProfileTab/ProfileTab";
import { deletePopup } from "../../helpers/deletePopup";

export const EditContext = createContext();

const ContentRow = ({ children, edit = false, copy = false, del = false, value, handleChange, rowId, boxId }) => {
  const clientId = useContext(IdContext);
  const [showTooltip, setShowTooltip] = useState(false);
  const [editable, setEditable] = useState(false);
  const [editedField, setEditedField] = useState();
  const [error, setError] = useState(false);

  const handleDelete = async () => {
    const body = { [rowId]: value };
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    try {
      const response = await fetch(`http://localhost:4000/api/clients/remove${boxId}/${clientId}`, requestOptions);
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
    setEditable(true);
    setEditedField(value);
  };

  const handleEdit = (e) => {
    console.log(e.target.id);
    setError(false);
    setEditedField(e.target.textContent);
  };

  const handleSave = async () => {
    setError(false);

    if (value === editedField) {
      setEditable((prev) => !prev);
      return;
    }

    const body = { prev: { [rowId]: value }, updated: { [rowId]: editedField } };
    console.log(body);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    try {
      const response = await fetch(`http://localhost:4000/api/clients/edit${boxId}/${clientId}`, requestOptions);

      if (response.ok) {
        const json = await response.json();
        handleChange(json);
        setEditable((prev) => !prev);
      } else {
        setError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`contentRow`}>
      <EditContext.Provider value={{ editHandler: handleEdit, editable: editable, error: error }}>{children}</EditContext.Provider>

      {(edit || copy || del) && (
        <div className="icons">
          {edit ? editable ? <SaveIcon onClick={handleSave} /> : <ModeEditIcon onClick={toggleEdit} /> : ""}

          {copy && (
            <div className="copy">
              <ContentCopyIcon onClick={handleCopy} />
              <span className={showTooltip ? "tooltip" : "tooltip hide"}>Copied!</span>
            </div>
          )}

          {del && <DeleteIcon onClick={() => deletePopup(handleDelete, value)} />}
        </div>
      )}
    </div>
  );
};

export default ContentRow;
