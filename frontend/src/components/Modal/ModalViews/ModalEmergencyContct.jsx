import React, { useState,useContext } from "react";
import PhoneInput from "react-phone-number-input";
import { IdContext } from "../../ClientTabs/ProfileTab/ProfileTab";

import './ModalEmergency.scss'

const ModalEmergencyContct = ({ handleChange, handleShow }) => {
  const clientId = useContext(IdContext);

  const [firstName, setFirstName]=useState('')
  const [lastName, setLastName] = useState('')
  const [relationship, setRelationship] = useState('')
  const [phone, setPhone] = useState('')

  const clearInputs = () => {
    setFirstName('')
    setLastName('')
    setRelationship('')
    setPhone('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const body = {emergency:{firstName: firstName, lastName: lastName, relationship:relationship, phone:phone}}

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    try {
      const response = await fetch(`http://localhost:4000/api/clients/addEmergency/${clientId}`,requestOptions);
      if (response.ok){
          const json = await response.json();
          handleChange(json);
          clearInputs()
          handleShow()
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="modalEmergency">
      <h2>Add Emergency</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input required type="text" placeholder="first name" onChange={(e) => setFirstName(e.target.value)} />
        <input required type="text" placeholder="last name" onChange={(e) => {setLastName(e.target.value)}}/>
        <select required onChange={(e) => setRelationship(e.target.value)} >
          <option value="" hidden>Relationship</option>
          <option value="Parent">Parent</option>
          <option value="Child">Child</option>
          <option value="Child">Family</option>
          <option value="Significant Other">Significant Other</option>
          <option value="Co Worker">Co Worker</option>
          <option value="Friend">Friend</option>
        </select>
        <PhoneInput 
          required
          placeholder="Phone Number" 
          value={phone} 
          onChange={(e) => setPhone(e)} 
          defaultCountry="JO" />
        <button type="submit" className="button-green">
          Submit
        </button>

      </form>
    </div>
  );
};

export default ModalEmergencyContct;
