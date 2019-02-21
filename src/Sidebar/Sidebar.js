import React, { Component } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.model = props.model;
        this.toggleNavbar = this.toggleNavbar.bind(this)
        this.state = {
            numberOfGuests: this.model.getNumberOfGuests(),
            menu: this.model.getFullMenu(),
            collapsed: true,
        };
    };

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    componentDidMount() {
        this.model.addObserver(this);
    };

    componentWillUnmount() {
        this.model.removeObserver(this);
    };

    update() {
        this.setState({
            numberOfGuests: this.model.getNumberOfGuests(),
            menu: this.model.getFullMenu()
        });
    };

    setButton = () => {
        return (this.state.menu.length === 0)?'active':'';
    };

    onNumberOfGuestsChanged = e => {
        this.model.setNumberOfGuests(e.target.value);
    };

    renderTotalPrice = () => {
        let total = this.model.getTotalMenuPrice()
        return (this.model.getFullMenu().length === 0)?'':
        <div className='total-wrapper'>
            <span className='totalCost'>{'SEK '+total}</span>
        </div>
        
    };

    render() {
        const collapsed = this.state.collapsed;
        const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
        const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';
        return (
        <div className="Sidebar">
        
          <div id='sidebarView'>
                    <div className='d-block d-md-none'>
                        <nav id='dinner-nav' className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                            <button className="navbar-brand" href="#">My Dinner</button>
                            <div id='nav-price' className='ml-auto'></div>
                            <button onClick={this.toggleNavbar} className={classTwo} data-toggle="collapse" data-target="#navbarText" aria-controls="#navbarText" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className={classOne} id="navbarText">
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
                                    {
                                        this.state.menu.map((menu,i) => (
                                        <tr key={'menu-'+i} className ="dishItem" id ={menu.id}>
                                            <td>{menu.title}</td> 
                                             <td>{this.model.dishPrice(menu.id)}</td> 

                                        </tr>
                                      ))
                                    }
                               </tbody>
                                </table>
                                {this.renderTotalPrice()}
                                <Link to="/summary" model={this.model}>
                                    <div className='row'>         
                                            <button id ='btn-confirm' onClick = {() => {this.model.getFullMenu()}} className="btn btn-md btn-warning mx-auto col-10 btn-confirm" disabled={this.setButton()}>Confirm
                                            Dinner</button>
                                    </div>
                                </Link>
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
                                             <td>{this.model.dishPrice(menu.id)}</td> 

                                        </tr>
                                      ))
                                    }
                               </tbody>
                            </table>
                        </div>
                        {this.renderTotalPrice()}
                         <Link to="/summary" model={this.model}>
                            <div className='row'>         
                                    <button id ='btn-confirm' onClick = {() => {this.model.getFullMenu()}} className="btn btn-md btn-warning mx-auto col-10 btn-confirm" disabled={this.setButton()}>Confirm
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