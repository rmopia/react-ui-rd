import React, { Component } from "react";

class AddMath extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: "",
      type: "",
      isComplete: "",
    };
  }

  handleSubmit() {
    fetch("/api/MathProblems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "name": this.state.name,
        "type": this.state.type,
        "isComplete": Boolean(false) // new equation so assumed to be false 
      }),
    });
  }

  render() {
    return (
      <div className="container w-50">
        <br />
        <h2>Add Equation</h2>
        <br />
        <form>
          <input
            className="form-control"
            placeholder="Equation"
            onChange={(e) => this.setState({ name: e.target.value })}

          />
          <br />
          <input
            className="form-control"
            placeholder="Type"
            onChange={(e) => this.setState({ type: e.target.value })}

          />
          <br />

          <button className="btn btn-info" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default AddMath;
