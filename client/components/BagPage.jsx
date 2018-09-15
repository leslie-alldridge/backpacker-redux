import React from 'react'
class BagPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
           
        }
       
    }

   

    render(){

    return (



        <div id="container">
        <p>bag page</p>
       {this.props.bags.map(bag => {
        return   <div id="card" class="card" >
        {/* <img class="card-img-top" src=".../100px180/" alt="Card image cap"/> */}
        <div class="card-body">
          <h5 class="card-title">{bag.description}</h5>
          <p class="card-text">{bag.destination}</p>
          <a href="#" class="btn btn-primary">Add Inventory</a>
        </div>
      </div>
       })}

       
        </div>
    )
    }
}
export default BagPage