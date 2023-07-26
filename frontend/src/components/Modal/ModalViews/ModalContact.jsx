import React, {useState, useContext} from "react";
import PhoneInput from "react-phone-number-input";
import { IdContext } from "../../ClientTabs/ProfileTab/ProfileTab";
import EmailIcon from '@mui/icons-material/Email';

const ModalContact = ({clientHandler, handleClose}) => {
  const clientId = useContext(IdContext);

  const [modalValue, setModalValue] = useState("");
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState()


  const handleModalChange = (e) => {
    if(selected === 'phone'){
        setModalValue(e)
    }
    if(selected === 'email'){
        setModalValue(e.target.value)
    }
  };


  const onSelect = (e) => {
    setError(false)
    setSelected(e.target.value);
    setModalValue('')

  };

  const clearInputs = () => {
    setModalValue('')
    setSelected(null)
  }


  const onSubmit = async (e) => {
    e.preventDefault();
    setError(false)

    const key = selected
    const body = {[key]:modalValue}


    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    try {
      const response = await fetch(`/api/clients/addContact/${clientId}`,requestOptions);
      if (response.ok){
          const json = await response.json();
          clientHandler(json);
          clearInputs()
          handleClose()
      }else{
        setError(true)
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="modalview contact">
        <h2 className="modaltitle">Add Contact</h2>
      <form className="modalform" onSubmit={(e) => {
            onSubmit(e);
        }}>
        <div className="inputs">
          <select className="modalOptions" defaultValue={"none"} onChange={onSelect}>
            <option value="none" disabled hidden> Select One</option>
            <option value="phone">Phone Number</option>
            <option value="email">Email</option>
          </select>

            {
            selected === "phone" 
                ? <PhoneInput
                    required
                    placeholder="Phone Number"
                    value={modalValue}
                    onChange={handleModalChange}
                    defaultCountry="JO"/>: 
            selected === "email" 
                ? <div className="input"><EmailIcon  className="icon"/><input onChange={handleModalChange} className="inputfield" required name="email" type="email" placeholder="Email"></input></div>

                : <span className="modalhelpertext">Please select phone or email</span>
            }
            {error && <p className="error">Already on file.</p>}
        </div>
        <div className="buttons">
            <button type="submit" className="button submit">Submit</button>
            <button className="button cancel" onClick={() => {handleClose(); clearInputs();}}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ModalContact;
