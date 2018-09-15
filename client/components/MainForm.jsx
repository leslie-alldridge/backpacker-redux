import React from 'react'
class MainForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            description: '',
            destination: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleDescChange = this. handleDescChange.bind(this)
    }

    handleDescChange (e) {
        this.setState({
          description: e.target.value,
          destination: this.state.destination
        })
      }

    handleChange (e) {
        this.setState({
            description: this.state.description,
          destination: e.target.value
        })        
    }

    render(){

    return (
        <div id="mainForm">
            <form>
                <div className="container">
                    <div className="form-group">
                        <label>Enter Bag Description</label>
                            <input onChange={this.handleDescChange} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Large, small, hand luggage.."/>
                        <small id="emailHelp" className="form-text text-muted">You can save multiple bags.</small>
                    </div>
                    <div className="form-group">
                        <label>Destination</label>
                            <input onChange={this.handleChange} type="text" className="form-control" id="exampleInputPassword1" placeholder="Bag Destination"/>
                    </div>
                    <button type="submit" onClick={(e) => this.props.handleClick(e, this.state.description, this.state.destination)} className="btn btn-primary">Save Bag</button>
                </div>
            </form>
        </div>
        )
    }
}
export default MainForm