import { useState } from "react";
import AboutView from "../../components/AboutView/AboutView";
import "./AboutMe.scss";

const AboutMe = () => {
  const [active, setActive] = useState("1");

  const handleClick = (event) => {
    setActive(event.target.id);
  };

  return (
    <div className="about">
      <div className="wrapper">
        <div className="slider">
          <div className="content">
            <div className="left">
              <img
                src={require("../../pictures/sousan.jpg")}
                alt="profile-pic"
              ></img>
            </div>
            <div className="right">
              <p className="name">
                Sousan Alsayegh <br />
              </p>
              <p className="location">Location: Virtual</p>
              <p className="quote">
                "I am not a product of my circumstances. I am a product of my
                decisions."
              </p>
            </div>
          </div>
        </div>
        <div className="buttons">
          <button
            id={1}
            onClick={handleClick}
            className={
              active === "1" ? "active" : "inactive"
            }
          >
            Therapy Style
          </button>
          <button
            id={2}
            onClick={handleClick}
            className={
              active === "2" ? "active" : "inactive"
            }
          >
            Education
          </button>
          <button
            id={3}
            onClick={handleClick}
            className={
              active === "3" ? "active" : "inactive"
            }
          >
            Personal
          </button>
        </div>
          <AboutView id={active} />
      </div>
    </div>
  );
};

export default AboutMe;
