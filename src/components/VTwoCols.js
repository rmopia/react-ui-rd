import React, { Component } from "react";
import { MathpixMarkdown, MathpixLoader } from "mathpix-markdown-it";
import "./VTwoCols.css";

class VTwoCols extends Component {
  constructor(props) {
    super(props);
    this.handleFocus = this.handleFocus.bind(this);
    this.boolCheck = this.boolCheck.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      problem: null, // the JSON object
      name: null,
      rowList: [],
      VisibleDotList: [],
      rowID: 0,
      nextRowBool: true, // only used by initial row
    };
  }

  // Obtain the frequency of columns for this specific equation
  colFreq() {
    const name = this.state.name;
    let freq = name.match(/[-*+=]/g || []).length;
    let colCount = freq + 1;
    return colCount;
  }

  populateDotVisList() {
    let popArr = [...this.state.VisibleDotList];
    let freq = this.colFreq();
    for (let i = 0; i < freq; i++) {
      popArr[i] = false;
    }
    this.setState({ VisibleDotList: popArr });
  }

  // Very first column creator, for span dots
  dotColCreation() {
    let freq = this.colFreq();
    let cols = [];

    for (let j = 0; j < freq; j++) {
      cols.push(
        <div
          className="col h-col"
          key={j}
          style={{
            visibility: this.state.VisibleDotList[j] ? "visible" : "hidden",
          }}
        >
          <span className="yellowgreen1 indicator1" />
        </div>
      );
    }
    return cols;
  }

  /* Separate row creator b/c I couldnt get it in rowsList without errors */
  initialRowCreation() {
    let freq = this.colFreq();
    let child = [];

    child.push(
      <button
        className="btn btn-info hint-btn1"
        style={{
          visibility: this.state.nextRowBool ? "visible" : "hidden",
        }}
      >
        <span>&#128546;</span>
      </button>
    );
    for (let i = 0; i < freq; i++) {
      if (i === 0) {
        child.push(
          <div className="col d-col">
            <input
              className="form-control c-input"
              autoComplete="off"
              autoFocus={true}
              onFocus={this.handleFocus}
              tabIndex={i}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") {
                  console.log("testttttt!");
                }
              }}
            />
          </div>
        );
      } else if (i === freq - 1) {
        child.push(
          <div className="col d-col">
            <input
              className="form-control c-input"
              autoComplete="off"
              onKeyPress={(event) => {
                if (event.key === "Enter" && this.state.nextRowBool === true) {
                  this.colCreation();
                }
              }}
              onFocus={this.handleFocus}
              tabIndex={i}
            />
          </div>
        );
      } else {
        child.push(
          <div className="col d-col">
            <input
              autoComplete="off"
              className="form-control c-input"
              onFocus={this.handleFocus}
              tabIndex={i}
            />
          </div>
        );
      }
    }
    return child;
  }

  boolCheck(e) {
    let b = Number(e.currentTarget.id) === Number(this.state.rowID - 1);
    console.log(b);
    return b;
  }

  // Dynamic column creation based on colFreq
  colCreation() {
    // only for very first iteration
    this.setState({ nextRowBool: false });
    // for every other iteration so only the last row can create a new row
    this.setState({
      rowList: this.state.rowList.map((obj) => (obj.enterKeyBool = false)),
    });
    const row_id = this.state.rowID;
    let freq = this.colFreq();
    let obj = {
      child: [],
      enterKeyBool: true,
    };

    obj.child.push(
      <button
        className="btn btn-info hint-btn1"
        id={row_id}
        onClick={this.boolCheck}
        style={{
          visibility: this.boolCheck ? "visible" : "hidden",
        }}
      >
        <span>&#128546;</span>
      </button>
    );

    for (let i = 0; i < freq; i++) {
      if (i === 0) {
        obj.child.push(
          <div className="col d-col">
            <input
              className="form-control c-input"
              id={row_id}
              autoFocus={true}
              autoComplete="off"
              onFocus={this.handleFocus}
              tabIndex={i}
            />
          </div>
        );
      } else if (i === freq - 1) {
        obj.child.push(
          <div className="col d-col">
            <input
              className="form-control c-input"
              id={row_id}
              autoComplete="off"
              onKeyPress={(event) => {
                if (event.key === "Enter" && obj.enterKeyBool === true) {
                  this.colCreation();
                }
              }}
              onFocus={this.handleFocus}
              tabIndex={i}
            />
          </div>
        );
      } else {
        obj.child.push(
          <div className="col d-col">
            <input
              className="form-control c-input"
              id={row_id}
              autoComplete="off"
              onFocus={this.handleFocus}
              tabIndex={i}
            />
          </div>
        );
      }
      this.setState({
        rowList: [...this.state.rowList, obj],
        rowID: this.state.rowID + 1,
      });
    }
  }

  /* Highlights appropriate column based on focus */
  handleFocus(e) {
    let totalCols = this.colFreq();
    let VisibleDotList = [...this.state.VisibleDotList];
    for (let i = 0; i < totalCols; i++) {
      if (i === e.target.tabIndex) {
        VisibleDotList[i] = true;
      } else {
        VisibleDotList[i] = false;
      }
    }
    this.setState({ VisibleDotList });
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
      .then(() => this.populateDotVisList())
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
    const { error, isLoaded, name } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <div className="row">
            <div className="mx-auto">
              <div className="row">{this.dotColCreation()}</div>
            </div>
          </div>
          <div className="row">
            <div className="mx-auto">
              <h2>
                <MathpixLoader>
                  <MathpixMarkdown text={"$" + name + "$"} />
                </MathpixLoader>
              </h2>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="row">
              <div className="mx-auto">
                <div className="row ini-row">{this.initialRowCreation()}</div>
              </div>
            </div>
            {this.state.rowList.map((obj) => (
              <div>
                <hr className="line-hr" />
                <div className="row">
                  <div className="mx-auto">
                    <h5>RESULT</h5>
                  </div>
                </div>
                <div className="row">
                  <div className="mx-auto">
                    <div
                      className="row ini-row"
                      onFocus={(e) => console.log(e.target.id)}
                    >
                      {obj.child.map((thing) => thing)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </form>
        </div>
      );
    }
  }
}

export default VTwoCols;
