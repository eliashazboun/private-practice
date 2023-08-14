import { Link } from "react-router-dom";
import FormInput from "../components/FormInput/FormInput";
import "./Login.scss";
import axios from "axios";
import { useState } from "react";
import { decodeToken } from "react-jwt";

//NEED TO FIX THIS FILE AND USE LINK FROM ROUTER DOM

const Login = ({setIsLoggedIn,setUser}) => {
  const [error, setError] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Please provide valid email.",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
    },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        email: values.email,
        password: values.password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        const { isAdmin, name } = decodeToken(response.data.token);
        setUser(name)
        if (isAdmin) {
          setIsLoggedIn(true)
          window.location.href = "/api/admindash";
        } else {
          setIsLoggedIn(true)
          window.location.href = "/api/clientdash/home";
        }
      }
    } catch (err) {
      setError(true);
      console.log("Catch", err);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className="login">
      <div className="wrapper">
        <form onSubmit={handleLogin}>
          <h1>Welcome Back!</h1>
          {inputs.map((data) => {
            return (
              <FormInput
                {...data}
                value={values[data.name]}
                onChange={onChange}
                key={data.id}
              />
            );
          })}
          <div className="display-f">
            <button className="button-green button" type="button" onClick={() => {setValues({email:'admin@admin.com',password:'admin'})}}>Admin</button>
            <button className="button-red button" type="button" onClick={() => {setValues({email:'client@client.com',password:'client'})}}>Client</button>
          </div>
          <button className="button-blue submit">Log In</button>
          {error && (
            <p className="error">Invalid credentials, please try again.</p>
          )}

          <Link to="/api/signup" onClick={window.location.reload}>
            <p style={{ textAlign: "center" }}>
              Don't have an account? Sign up.
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
