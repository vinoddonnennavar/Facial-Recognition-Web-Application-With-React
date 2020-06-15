import React, { Component } from "react";
import "./App.css";
import Imagesearchform from "./components/imagesearchform/imagesearchform";
 import FaceDetect from "./components/faceDetect/faceDetect";
// Import Clarifai into our App
import Clarifai from "clarifai";

// You need to add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: "54f74c79a7834317b295b3aff26e0b44",
});


class App extends Component {
    // Create the State for input and the fectch image
    constructor() {
      super();
      this.state = {
        input: "",
        imageUrl: "",
        box: {},  
      }; // added above a new object state that hold the bounding_box value
    }

  // this function calculate the facedetect location in the image
  calculateFaceLocation = (data) => {
    const clarifaiFace =
       data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  /* this function display the face-detect box base on the state values */
  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  // setState for our input with onInputChange function
    onInputChange = (event) => {
      this.setState({ input: event.target.value });
    };

  // Perform a function when submitting with onSubmit
    onSubmit = () => {
          // set imageUrl state
      this.setState({ imageUrl: this.state.input });
      app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) =>
        //calculateFaceLocation function pass to displaybox as is parameter
        this.displayFaceBox(this.calculateFaceLocation(response))
      )
      // if error exist console.log error
      .catch((err) => console.log(err));
    };
    render() {
      return (
        <div className="App">
          {/* // update your component with their state */}
          <Imagesearchform
            onInputChange={this.onInputChange}
            onSubmit={this.onSubmit}
          />
          {/* // uncomment your face detect app and update with imageUrl state */}
          <FaceDetect box={this.state.box} imageUrl={this.state.imageUrl} />
        </div>
      );
    }
  }

export default App;
