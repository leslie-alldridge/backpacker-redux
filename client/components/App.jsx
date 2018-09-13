import React, { Component } from 'react';
import { connect } from 'react-redux'
import {addBagAction} from '../actions/addBag'

class App extends Component {
    constructor(props){
    super(props)
    this.state = {
        bags: this.props.bags || []
        }
    this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        this.props.addBag()
    }
    
    render() { 
        return ( 
            <div className="container">
                <div className="jumbotron">
                    <h1>Back Packer</h1>
                    <h4>Keep track of your packed belongings today</h4>
                </div>
                <div><button onClick={()=> {this.handleClick()}}>Add Bag</button></div>
            </div>
        );
    }
}
 
function mapStateToProps(state){
    return {
        bags: state.bags
    }
}

function mapDispatchToProps(dispatch){
    return {
        addBag: () => {
            dispatch(addBagAction())
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(App)