import React from "react";
import { connect } from "react-redux";

import {
  saveItemAction, checkItAction, deleteItAction
} from "../actions/addBag";
class BagList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formInput: ""
    };
    this.formChange = this.formChange.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.checkItem = this.checkItem.bind(this);
    this.delete = this.delete.bind(this);
  }

  delete(id, bagid, input) {
   
    const { deleteIt } = this.props;
    deleteIt(id, bagid, input);
  }

  formChange(e) {
    this.setState({
      formInput: e.target.value
    });
  }

  checkItem(id, item) {
    this.props.checkIt(id, item);
  }

  saveItem(e, id, input) {
    e.preventDefault();
    const { saveIt } = this.props;
    saveIt(id, input);
    this.setState({
      formInput: ''
    })
  }

  render() {
    return (
      <div id="container">
        <div id="line" className="row">
          <div className="col-md-6">
            <div className="todolist not-done">
              <h3 id="list">Bag List</h3>
              <form id="todoForm" onSubmit={(e) => {
                  this.saveItem(e, this.props.id, this.state.formInput);
                }}>
              <input
                onChange={this.formChange}
                type="text"
                className="form-control add-todo"
                placeholder="Item Description"
                value={this.state.formInput || ""}
              />
              <button
                id="checkAll"
                type="submit"
                className="btn btn-success"
              >
                Add Item
              </button>
              </form>
              <hr />
              <ul>
                {this.props.state.bagItems.map(item => {
                  if (item.archived == 1)
                    return (
                      <li key={item.id}>
                        {item.bagitem}
                        <i
                          onClick={() => {
                            this.checkItem(this.props.id, item.bagitem);
                          }}
                          className="fas fa-check"
                          id="tick"
                        />
                      </li>
                    );
                })}
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="todolist">
              <h4>Items Checked</h4>
              <ul id="done-items" className="list-unstyled">
                {this.props.state.bagItems.map(item => {
                  if (item.archived == 0)
                    return (
                      <li key={item.id}>
                        {item.bagitem}
                        <i
                          onClick={() => {
                            this.delete(item.id, item.bagid, item.bagitem);
                          }}
                          id="trash"
                          className="fas fa-trash-alt"
                        />
                      </li>
                    );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveIt: (id, input) => {
      dispatch(saveItemAction(id, input));
    },
    checkIt: (id, item) => {      
      dispatch(checkItAction(id, item));
    },
    deleteIt: (id, bagid, item) => {
      dispatch(deleteItAction(id, bagid, item));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BagList);
