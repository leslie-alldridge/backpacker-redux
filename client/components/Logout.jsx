import React from "react";
import { connect } from "react-redux";

import { logoutUser } from "../actions/logout";

const Logout = props => {
  return (
    <div>
      <p id="welcome">Currently logged in as <span id="userlgdin"><b>{props.user}</b></span></p>
      <button id="logoutBtn" type="button" className="btn btn-default btn-sm" onClick={props.logoutUser}><i className="fas fa-sign-out-alt"></i> Log out</button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => {
      dispatch(logoutUser());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
