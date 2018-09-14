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
        return   <p>{bag.description} and {bag.destination}</p>
       })}

       
        </div>
    )
    }
}
export default BagPage