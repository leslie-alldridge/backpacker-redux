import React from "react";
import { connect } from "react-redux";
import { deleteBagDB, showItems, getBags } from "../actions/addBag";
import BagList from "./BagList";
import UpdateBag from "./UpdateBag";

class BagPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewList: false,
      viewListID: null,
      viewBagUpdate: null,
      bagState: [] || this.props.bagsData,
      pinnedBags: []
    };
    this.updateBagToggle = this.updateBagToggle.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.addInventory = this.addInventory.bind(this);
    this.pinBag = this.pinBag.bind(this);
  }

  componentDidMount(){
    this.props.getBags()
  }

  addInventory(viewListID) {
    
    console.log(viewListID);
    console.log(this.state.pinnedBags);
    
    
    if (this.state.pinnedBags.indexOf(viewListID) > -1){
      console.log('this bag is pinned');
      
    } else {
      this.setState(prevState => ({
          viewListID: prevState.viewListID == viewListID ? null : viewListID,
          viewBagUpdate: null
        }));
  }
    
    
    // this.setState(prevState => ({
    //   viewListID: prevState.viewListID == viewListID ? null : viewListID,
    //   viewBagUpdate: null
    // }));
    // this.props.showItems(viewListID)
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

  pinBag(id){
   //console.log('pinned' + id);
    if(this.state.pinnedBags.includes(id)){
        let index = this.state.pinnedBags.indexOf(id);
        if (index > -1){
          this.state.pinnedBags.splice(index, 1)
          console.log('removed pinned item');
          
        }
    }else {
    this.setState({
      pinnedBags: [...this.state.pinnedBags, id]
    })
    console.log('pinned a bag');
  }
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
                <i id="pin" onClick={() => {this.pinBag(bag.id)} } className="fas fa-thumbtack"></i>
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
                {/* {console.log(this.state.pinnedBags.includes(bag.id))} */}

                {this.state.pinnedBags.includes(bag.id) ? 
                
                <BagList
                key={bag.id}
                id={bag.id}
                description={bag.description}
                destination={bag.destination}
              /> :

              this.state.viewListID === bag.id && (
                <BagList
                key={bag.id}
                id={bag.id}
                description={bag.description}
                destination={bag.destination} />
                )
              }
                {/* {this.state.viewListID === bag.id && (
                  
                )} */}
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
      dispatch(showItems(id));
    },
    getBags: () => {
      dispatch(getBags());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BagPage);
