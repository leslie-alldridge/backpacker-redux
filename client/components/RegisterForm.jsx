import React from "react";
import { connect } from "react-redux";

import { registerUser, registerError } from "../actions/register";
import ErrorMessage from "./ErrorMessage";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirm: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  }

  handleClick(event) {
    console.log("handleclick");

    const { username, password, confirm } = this.state;
    if (password !== confirm) {
      this.props.registerError("Passwords do not match!");
      return;
    }
    const creds = {
      username: username.trim(),
      password: password.trim()
    };
    this.props.registerUser(creds);
  }

  render() {
    const { username, password, confirm } = this.state;
    return (
      <div>
        <p>
          <input
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
            value={username}
          />
        </p>

        <p>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={password}
          />
        </p>

        <p>
          <input
            type="password"
            name="confirm"
            placeholder="Confirm Password"
            onChange={this.handleChange}
            value={confirm}
          />
        </p>

        <button
          onClick={() => {
            this.handleClick();
            this.props.registerToggle();
          }}
        >
          Register
        </button>
        <button
          onClick={() => {
            this.props.registerToggle();
          }}
        >
          Back
        </button>
        <ErrorMessage reducer="auth" />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    registerUser: creds => {
      return dispatch(registerUser(creds));
    },
    registerError: message => {
      dispatch(registerError(message));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(RegisterForm);