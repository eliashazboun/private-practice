import "./AboutView.scss";

const AboutView = ({ id }) => {
  return (
    <div className="aboutview">
      {id === "1" && (
        <div className="view">
          <div className="item">
            <div className="left">
              <h1>Special Interests</h1>
            </div>
            <div className="right">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                ea eum voluptatibus, architecto sed corrupti voluptatum animi,
                aut numquam earum saepe a exercitationem deleniti ad soluta
                ducimus rerum vero! Fugit?
              </p>
            </div>
          </div>
          <div className="item">
            <div className="left">
              <h1>Approach</h1>
            </div>
            <div className="right">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                ea eum voluptatibus, architecto sed corrupti voluptatum animi,
                aut numquam earum saepe a exercitationem deleniti ad soluta
                ducimus rerum vero! Fugit?
              </p>
            </div>
          </div>
          <div className="item">
            <div className="left">
              <h1>Therapy Style</h1>
            </div>
            <div className="right">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                ea eum voluptatibus, architecto sed corrupti voluptatum animi,
                aut numquam earum saepe a exercitationem deleniti ad soluta
                ducimus rerum vero! Fugit?
              </p>
            </div>
          </div>
        </div>
      )}
      {id === "2" && (
        <div className="view">
          <div className="item">
            <div className="left">
              <h1>Education</h1>
            </div>
            <div className="right">
              <p >Education goes here</p>
            </div>
          </div>
        </div>
      )}
      {id === "3" && (
        <div className="view">
          <div className="item">
            <div className="left">
              <h1>What are your interests outside of work?</h1>
            </div>
            <div className="right">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                harum deleniti magnam totam eos dolores perferendis,
                consequuntur cupiditate facere obcaecati suscipit numquam autem
                aspernatur vel dignissimos rerum in, fugiat possimus?
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutView;
