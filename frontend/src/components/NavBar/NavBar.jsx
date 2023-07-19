import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import "./NavBar.scss";
import Button from "../Button/Button";

const NavBar = () => {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(false);
  const [buttonTitle, setButtonTitle] = useState();
  const [path, setPath] = useState(location.pathname);

  const handleAlternate = (e) => {
    if (window.location.pathname === "/api/login") {
      window.location.href = "/api/signup";
    } else if (window.location.pathname === "/api/signup") {
      window.location.href = "/api/login";
    } else {
      window.location.href = "/api/login";
    }
  };

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handlePath = () => {
    setPath(location.pathname);
  };

  useEffect(() => {
    if (path === "/api/login") {
      setButtonTitle("Sign Up");
    } else if (path === "/api/signup") {
      setButtonTitle("Login");
    } else {
      setButtonTitle("Login / Signup");
    }
  }, []);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <Link to="/" reloadDocument>
            <img src={require("../../pictures/sousan-logo.png")} alt="" />
          </Link>
        </div>
        <div className={showNavbar ? "center active" : "center"}>
          <Link to="/api/clients" onClick={handlePath}>
            <h4>Clients</h4>
          </Link>

          <Link to="/api/appointments">
            <h4>Appointments</h4>
          </Link>

          <Link to="/api/video">
            <h4>Video</h4>
          </Link>
        </div>
        <div className="right">
          <Link>
            <Button
              title={buttonTitle}
              kind="blue"
              handler={handleAlternate}
            ></Button>
          </Link>
          <Button
            title={"Book Now!"}
            kind="orange"
            handler={() => console.log(path)}
          ></Button>
          <MenuIcon className="hamburger" onClick={handleShowNavbar} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
