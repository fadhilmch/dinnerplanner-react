import React, { Component } from "react";
// Alternative to passing the moderl as the component property,
// we can import the model instance directly
import modelInstance from "../data/DinnerModel";
import "./Dishes.css";
import { Link } from "react-router-dom";

class Dishes extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.state = {
      status: "LOADING"
     
    };
  }
  


  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount() {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    modelInstance
      .getAllDishes()
      .then(dishes => {
        this.setState({
          status: "LOADED",
          dishes: dishes.results
         
        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  }

  render() {
    let dishesList = null;
    console.log(this.props)

    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case "LOADING":
        dishesList = <em>Loading...</em>;
        break;
        case "LOADED":
        dishesList = this.state.dishes.map(dish => (        
          <Link onClick = {() => {this.props.model.setCurrentDish(dish.id)}}  key ={dish.id} to='/detail' className="col-sm-6 col-md-3 col-lg-2 padding-top">
          <div key ={dish.id} id={dish.id}>
                  <div className="card">
                      <div className='card-img-top'>
                        <div className='image-wrapper'>
                          <img src={'https://spoonacular.com/recipeImages/'+ dish.image}  /> 
                        </div>
                      </div>
                      <div className="card-text" >
                          <p>{dish.title} </p>
                      </div>
                  </div> 

          </div>
           </Link>
      
        ));
        break;
      default:
        dishesList = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div className="Dishes">
        <div className='row'>
        {dishesList}
        </div>
      </div>
    );
  }


}

export default Dishes;
