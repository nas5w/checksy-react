import React, { Component } from "react";
import { Validator, stringContains, isValidEmail } from "./checksy";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      errors: []
    };
    this.validator = new Validator();
    this.validator.addRules([
      {
        prop: "email",
        tests: [
          { test: isValidEmail, message: "Must be a valid email!" },
          { test: stringContains("Nick"), message: "Must contain Nick" }
        ]
      }
    ]);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const results = this.validator.validate({ email: e.target.value });
    this.setState({
      email: e.target.value,
      errors: results.errors
    });
  }

  render() {
    return (
      <div>
        <input onChange={this.handleChange} />
        <ul>
          {this.state.errors.map((error, i) => {
            return <li key={i}>{error}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default App;
