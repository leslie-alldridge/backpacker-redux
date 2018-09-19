import React from "react";
import { connect } from "react-redux";
import { deleteBagDB, showItems } from "../actions/addBag";
import BagList from "./BagList";
import UpdateBag from "./UpdateBag";

class BagPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewList: false,
      viewListID: null,
      viewBagUpdate: null,
      bagState: [] || this.props.bagsData
    };
    this.updateBagToggle = this.updateBagToggle.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.addInventory = this.addInventory.bind(this);
  }

  addInventory(viewListID) {
    this.setState(prevState => ({
      viewListID: prevState.viewListID == viewListID ? null : viewListID,
      viewBagUpdate: null
    }));
    this.props.showItems(viewListID)
  }

  updateBagToggle(id) {
    this.setState(prevState => ({
      viewBagUpdate: prevState.viewBagUpdate == id ? null : id,
      viewListID: null
    }));
  }

  deleteItem(id) {
    this.props.deleteBagDB(id);
  }

  render() {
    return (
      <div id="cont" className="container">
        <div id="containerBags">
          <h3 id="bagHead">
            <i className="fas fa-suitcase" /> Your Current Bags :
          </h3>
          {this.props.bagsData.bag.map(bag => (
            <div key={bag.id} id="card" className="card">
              <div
                data-aos="flip-up"
                data-aos-anchor-placement="bottom-bottom"
                data-aos-duration="600"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="true"
                className="card-body"
              >
                <h5 className="card-title">{bag.description}</h5>
                <p className="card-text">{bag.destination}</p>
                <button
                  id="mainBtn"
                  onClick={() => {
                    this.addInventory(bag.id);
                  }}
                  className="btn btn-primary"
                >
                  Add Items to Bag
                </button>
                <button
                  id="mainBtn"
                  onClick={() => this.updateBagToggle(bag.id)}
                  className="btn btn-secondary"
                >
                  Edit Bag
                </button>
                <button
                  id="mainBtn"
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
                {this.state.viewBagUpdate === bag.id && (
                  <UpdateBag
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
    deleteBagDB: id => {
      dispatch(deleteBagDB(id));
    },
    showItems: id => {
      console.log(id);
      
      dispatch(showItems(id));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BagPage);
