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
      <div
        data-aos="fade-left"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
        className="col-xl-12"
        id="mainForm"
      >
        <form name="addBagForm" noValidate="" id="myForm">
          <div className="col-xl-12" id="formBody">
            <div className="form-group">
              <label id="formLabel">Enter Bag Description</label>
              <input
                required
                onChange={this.handleDescChange}
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Large, small, hand luggage.."
              />
              <div className="valid-feedback">Saved!</div>
              <div className="invalid-feedback">
                Sorry, you missed this one.
              </div>
            </div>
            <div className="form-group">
              <label id="formLabel">Destination</label>
              <input
                required
                onChange={this.handleChange}
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Bag Destination"
              />
              <div className="valid-feedback">Saved!</div>
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
        <div id="info" className="col-md-6">
          <blockquote className="blockquote text-center">
            <p className="mb-0">
              {" "}
              <i className="fas fa-quote-left" /> I didn't freeze halfway
              through the flight and panic about what I'd packed{" "}
              <i className="fas fa-quote-right" />
            </p>
            <footer className="blockquote-footer">
              Avid Traveller: <cite title="Source Title">John Smith</cite>
            </footer>
          </blockquote>
          <p>How to use this app:</p>
          <ol>
            <li>
              Enter bag Description and Destination and save as many as you
              need.
            </li>
            <li>Each bag will have its own inventory and checklist.</li>
            <li>Have a great holiday!</li>
          </ol>
        </div>
      </div>
    );
  }
}
export default MainForm;
