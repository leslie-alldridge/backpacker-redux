import React from 'react'
import {deleteBagAction} from '../actions/addBag'
import { connect } from 'react-redux'
import BagList from './BagList'
class BagPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
           bags: this.props.bags || [],
           viewList: false,
           viewListID: null
        }
        this.deleteItem = this.deleteItem.bind(this)
        this.addInventory = this.addInventory.bind(this)
    }

    deleteItem (id) {
        this.props.deleteBag(id) 
    }

    addInventory (viewListID) {
        console.log('hit');
        this.setState(prevState => ({
            viewListID: prevState.viewListID == viewListID ? null : viewListID
          }));

    }

    render(){

    return (
        <div id="container">
            <h3>All of your bags are below</h3>
            {this.props.bagsData.map(bag => {
            return <div id="card" class="card" >
                {/* <img class="card-img-top" src=".../100px180/" alt="Card image cap"/> */}
                <div class="card-body">
                <h5 class="card-title">{bag.description}</h5>
                <p class="card-text">{bag.destination}</p>
                <a href="#" onClick={() => {this.addInventory(bag.id)}} class="btn btn-primary">Add Inventory</a>
                <a href="#" onClick={() => this.deleteItem(bag.id)} class="btn btn-danger">Delete</a>
                {this.state.viewListID == bag.id && <BagList key={bag.id} id = {bag.id} description={bag.description} destination={bag.destination}/>}

            </div>
        </div>
        
       })}
        </div>
    )
    }
}

function mapStateToProps(state){
    return {
        bags: state.bags
    }
}

function mapDispatchToProps(dispatch){
    return {
        deleteBag: (description, destination) => {
            console.log(description, destination);
            
            dispatch(deleteBagAction(description, destination))
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(BagPage)
