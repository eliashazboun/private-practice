import React from "react";
import "./Hero.scss";
import Button from "../Button/Button";

const Hero = () => {
  return (
    <div className="hero">
      <div className="wrapper">
        <div className="left">
          <img src={require('../../pictures/stock-office-3.jpg')} alt="" />
        </div>

        <div className="right">
          <div className="content">
            <h1>Take Charge of your Mental Health</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
              deleniti mollitia, obcaecati iste eius accusantium voluptatem et
              aliquam repellat perspiciatis dolores quidem provident tempora
              ducimus, dolorum nulla soluta eaque aperiam!
            </p>
            <Button title="Button" kind='orange'/>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="item">Individual Therapy</div>
        <div className="item">Couples Therapy</div>
        <div className="item">Family Therapy</div>
        <div className="item">Substance Abuse</div>
      </div>
    </div>
  );
};

export default Hero;
