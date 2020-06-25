import React, { Component } from "react";
import { MathpixMarkdown, MathpixLoader } from "mathpix-markdown-it";
import "./VOneCols.css";

class VOneCols extends Component {
  constructor(props) {
    super(props);
    this.addValToList = this.addValToList.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      problem: null, // the JSON object
      name: null,
      rowList: [],
      ValuesList: [],
      rowId: 1,
      nextRowBool: true, // only used by initial row
    };
  }

  rowCreation() {
    // only for very first iteration
    this.setState({ nextRowBool: false });
    // for every other iteration so only the last row can create a new row
    this.setState({
      rowList: this.state.rowList.map((obj) => (obj.enterKeyBool = false)),
    });

    let obj = {
      child: [],
      enterKeyBool: true,
    };

    obj.child.push(
      <div className="col">
        <input
          type="text"
          required
          className="form-control init-input"
          autoFocus={true}
          onChange={this.addValToList}
          onFocus={(e) => console.log(e.target.id)}
          onKeyPress={(event) => {
            if (
              event.key === "Enter" &&
              obj.enterKeyBool === true &&
              this.state.ValuesList[event.target.id] !== undefined
            ) {
              this.rowCreation();
            }
          }}
          id={this.state.rowId}
        />
      </div>
    );

    this.setState({
      rowList: [...this.state.rowList, obj],
    });

    this.setState({ rowId: this.state.rowId + 1 });
  }

  addValToList(e) {
    let arr = [...this.state.ValuesList];
    if (arr.length === 0) {
      arr[0] = e.target.value;
    } else {
      arr[e.target.id] = e.target.value;
    }
    this.setState({ ValuesList: arr });
  }

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
    const { error, isLoaded, name, nextRowBool } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <div className="row">
            <div className="mx-auto">
              <h5 className="h-math">
                <MathpixLoader>
                  <MathpixMarkdown text={"$" + name + "$"} />
                </MathpixLoader>
              </h5>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="row">
              <div className="mx-auto">
                <div className="row">
                  <div className="col">
                    <input
                      type="text"
                      required
                      autoComplete="off"
                      className="form-control init-input"
                      autoFocus={true}
                      onChange={this.addValToList}
                      onFocus={(e) => console.log(e.target.id)}
                      onKeyPress={(event) => {
                        if (
                          event.key === "Enter" &&
                          nextRowBool === true &&
                          this.state.ValuesList[event.target.id] !== undefined
                        ) {
                          this.rowCreation();
                        }
                      }}
                      id={0}
                    />
                  </div>
                </div>
              </div>
            </div>

            {this.state.rowList.map((obj) => (
              <div>
                <hr className="hr-l" />
                <div className="row">
                  <div className="mx-auto">
                    <h5 className="res">RESULT</h5>
                  </div>
                </div>
                <div className="row">
                  <div className="mx-auto">{obj.child}</div>
                </div>
              </div>
            ))}
          </form>
        </div>
      );
    }
  }
}

export default VOneCols;
