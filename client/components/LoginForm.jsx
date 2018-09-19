import React from "react";
import { connect } from "react-redux";

import { loginUser } from "../actions/login";
import ErrorMessage from "./ErrorMessage";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorVisible: true
    };
    this.handleClick = this.handleClick.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  }

  handleClick(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const creds = {
      username: username.trim(),
      password: password.trim()
    };
    this.props.loginUser(creds);
  }

  handleError(){
    this.setState({
      errorVisible: false
    })
    
  }

  render() {
    return (
      <div>
        <form className="form-inline" onSubmit={(e) => {this.handleClick(e)}}>
          <input
          pattern=".{4,}"   required title="4 characters minimum"
          id="input1"
          className="form-control"
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
          />
          <input
          pattern=".{8,}"   required title="8 characters minimum"
          className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
        <button id="input1btn" className="btn btn-primary" type="submit">Login</button>
        <button className="btn btn-primary" id="regLink" onClick={() => {
            this.props.registerToggle()
            this.handleError()
        }}>
          Register
        </button>
        </form>
        
        
        {this.state.errorVisible && <ErrorMessage reducer="auth" />}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: creds => {
      return dispatch(loginUser(creds));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LoginForm);
