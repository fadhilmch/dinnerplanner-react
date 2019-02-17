import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Dishes from "../Dishes/Dishes";
import "./SelectDish.css";
import { Link } from "react-router-dom";
import Detail from "../Detail/Detail";

class SelectDish extends Component {

  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    console.log(props)
    this.state = {
      type: this.props.model.getDishType()
    };
  }

  render() {
    let dishType = null;

      <Sidebar model={this.props.model} />
      dishType = this.state.type.map(type => (
      <div>
        <div className="SelectDish">
            <h3>Find a Dish</h3>
            <div className="row">
                <div className="col-lg-3 col-md-6">
                  <input className ="form-control full-width" placeholder="Enter key words" />
                </div>
                <div className="col-lg-2 col-md-4">
                  <select className="form-control btn btn-primary full-width text-left" id="dishType">
                  {type}
                  </select>
                </div>
                <div className="col-lg-1 col-md-2">
                  <div>
                    <button id='search-btn' type="button" className="btn btn-warning">Search</button>
                  </div>
                </div>
            </div>  
             <Dishes model={this.props.model}/>
          </div>
        </div>
      ));

   

    return (
      dishType
  );

      
  
  }
}

export default SelectDish;
