import React from 'react'
class BagList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
           
        }
       
    }

   

    render(){

    return (
        <div id="container">
        <div class="row">
        <div class="col-md-6">
            <div class="todolist not-done">
             <h1>Bag List</h1>
                <input type="text" class="form-control add-todo" placeholder="Add todo"/>
                    <button id="checkAll" class="btn btn-success">Add Item</button>
                    
                    <hr/>
            </div>
        </div>
        <div class="col-md-6">
            <div class="todolist">
             <h1>Items Checked</h1>
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