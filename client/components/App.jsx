import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainForm from './MainForm';
import BagPage from './BagPage';
import LoginForm from './LoginForm'
import Footer from './Footer'
import { addBagAction } from '../actions/addBag';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bags: this.props.bags || [],
      formPage: true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, description, destination) {
    const len = Object.keys(this.props.bags);
    e.preventDefault();
    this.props.addBag(len.length, description, destination);
  }

  render() {
    return (
      <div className="container">
        <div id="header" className="jumbotron">
          <h1 id="titleText">Bag Tracker</h1>
          <h4 id="subtitleText">Keep track of packed bags</h4>
        </div>
        <LoginForm/>
        {this.state.formPage && <MainForm handleClick={this.handleClick} />}
        <BagPage bagsData={this.props.bags} />
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bags: state.bags
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addBag: (id, description, destination) => {
      dispatch(addBagAction(id, description, destination));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
