import React from "react";

class MainForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      destination: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
  }

  componentDidMount() {
    $("#btnSubmit").click(event => {
      const form = $("#myForm");
      if (form[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.addClass("was-validated");
    });
  }

  handleDescChange(e) {
    this.setState({
      description: e.target.value,
      destination: this.state.destination
    });
  }

  handleChange(e) {
    this.setState({
      description: this.state.description,
      destination: e.target.value
    });
  }

  render() {
    return (
      <div id="mainForm">
        <form noValidate="" id="myForm">
          <div className="container">
            <div className="form-group">
              <label>Enter Bag Description</label>
              <input
                required
                onChange={this.handleDescChange}
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Large, small, hand luggage.."
              />
              <small id="emailHelp" className="form-text text-muted">
                You can save multiple bags.
              </small>
              <div className="valid-feedback">Nice! You got this one!</div>
              <div className="invalid-feedback">
                Sorry, you missed this one.
              </div>
            </div>
            <div className="form-group">
              <label>Destination</label>
              <input
                required
                onChange={this.handleChange}
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Bag Destination"
              />
              <div className="valid-feedback">Nice! You got this one!</div>
              <div className="invalid-feedback">
                Sorry, you missed this one.
              </div>
            </div>
            <button
              type="submit"
              id="btnSubmit"
              onClick={e =>
                this.props.handleClick(
                  e,
                  this.state.description,
                  this.state.destination
                )
              }
              className="btn btn-primary"
            >
              Save Bag
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default MainForm;
