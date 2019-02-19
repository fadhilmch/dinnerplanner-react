import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Dishes from "../Dishes/Dishes";
import "./SelectDish.css";

class SelectDish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDishes : ['all', 'appetizer', 'breakfast', 'dessert','dinner', 'drink', 'lunch' , 'main course', 'main dish','sauce', 'side dish',  'snack'],
      query: '',
      selectedType: 'all',
    };
  };

  checkSelected = (type) => {
    console.log((type.toLowerCase() === this.state.selectedType)?'selected':'');
    return (type.toLowerCase() === this.state.selectedType);
  };

  toTitleCase = (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  }

  handleSearch = () => {
    console.log('search: '+this.state.query + ' '+ this.state.selectedType)
    // this.props.model.fetchSearch();
  }

  handleType = (e) => {
    this.setState({selectedType: e.target.value.toLowerCase()});
  }

  handleQuery = (e) => {
    this.setState({query: e.target.value});
  }

  render() {
    return (
      <div>
      <Sidebar model={this.props.model} />
        <div className="SelectDish">
          <h3>Find a Dish</h3>
          <div className="row">
              <div className="col-lg-3 col-md-6">
                <input className ="form-control full-width" placeholder="Enter key words" value={this.state.query} onChange={this.handleQuery} />
              </div>
              <div className="col-lg-2 col-md-4">
                <select className="form-control btn btn-primary full-width text-left" id="dishType" onChange={this.handleType} value={this.state.selectedType}>
                  {
                    this.state.arrDishes.map((type,i) => (
                      <option key={'type-'+i} value={type}>{this.toTitleCase(type)} </option>
                    ))
                  }
                </select>
              </div>
              <div className="col-lg-1 col-md-2">
                <div>
                  <button id='search-btn' type="button" className="btn btn-warning" onClick={this.handleSearch}>Search</button>
                </div>
            </div>  
             <Dishes model={this.props.model}/>
          </div>
        </div>
        </div>
    )
  }
}

export default SelectDish;
