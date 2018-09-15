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
        formPage: true,
        bagCount: 1
    }
    this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e, description, destination){
        e.preventDefault()
        console.log('submitted');
        this.props.addBag(this.state.bagCount, description, destination)
        this.setState({
            bagCount: this.state.bagCount + 1
        })
        console.log(this.state);
        
    }

    render() { 
        return ( 
            <div className="container">
                <div className="jumbotron">
                    <h1>Back Packer</h1>
                    <h4>Keep track of your packed belongings</h4>
                </div>
                {this.state.formPage && <MainForm handleClick={this.handleClick}/>}
                <BagPage bagsData={this.props.bags} />
           
                
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
        addBag: (id, description, destination) => {
            console.log(id, description, destination);
            
            dispatch(addBagAction(id, description, destination))
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(App)