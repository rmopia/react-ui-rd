import React, { Component } from "react";
import { MathpixMarkdown, MathpixLoader } from "mathpix-markdown-it";
/* apparently has asciimath support but no documentation as to how */
//import MathJax from "mathjax3-react";
/* import below only supports latex */
//import MathJax from "react-mathjax";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      problems: [],
    };
  }

  componentDidMount() {
    /* refer to proxy in package.json */
    fetch("/api/MathProblems")
      .then((res) => res.json())
      //.then((json) => (data = json))
      /* since array is unnamed, connect table to state var here */
      .then((json) => {
        this.setState({
          problems: json,
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
    const { error, isLoaded, problems } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        /*<div>
          {problems.length}
          {console.table(problems)}
        </div>*/
        <div className="container-fluid">
          <script
            id="MathJax-script"
            async
            src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
          ></script>
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
              {problems.map((problem) => (
                <tr>
                  <td>{problem.id}</td>
                  <td>
                    <MathpixLoader>
                      <MathpixMarkdown text={"$" + problem.name + "$"} />
                    </MathpixLoader>
                  </td>
                  <td>{problem.type}</td>
                  <td>{Number(problem.isComplete)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default Home;
