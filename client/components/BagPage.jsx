import React from "react";
import { connect } from "react-redux";
import { deleteBagAction } from "../actions/addBag";
import BagList from "./BagList";

class BagPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bags: this.props.bags || [],
      viewList: false,
      viewListID: null
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.addInventory = this.addInventory.bind(this);
  }

  deleteItem(id) {
    this.props.deleteBag(id);
  }

  addInventory(viewListID) {
    this.setState(prevState => ({
      viewListID: prevState.viewListID == viewListID ? null : viewListID
    }));
  }

  render() {
    return (
      <div id="container">
        <h3>All of your bags are below</h3>
        {this.props.bagsData.map(bag => (
          <div key={bag.id} id="card" className="card">
            {/* <img className="card-img-top" src=".../100px180/" alt="Card image cap"/> */}
            <div className="card-body">
              <h5 className="card-title">{bag.description}</h5>
              <p className="card-text">{bag.destination}</p>
              <button
                onClick={() => {
                  this.addInventory(bag.id);
                }}
                className="btn btn-primary"
              >
                Add Inventory
              </button>
              <button
                onClick={() => this.deleteItem(bag.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
              {this.state.viewListID === bag.id && (
                <BagList
                  key={bag.id}
                  id={bag.id}
                  description={bag.description}
                  destination={bag.destination}
                />
              )}
            </div>
          </div>
        ))}
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
    deleteBag: (description, destination) => {
      dispatch(deleteBagAction(description, destination));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BagPage);
