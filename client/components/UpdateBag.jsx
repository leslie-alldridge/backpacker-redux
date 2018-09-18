import React from "react";

import { connect } from "react-redux";
import { updateBagDB } from "../actions/addBag";
class UpdateBag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateInput: "",
      desInput: ""
    };
    this.destinationChange = this.destinationChange.bind(this);
    this.desChange = this.desChange.bind(this);
  }

  destinationChange(e) {
    this.setState({
      updateInput: e.target.value
    });
  }

  desChange(e) {
    this.setState({
      desInput: e.target.value
    });
  }

  updateBagDB(id, destination, description) {
    this.props.updateBagDB(id, destination, description);
    // const { updateIt } = this.props;
    // updateIt(id, destination, description);
  }

  render() {
    return (
      <div id="container">
        <div className="row">
          <div className="col-md-6">
            <h4>Update Bag</h4>
            <input
              onChange={this.desChange}
              type="text"
              className="form-control add-todo"
              placeholder="Bag Description"
              placeholder={this.props.description}
            />
            <input
              onChange={this.destinationChange}
              type="text"
              className="form-control add-todo"
              placeholder={this.props.destination}
            />
            <button
              onClick={() => {
                this.updateBagDB(
                  this.props.id,
                  this.state.updateInput,
                  this.state.desInput
                );
              }}
              id="checkAll"
              className="btn btn-success"
            >
              Save Changes
            </button>
          </div>
        </div>
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
    updateBagDB: (id, destination, description) => {
      dispatch(updateBagDB(id, destination, description));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateBag);
