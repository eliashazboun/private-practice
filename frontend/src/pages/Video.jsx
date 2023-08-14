import useDragger from '../hooks/useDragger';
import './Video.scss'

const Video = () => {

  useDragger('box')

  return (
    <div className="video">
      <div className="container">
        <div id='box' className="box" ></div>
      </div>
     
    </div>
  );
};

export default Video;