import React, { Component } from "react";
import DynamicCols from "../components/DynamicCols";

class Demo extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="mx-auto">
            <h1>Demo</h1>
          </div>
        </div>
        <br />
        <DynamicCols />
        <br />
        <div className="row">
          <div className="mx-auto">
            <button className="btn btn-success">Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Demo;
