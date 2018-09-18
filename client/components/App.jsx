import React, { Component } from "react";
import { connect } from "react-redux";
import MainForm from "./MainForm";
import BagPage from "./BagPage";
import LoginForm from "./LoginForm";
import Footer from "./Footer";
import { saveBagToDB } from "../actions/addBag";
import RegisterForm from "./RegisterForm";
import Logout from "./Logout";
import Loading from "./Loading";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bags: this.props.bags || [],
      formPage: true,
      registerToggle: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.registerToggle = this.registerToggle.bind(this);
  }

  handleClick(e, description, destination) {
    console.log("app js");

    const len = Object.keys(this.props.bags);
    e.preventDefault();
    this.props.saveBagToDB(
      this.props.auth.user.username,
      description,
      destination
    );
    // this.props.addBag(len.length, description, destination);
  }

  registerToggle() {
    console.log("hit register toggle");

    this.setState(prevState => ({
      registerToggle: !prevState.registerToggle
    }));
  }

  render() {
    return (
      <div className="container">
        <div id="header" className="jumbotron">
          <h1 id="titleText">Bag Tracker</h1>
          <h4 id="subtitleText">Keep track of packed bags</h4>
        </div>
        {!this.props.auth.isAuthenticated &&
          this.state.registerToggle && (
            <RegisterForm registerToggle={this.registerToggle} />
          )}
        {!this.props.auth.isAuthenticated &&
          !this.state.registerToggle && (
            <LoginForm registerToggle={this.registerToggle} />
          )}
        <Loading />
        {this.props.auth.isAuthenticated && (
          <Logout user={this.props.auth.user.username} />
        )}
        {this.state.formPage &&
          this.props.auth.isAuthenticated && (
            <MainForm handleClick={this.handleClick} />
          )}
        {this.props.auth.isAuthenticated && (
          <BagPage bagsData={this.props.auth} />
        )}
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bags: state.bags,
    auth: state.auth
  };
}

const mapDispatchToProps = dispatch => {
  return {
    saveBagToDB: () => {
      console.log("dispatch it");

      return dispatch(saveBagToDB());
    }
  };
};

// function mapDispatchToProps(dispatch) {
//   return {
//     addBag: (id, description, destination) => {
//       dispatch(addBagAction(id, description, destination));
//     }
//   };
// }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
