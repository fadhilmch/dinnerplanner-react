import React, { Component } from "react";
import "./Sidebar.css";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests()
    };
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.props.model.addObserver(this);
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests()
    });
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = e => {
    this.props.model.setNumberOfGuests(e.target.value);
  };

  render() {
    return (
      <div className="Sidebar">
       
          <div id='sidebarView'>
                    <div className='d-block d-md-none'>
                        <nav id='dinner-nav' className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                            <a className="navbar-brand" href="#">My Dinner</a>
                            <div id='nav-price' className='ml-auto'></div>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarText">
                                <form className="form-inline">
                                    <span className='margin-right-5px'>People </span>
                                    <input
                                        className='number-input'
                                        type="number"
                                        value={this.state.numberOfGuests}
                                        onChange={this.onNumberOfGuestsChanged}
                                      />
                                </form>
                                <table className="table">
                                    <thead>
                                        <tr className='table-active'>
                                            <th>Dish Name</th>
                                            <th>Cost</th>
                                        </tr>
                                    </thead>
                                    <tbody className='menu-table'>
                                    </tbody>
                                </table>
                                <div className='total-wrapper'>
                                    <span className='totalCost'></span>
                                </div>
                                <div>
                                    <button type="button" className="btn btn-md btn-warning btn-confirm" disabled="disabled">Confirm Dinner</button>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div id='sidebar' className='d-none d-md-block center border-right'>
                        <div className='padding-15'>
                            <h4 className="left pad-left">My Dinner</h4>
                            <div className='pad-left'>
                                <form className="form-inline">
                                    <div>
                                        <span className='margin-right-5px'>People </span>
                                    </div>
                                    <input
                                        className='number-input'
                                        type="number"
                                        value={this.state.numberOfGuests}
                                        onChange={this.onNumberOfGuestsChanged}
                                      />
                                </form>
                            </div>
                        </div>
                        <div className="table-wrapper">
                            <table className="table">
                                <thead>
                                    <tr className='table-active'>
                                        <th>Dish Name</th>
                                        <th>Cost</th>
                                    </tr>
                                </thead>
                                <tbody className='menu-table'>
                                </tbody>
                            </table>
                        </div>
                        <div className='total-wrapper'>
                            <span className='totalCost'></span>
                        </div>
                        <div className='row'>
                            <button type="button" className="btn btn-md btn-warning mx-auto col-10 btn-confirm" disabled="disabled">Confirm
                                Dinner</button>
                        </div>
                    </div>
                </div>
     
      </div>
    );
  }
}

export default Sidebar;
