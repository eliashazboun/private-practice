import { Link } from "react-router-dom";

import "./Signup.scss";

import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'

import FormInput from "../components/FormInput/FormInput";
import { useState } from "react";

const Signup = () => {
  const [error,setError] = useState('')
  const [values, setValues] = useState({
    fname: "",
    lname: "",
    email: "",
    birthday: "",
    phone: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "fname",
      type: "text",
      placeholder: "First Name",
      label: "First Name",
      errorMessage: "First Name is required and should not contain special characters.",
      pattern:"^[A-Za-z0-9 ]+$",
      required:true

    },
    {
      id: 2,
      name: "lname",
      type: "text",
      placeholder: "Last Name",
      label: "Last Name",
      errorMessage:'Last Name is required and should not contain special characters.',
      required:true

    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      errorMessage:'Should be a valid email address',
      required:true


    },
    {
      id: 4,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      label: "Birthday",
      required:true,
      errorMessage:'Birthday is required'

    },
    {
      id: 5,
      name: "phone",
      type: "tel",
      placeholder: "Phone",
      label: "Phone",
      errorMessage:'Phone number is required',
      required:true

    },
    {
      id: 6,
      name: "gender",
      type: "select",
      placeholder: "Gender",
      label: "Gender",
      options:["Male","Female"],
      errorMessage:'Gender is required.',
      required:true

    },
    {
      id: 7,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      errorMessage: "Password should be 8-20 characters and include 1 letter and 1 number.",
      pattern:"^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d^a-zA-Z0-9].{7,20}$",
      required:true

    },
    {
      id: 8,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      label: "Confirm Password",
      errorMessage:"Passwords don't match",
      pattern: values.password,
      required:true

    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    const res =  await fetch('/api/clients', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name:values.fname,
        last_name:values.lname,
        birthday:values.birthday,
        email:values.email,
        phone:values.phone,
        gender: values.gender,
        password: values.password

      })
    })

    const data = await res.json()

    console.log(data)

    if (data.status === 'ok'){
      window.location.href = '/api/login'
    }else{
      setError(data.msg)
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onChangePhone = (e) => {
    setValues({...values, "phone":e})
  }

  return (
    <div className="signup">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          {inputs.map((input) => {
            if (input.id === 5){
              return(
                <>
                <PhoneInput placeholder="Phone Number" value={values.phone} onChange={onChangePhone} defaultCountry="JO" key={input.id}/>
                <span>{input.errorMessage}</span>
                </>)
            }else{
            return(<FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />)};
          })}
          <p style={{color: 'red',textAlign: 'center'}}>{error}</p>
          <button>Sign Up</button>
          
          <Link to="/api/login">
            <p style={{ textAlign: "center" }}>
              Already have an account? Log In.
            </p>
          </Link>
         
        </form>
      </div>
    </div>
  );
};

export default Signup;
