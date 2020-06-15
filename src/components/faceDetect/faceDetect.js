import React from "react";
// add css to style the facebox
import "./faceDetect.css";
// pass the box state to the component

const FaceDetect = ({ imageUrl, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputimage" alt="" src={imageUrl} width="500px" heigh="auto" />
      <div
          className="bounding-box"
          // styling that makes the box visible base on the return value
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        ></div>
      </div>
    </div>
  );
};
export default FaceDetect;