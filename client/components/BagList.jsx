import React from 'react'
import { connect } from 'react-redux'
import {saveItemAction} from '../actions/addItem'

class BagList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
           formInput: ''
        }
        this.formChange = this.formChange.bind(this)
        this.saveItem = this.saveItem.bind(this)
    }

    formChange(e) {
        this.setState({
            formInput: e.target.value
        })
    }

    saveItem(id, input){
        console.log('hit save item');
        this.props.saveIt(id, input);
    }

    render(){

    return (
        <div id="container">
        <div class="row">
        <div class="col-md-6">
            <div class="todolist not-done">
             <h4>Bag List</h4>
                <input onChange={this.formChange} type="text" class="form-control add-todo" placeholder="Item Description"/>
                    <button onClick={() => {this.saveItem(this.props.id, this.state.formInput)}} id="checkAll" class="btn btn-success">Add Item</button>
                    <hr/>
                    {console.log(this.props)}
                    <ul>
                        {this.props.bags[this.props.id - 1].items.map(item => {
                            return <li>{item}</li>
                        })}
                    </ul>
            </div>
        </div>
        <div class="col-md-6">
            <div class="todolist">
             <h4>Items Checked</h4>
                <ul id="done-items" class="list-unstyled">
                    <li>Some item <button class="remove-item btn btn-default btn-xs pull-right"><span class="glyphicon glyphicon-remove"></span></button></li>
                </ul>
            </div>
        </div>
    </div>
       
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
        saveIt: (id, description, destination) => {            
            dispatch(saveItemAction(id, description, destination))
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(BagList)