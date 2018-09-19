import React from "react";

import { connect } from "react-redux";
import { updateBagDB } from "../actions/addBag";
class UpdateBag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateInput: "",
      desInput: "",
      validated: ""
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

  updateBagDB(e, id, destination, description) {
    $("#checkAll").click(event => {
      const form = $("#theForm");
      if (form[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }      
      this.setState({
        validated: "was-validated"
      })
    });


    e.preventDefault();
    this.props.updateBagDB(id, destination, description);
    this.setState({
      updateInput: '',
      desInput: '',
      validated: ""
    })
  }

  render() {
    return (
      <div id="container">
        <div id="line" className="row">
          <div className="col-md-6">
            <h4 id="updateTitle">Update Bag</h4>
            <form class={this.state.validated} noValidate id="theForm" onSubmit={(e) => {
                this.updateBagDB(e,
                  this.props.id,
                  this.state.updateInput,
                  this.state.desInput
                );
              }}>
              <div className="form-group">
            <input required
              onChange={this.desChange}
              type="text"
              className="form-control add-todo"
              placeholder="New bag description"
              value={this.state.desInput || ""}
            />
            <div className="valid-feedback">Saved!</div>
              <div className="invalid-feedback">
                Sorry, you missed this one.
              </div>
              </div>
              <div className="form-group">

            <input required
              onChange={this.destinationChange}
              type="text"
              className="form-control add-todo"
              placeholder="New bag destination"
              id="bottomInput"
              value={this.state.updateInput || ""}
            />
            <div className="valid-feedback">Saved!</div>
              <div className="invalid-feedback">
                Sorry, you missed this one.
              </div>
              </div>

            <button
              type="submit"
              id="checkAll"
              className="btn btn-success"
            >
              Save Changes
            </button>
            </form>
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
