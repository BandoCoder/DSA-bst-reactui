import "./App.css";
import React from "react";
import aSorted from "./STOREsorted";

let steps = 0;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ``,
    };
  }

  lSearch = (value) => {
    let resString;
    for (let i = 0; i < aSorted.length; i++) {
      if (aSorted[i] === value) {
        resString = `Found ${value} after ${i} steps`;
      } else {
        resString = `Not Found! after ${i} searches`;
      }
    }
    return resString;
  };

  bSearch = (arr, value, start, end) => {
    start = start === undefined ? 0 : start;
    end = end === undefined ? arr.length : end;

    if (start > end) {
      return -1;
    }

    const index = Math.floor((start + end) / 2);
    const item = arr[index];

    if (item === value) {
      return `Value ${value} found after ${steps} tries`;
    } else if (item < value) {
      steps++;
      return this.bSearch(arr, value, index + 1, end);
    } else if (item > value) {
      steps++;
      return this.bSearch(arr, value, start, index - 1);
    }
  };

  handleSubmitL = (e) => {
    e.preventDefault();
    const valueL = e.target.textbox.value;

    const resultL = this.lSearch(Number(valueL));
    this.setState({ message: resultL });
  };

  handleSubmitB = (e) => {
    e.preventDefault();
    const valueB = e.target.textbox2.value;
    const resultB = this.bSearch(aSorted, valueB);

    this.setState({ message: resultB });
  };
  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmitL}>
          <label htmlFor="textbox">Input</label>
          <input className="textbox" name="textbox" type="text"></input>
          <button type="submit">Submit for linear search</button>
        </form>
        <form onSubmit={this.handleSubmitB}>
          <label htmlFor="textbox">Input</label>
          <input className="textbox" name="textbox2" type="text"></input>
          <button type="submit">Submit for binary search</button>
        </form>
        <div>
          <h1>{this.state.message}</h1>
        </div>
      </div>
    );
  }
}

export default App;
