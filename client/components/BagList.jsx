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
    console.log(id, bagid, input);
    
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

  saveItem(id, input) {
    const { saveIt } = this.props;
    saveIt(id, input);
  }

  render() {
    return (
      <div id="container">
        <div id="line" className="row">
          <div className="col-md-6">
            <div className="todolist not-done">
              <h3 id="list">Bag List</h3>
              <input
                onChange={this.formChange}
                type="text"
                className="form-control add-todo"
                placeholder="Item Description"
              />
              <button
                onClick={() => {
                  this.saveItem(this.props.id, this.state.formInput);
                }}
                id="checkAll"
                type="submit"
                className="btn btn-success"
              >
                Add Item
              </button>
              <hr />
              <ul>
                {this.props.state.bagItems.map(item => {
                  if (item.archived == 1)
                    return (
                      <li key={item.id}>
                        {item.bag_item}
                        <i
                          onClick={() => {
                            this.checkItem(this.props.id, item.bag_item);
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
                        {item.bag_item}
                        <i
                          onClick={() => {
                            console.log(item.bag_item)

                            this.delete(item.id, item.bag_id, item.bag_item);
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
