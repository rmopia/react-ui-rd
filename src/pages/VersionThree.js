import React, { Component } from "react";
import InputBar from "../components/InputBar";
import "./VersionThree.css";

class VersionThree extends Component {
  state = {};
  render() {
    return (
      <div className="v3div">
        <div className="first-spacer" />
        <div className="row">
          <div className="mx-auto">
            <div className="row">
              <div className="simp-line">
                <h5 className="simp">Simplify: 2( 2x + 18 ) - 2</h5>
              </div>
            </div>
            <InputBar />
          </div>
        </div>
      </div>
    );
  }
}

export default VersionThree;