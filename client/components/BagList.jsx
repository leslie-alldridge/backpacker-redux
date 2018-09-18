import React from "react";
import { connect } from "react-redux";

import {
  saveItemAction,
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

  delete(id, input) {
    const { deleteIt } = this.props;
    deleteIt(id, input);
  }

  formChange(e) {
    this.setState({
      formInput: e.target.value
    });
  }

  checkItem(id, item) {
    const { checkIt } = this.props;
    checkIt(id, item);
  }

  saveItem(id, input) {
    console.log(id, input);
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
              {console.log(this.props.state.bagItems)}
              <ul>

                {this.props.state.bagItems.map(item =>

                    <li>{item.bag_item}</li>
                  // item.items.map(newItem => {
                  //   if (this.props.id == item.id) {
                  //     return (
                  //       <li key={newItem}>
                  //         {newItem}
                  //         <i
                  //           onClick={() => {
                  //             this.checkItem(this.props.id, newItem);
                  //           }}
                  //           className="fas fa-check"
                  //           id="tick"
                  //         />
                  //       </li>
                  //     );
                  //   }
                  // })
                 )}
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="todolist">
              <h4>Items Checked</h4>
              {/* <ul id="done-items" className="list-unstyled">
                {this.props.bags.map(item =>
                  item.checked.map(newItem => {
                    if (this.props.id === item.id) {
                      return (
                        <li key={newItem}>
                          {newItem}
                          <i
                            onClick={() => {
                              this.delete(this.props.id, newItem);
                            }}
                            id="trash"
                            className="fas fa-trash-alt"
                          />
                        </li>
                      );
                    }
                  })
                )}
              </ul> */}
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
    // checkIt: (id, item) => {
    //   dispatch(checkItAction(id, item));
    // },
    // deleteIt: (id, item) => {
    //   dispatch(deleteItAction(id, item));
    // }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BagList);
