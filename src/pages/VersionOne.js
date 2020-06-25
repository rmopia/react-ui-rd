import React, { Component } from "react";
import VOneCols from "../components/VOneCols";
import "./Version.css";

class VersionOne extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="row">
          <div className="mx-auto">
            <h1>Demo v1</h1>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="mx-auto">
            <h5 className="h5-b">
              <b>Solve for x:</b>
            </h5>
          </div>
        </div>
        <VOneCols />
      </div>
    );
  }
}

export default VersionOne;
