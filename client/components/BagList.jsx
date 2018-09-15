import React from 'react'
class BagList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
           formInput: ''
        }
        this.formChange = this.formChange.bind(this)
    }

    formChange(e) {
        this.setState({
            formInput: e.target.value
        })
    }

    render(){

    return (
        <div id="container">
        <div class="row">
        <div class="col-md-6">
            <div class="todolist not-done">
             <h4>Bag List</h4>
                <input onChange={this.formChange} type="text" class="form-control add-todo" placeholder="Item Description"/>
                    <button id="checkAll" class="btn btn-success">Add Item</button>
                    
                    <hr/>
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
export default BagList