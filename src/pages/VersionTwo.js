import React, { Component } from "react";
import "./Version.css";
import VTwoCols from "../components/VTwoCols";

class VersionTwo extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="row">
          <div className="mx-auto">
            <h1>Demo v2</h1>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="mx-auto">
            <h5 className="h5-b">Solve for x:</h5>
          </div>
        </div>
        <VTwoCols />
      </div>
    );
  }
}

export default VersionTwo;
