import "./App.css";
import React from "react";
import data from "./STORE";

let steps = 0;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ``,
    };
  }

  lSearch = (value) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i] === value) {
        return `Found ${value} after ${i} steps using linear search`;
      } else if (data.length === i + 1) {
        return `Not Found after ${i} steps using linear search`;
      }
    }
  };

  bSearch = (arr, value, start, end) => {
    start = start === undefined ? 0 : start;
    end = end === undefined ? arr.length : end;

    if (start > end) {
      return `Value Not Found after ${steps} tries using binary search`;
    }

    const index = Math.floor((start + end) / 2);
    const item = arr[index];

    if (item === value) {
      return `Value ${value} found after ${steps} tries using binary search`;
    } else if (item < value) {
      steps++;
      return this.bSearch(arr, value, index + 1, end);
    } else if (item > value) {
      steps++;
      return this.bSearch(arr, value, start, index - 1);
    } else {
      return `Value Not Found after ${steps} tries using binary search`;
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
    steps = 0;
    let aSorted = data.sort((a, b) => a - b);
    const valueB = e.target.textbox2.value;
    const resultB = this.bSearch(aSorted, Number(valueB));
    console.log(resultB);

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
