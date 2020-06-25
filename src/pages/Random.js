import React, { Component } from "react";
//import MathJax from "react-mathjax";
import { MathpixMarkdown, MathpixLoader } from "mathpix-markdown-it";

class Random extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      problem: null, // the JSON
      id: null,
      name: null,
      type: null,
      completed: null,
    };
  }

  componentDidMount() {
    fetch("/api/MathProblems/random")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          problem: res,
          id: res.id,
          name: res.name,
          type: res.type,
          completed: res.isComplete,
        });
      })
      //.then((res) => console.log(this.state.problem))
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
    const { error, isLoaded, problem, name, id, type, completed } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="mx-auto">
              <h1>Random Equation</h1>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="mx-auto">
              <h3>{JSON.stringify(problem, null, "\t")}</h3>
              <br />
            </div>
          </div>
          <div className="row">
            <div className="mx-auto">
              <MathpixLoader>
                <MathpixMarkdown text={"$" + name + "$"} />
              </MathpixLoader>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="mx-auto">
              <table className="table table-dark table-hover">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Equation</th>
                    <th scope="col">Type</th>
                    <th scope="col">Completion</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{type}</td>
                    <td>{Number(completed)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="mx-auto">
              <button
                onClick={() => window.location.reload(false)}
                type="button"
                className="btn btn-info"
              >
                Press Here
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Random;
