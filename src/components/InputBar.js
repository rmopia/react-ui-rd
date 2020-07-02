import React, { Component } from "react";
import "./InputBar.css";

class InputBar extends Component {
  constructor(props) {
    super(props);
    this.addValToList = this.addValToList.bind(this);
    this.rowCreation = this.rowCreation.bind(this);
    this.boolListAdd = this.boolListAdd.bind(this);
    this.currentBool = this.currentBool.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      problem: null, // the JSON object
      name: null,
      rowList: [],
      ValuesList: [],
      BoolList: [true],
      currentInput: React.createRef(),
      rowId: 1,
      nextRowBool: true, // only used by initial row
      fuckyou: true,
    };
  }

  currentBool(e) {
    return e.target.id;
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
      <button className="btn btn-info hint-b" formNoValidate>
        <span role="img">&#129300;</span>
      </button>
    );

    obj.child.push(
      <div className="input-span">
        <div className="row">
          <div className="col col-md-3">
            <h5 className="leftside">=</h5>
          </div>
          <div className="col col-md-9">
            <input
              type="text"
              id={this.state.rowId}
              ref={this.state.currentInput}
              required
              className="form-control input-init"
              autoFocus={true}
              autoComplete="off"
              onChange={this.addValToList}
              onFocus={(e) => console.log(this.state.BoolList[e.target.id])}
              onBlur={this.onBlur}
              onKeyPress={(event) => {
                if (
                  event.key === "Enter" &&
                  obj.enterKeyBool === true &&
                  this.state.ValuesList[event.target.id] !== undefined
                ) {
                  this.rowCreation();
                  this.boolListAdd(event);
                }
              }}
            />
          </div>
        </div>
      </div>
    );

    this.setState({
      rowList: [...this.state.rowList, obj],
      rowId: this.state.rowId + 1,
    });
  }

  /* occurs after key press */
  boolListAdd(e) {
    let arr = [...this.state.BoolList];

    for (let i = 0; i <= e.target.id; i++) {
      arr[i] = false;
    }
    arr.push(true);
    this.setState({ BoolList: arr });
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
    const {
      error,
      isLoaded,
      nextRowBool,
      ValuesList,
      BoolList,
      currentInput,
    } = this.state;
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
          <div className="row">
            <button className="btn btn-info hint-b" formNoValidate>
              <span role="img">&#129300;</span>
            </button>
            <div className="input-span">
              <div className="row">
                <div className="col col-md-3">
                  <h5 className="leftside">=</h5>
                </div>
                <div className="col col-md-9">
                  <input
                    type="text"
                    id={0}
                    ref={currentInput}
                    required
                    autoComplete="off"
                    className="form-control input-init"
                    autoFocus={true}
                    onChange={this.addValToList}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onKeyPress={(event) => {
                      if (
                        event.key === "Enter" &&
                        nextRowBool === true &&
                        ValuesList[event.target.id] !== undefined
                      ) {
                        this.rowCreation();
                        this.boolListAdd(event);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {this.state.rowList.map((obj) => (
            <div>
              <hr />

              <div className="row">{obj.child}</div>
            </div>
          ))}
        </form>
      );
    }
  }
}

export default InputBar;
