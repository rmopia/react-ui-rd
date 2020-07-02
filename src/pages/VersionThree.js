import React, { Component } from "react";
import InputRow from "../components/InputRow";
import "./VersionThree.css";

class VersionThree extends Component {
  constructor(props) {
    super(props);
    this.rowCreation = this.rowCreation.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      rowList: [],
    };
  }

  rowCreation() {
    let child = [];

    child.push(<InputRow rowCreation={this.rowCreation} />);

    this.setState({
      rowList: [...this.state.rowList, child],
    });
  }

  /* disable for de-risk testers */
  componentDidMount() {
    fetch("/api/MathProblems/random")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          problem: res,
          name: res.name,
        });
      })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="v3div">
          <div className="first-spacer" />
          <div className="row">
            <div className="mx-auto">
              <div className="row">
                <div className="simp-line">
                  <h5 className="simp">Simplify: 3x - 9 (x + 1) - (-5)</h5>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <InputRow rowCreation={this.rowCreation} />

                {this.state.rowList.map((obj) => (
                  <div>{obj}</div>
                ))}
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default VersionThree;
