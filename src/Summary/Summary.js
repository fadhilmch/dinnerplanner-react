import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Summary.css";
import modelInstance from "../data/DinnerModel";
import { Link } from "react-router-dom";

class Summary extends Component{

	constructor(props) {
        super(props);

        // we put on state the properties we want to use and modify in the component
        this.state = {
            numberOfGuests: this.props.model.getNumberOfGuests(),
            menu: this.props.model.getFullMenu()



        };


    }

    render(){

    	let menuList = null;
    	menuList = this.state.menu.map(dish => ( 
				<div key = {dish.id} id={dish.id} className="col-sm-6 col-md-3 col-lg-2 dishItem">
	                <div className ='card'>
		                <img className="card-img-top" src={dish.image}/>
		                <div className="card-text">
		                    <p>{dish.title} </p>
		                </div>
	            	</div>

		            <div className="caption" >
		                <h6 className="text-danger">
		                {dish.pricePerServing*this.state.numberOfGuests} 
		                SEK</h6>
		            </div>
	            </div>
	        

	))

    return(
    	<div className="Summary">
    		<div>
                <nav className="navbar border">
                    <div id="guestOverview">
                        <h5 className="navbar-header">My Dinner: {this.state.numberOfGuests} People</h5>
                    </div>
                    <button type="button" className="btn btn-md btn-warning navbar-right" id="btnEditSummary">Go Back and Edit Dinner
                    </button>
                </nav>
            </div>
            <div className='row'>
    		{menuList}
    		</div>

            <div className="container center">
            	<Link to="/print" model={this.props.modelInstance}>
                <div className='margin-top'>
                    <button className="btn btn-md btn-warning" id="btnPrint">Print Full Recipe </button>
                </div>
                </Link>
            </div>
    	 </div>
    );
    }
	
	
}

export default Summary;
