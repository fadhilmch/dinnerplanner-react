import React, { Component } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfGuests: this.props.model.getNumberOfGuests(),
            menu: this.props.model.getFullMenu()
        };
    }

    componentDidMount() {
        this.props.model.addObserver(this);
    }

    componentWillUnmount() {
        this.props.model.removeObserver(this);
    }

    update() {
        this.setState({
            numberOfGuests: this.props.model.getNumberOfGuests(),
            menu: this.props.model.getFullMenu()
       
        });
    }

    onNumberOfGuestsChanged = e => {
        this.props.model.setNumberOfGuests(e.target.value);
    };



    render() {
        let menu = null;
        menu = this.state.menu;
        return (
        <div className="Sidebar">
        
          <div id='sidebarView'>
                    <div className='d-block d-md-none'>
                        <nav id='dinner-nav' className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                            <button className="navbar-brand" href="#">My Dinner</button>
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
                                <Link to="/summary" model={this.props.modelInstance}>
                                    <button id ='btn-confirm' className="btn btn-md btn-warning btn-confirm">Confirm Dinner</button>
                                </Link>
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
                                    {
                                        this.state.menu.map((menu,i) => (
                                        <tr key={'menu-'+i} className ="dishItem" id ={menu.id}>
                                            <td>{menu.title}</td> 
                                             <td>{menu.pricePerServing* this.state.numberOfGuests}</td> 

                                        </tr>
                                      ))
                                    }
                               </tbody>
                            </table>
                        </div>
                        <div className='total-wrapper'>
                            <span className='totalCost'></span>
                        </div>
                         <Link to="/summary" model={this.props.modelInstance}>
                            <div className='row'>         
                                    <button id ='btn-confirm' onClick = {() => {this.props.model.getFullMenu()}} className="btn btn-md btn-warning mx-auto col-10 btn-confirm">Confirm
                                    Dinner</button>
                                
                            </div>
                        </Link>
                    </div>
                </div>
     
      </div>
        );
    }
}

export default Sidebar;