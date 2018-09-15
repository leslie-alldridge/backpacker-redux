import React, { Component } from 'react';
import MainForm from './MainForm'
import BagPage from './BagPage'
import BagList from './BagList'
import { connect } from 'react-redux'
import {addBagAction} from '../actions/addBag'

class App extends Component {
    constructor(props){
    super(props)
    this.state = {
        bags: this.props.bags || [],
        bagPage: false,
        formPage: true
    }
    this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e, description, destination){
        e.preventDefault()
        console.log('submitted');
        this.props.addBag(description, destination)
    }
    
    render() { 
        return ( 
            <div className="container">
                <div className="jumbotron">
                    <h1>Back Packer</h1>
                    <h4>Keep track of your packed belongings</h4>
                </div>
                {this.state.formPage && <MainForm handleClick={this.handleClick}/>}
                {this.state.bagPage && <BagPage bags={this.props.bags} />}
                <BagPage bags={this.props.bags} />
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
        addBag: (description, destination) => {
            console.log(description, destination);
            
            dispatch(addBagAction(description, destination))
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(App)