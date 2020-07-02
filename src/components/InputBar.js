import React, { Component } from "react";
import InputRow from "../components/InputRow";

class InputBar extends Component {
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <InputRow rowCreation={this.rowCreation} />

          {this.state.rowList.map((obj) => (
            <div>
              <hr />

              {obj}
            </div>
          ))}
        </form>
      );
    }
  }
}

export default InputBar;
