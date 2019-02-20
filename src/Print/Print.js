import React, { Component } from "react";
import "./Print.css";
import modelInstance from "../data/DinnerModel";
import { Link } from "react-router-dom";

class Print extends Component{
	constructor(props) {
        super(props);
        // We create the state to store the various statuses
        // e.g. API data loading or error
        console.log(props)
        this.state = {
            status: "LOADING",
            id: this.props.model.getCurrentDish(),
            numberOfGuests: this.props.model.getNumberOfGuests(),
            menu: this.props.model.getFullMenu()

        };
     }

     render(){
     	let menuList = null;
     	console.log(this.state.menu);

     	menuList = this.state.menu.map(dish =>(
     		<div key ='dish.id'  className= 'row'>
                <div className="col-md-6" >
                    <div className="row">
                        <div className="col-md-6 center" >
                            <img className="fitImage" src={dish.image}/>
                        </div>

                        <div className="col-md-6" >
                            <h5>{dish.title.toUpperCase()}</h5>
                            <p>
                            
                            </p>
                        </div>
                    </div>
                </div>  
                <div className="col-md-6">
                    <h5>PREPARATION</h5>
                    <p>
                    {dish.instructions}
                    </p>
                
                </div>
             </div>
            
                
    	 ))

     	return(
	     	<div className ='Print'>
	     		<div>
	                <nav className="navbar border">
	                    <div id="guestOverview">
	                        <h5 className="navbar-header">My Dinner: {this.state.numberOfGuests} People</h5>
	                    </div>
	                    <button type="button" className="btn btn-md btn-warning navbar-right" id="btnEditSummary">Go Back and Edit Dinner
	                    </button>
	                </nav>
	            </div>
	          
	    		{menuList}
	    		
	     	</div>
     	
     	);
     }

}

export default Print;