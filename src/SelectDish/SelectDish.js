import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Dishes from "../Dishes/Dishes";
import "./SelectDish.css";
import { Link } from "react-router-dom";

class SelectDish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDishes : ['appetizer', 'breakfast', 'dessert','dinner', 'drink', 'lunch' , 'main course', 'main dish','sauce', 'side dish',  'snack']
    };
  };

  checkSelected = (type) => {
    return (type.toLowerCase()=== this.props.model.getSearchQuery().type)?'selected':''
  };

  render() {
    return (
      <div>
    
        <Sidebar model={this.props.model} />
        
        <div className="SelectDish">
          <h3>Find a Dish</h3>
          <div className="row">
              <div className="col-lg-3 col-md-6">
                <input className ="form-control full-width" placeholder="Enter key words" />
              </div>
              <div className="col-lg-2 col-md-4">
                <select className="form-control btn btn-primary full-width text-left" id="dishType">
                  {
                    this.state.arrDishes.map((type,i) => (
                      <option key={i} {...this.checkSelected(type)}>{type} </option>
                    ))
                  }
                </select>
              </div>
              <div className="col-lg-1 col-md-2">
                <div>
                  <button id='search-btn' type="button" className="btn btn-warning">Search</button>
                </div>
              </div>
          </div>  
           <Link to="/detail">
            <Dishes />
          </Link>
          
        </div>

      

      </div>
    );
  }
}

export default SelectDish;
