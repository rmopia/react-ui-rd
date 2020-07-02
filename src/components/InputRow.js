import React, { Component } from "react";
import "./InputRow.css";

class InputRow extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      nextRowBool: true,
      inputVal: "",
    };
  }

  handleChange(e) {
    this.setState({ inputVal: e.target.value });
  }

  render() {
    const { nextRowBool, inputVal } = this.state;
    return (
      <div className="row row-init">
        <button
          className="btn btn-info hint-b"
          formNoValidate
          style={{ visibility: nextRowBool ? "visible" : "hidden" }}
        >
          <span role="img">&#129300;</span>
        </button>
        <div
          className="input-span"
          style={{
            backgroundColor: nextRowBool ? "ghostwhite" : "white",
            boxShadow: nextRowBool
              ? "1px 3px 1px #9E9E9E"
              : "1px 3px 1px white",
          }}
        >
          <div className="row">
            <div className="col col-md-3">
              <h5 className="leftside">=</h5>
            </div>
            <div className="col col-md-9">
              <input
                type="text"
                required
                autoComplete="off"
                className="form-control input-init"
                autoFocus={true}
                onChange={this.handleChange}
                onKeyPress={(event) => {
                  if (
                    event.key === "Enter" &&
                    nextRowBool === true &&
                    inputVal !== ""
                  ) {
                    this.props.rowCreation();
                    this.setState({ nextRowBool: false });
                  }
                }}
                disabled={!nextRowBool}
                style={{
                  backgroundColor: nextRowBool ? "ghostwhite" : "white",
                }}
              />
            </div>
          </div>
        </div>
        <button
          className="btn btn-primary check-btn"
          formNoValidate
          style={{ visibility: nextRowBool ? "visible" : "hidden" }}
          onClick={(event) => {
            if (nextRowBool === true && inputVal !== "") {
              this.props.rowCreation();
              this.setState({ nextRowBool: false });
            }
          }}
        >
          check
        </button>
      </div>
    );
  }
}

export default InputRow;
