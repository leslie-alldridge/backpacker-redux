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
      confirm: "",
      err: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.clearError = this.clearError.bind(this);

  }

  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  }

  handleClick(e) {
    this.setState({
      err: true
    })
    e.preventDefault()
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

  clearError(){
    this.props.errorClear()
  }

  render() {
    const { username, password, confirm } = this.state;
    return (
      <div>
      <form className="form-inline" onSubmit={(e) => {
            this.handleClick(e);
          }}>

          <input
          id="input1"
          className="form-control"
            pattern=".{4,}"   required title="4 characters minimum"
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
            value={username}
          />
        
          <input
          className="form-control"
            pattern=".{8,}"   required title="8 characters minimum"
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={password}
          />
      
          <input
          id="input1reg"
          className="form-control"
            pattern=".{8,}"   required title="8 characters minimum"
            type="password"
            name="confirm"
            placeholder="Confirm Password"
            onChange={this.handleChange}
            value={confirm}
          />
      

        <button
        id="input1btn"
         className="btn btn-primary"
         type="submit"
        >
          Register
        </button>
        </form>
        <button
        id="input1btnsub"
        className="btn btn-primary"
          onClick={() => {
            this.props.registerToggle()
            this.clearError()
          }}
        >
          <i class="fas fa-chevron-left"></i> Back
        </button>
        {this.state.err && <ErrorMessage reducer="auth" />}
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
    },
    errorClear: () => {
      dispatch(registerError(''));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(RegisterForm);
