import React, { Component } from "react";
import "./Dishes.css";
import { Link } from "react-router-dom";

class Dishes extends Component {
  constructor(props) {
    super(props);
    this.model = this.props.model;
    this.state = {
      status: "LOADING",
      dishes: [],
    };
  };

  componentWillUnmount() {
      this.model.removeObserver(this);
  };
  
  componentDidMount() {
    this.model.addObserver(this);
    this.model.getAllDishes()
      .then(dishes => {
        this.setState({
          status: "LOADED",
          dishes
        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  };

  update() {
    this.setState({status: 'LOADING'});
    this.props.model.getAllDishes()
    .then(dishes => {
      this.setState({
        status: "LOADED",
        dishes
      });
    })
    .catch(() => {
      this.setState({
        status: "ERROR"
      });
    });
  };

  render() {
    let dishesList = null;
    switch (this.state.status) {

      case "LOADING":
        dishesList = <em>Loading...</em>;
        break;

      case "LOADED":
        dishesList = this.state.dishes.map(dish => (        
          <Link onClick = {() => {this.model.setCurrentDish(dish.id)}}  key ={dish.id} to='/detail' className="col-sm-6 col-md-3 col-lg-2 padding-top">
          <div key ={dish.id} id={dish.id}>
                  <div className ="max_height">
                    <div className = "card">
                      <div className='card-img-top'>
                        <div className='image-wrapper'>
                          <img src={'https://spoonacular.com/recipeImages/'+ dish.image}  /> 
                        </div>
                      </div>
                      <div className="card-text center_txt">
                          <p>{dish.title} </p>
                      </div>
                    </div> 
                  </div>

          </div>
           </Link>
      
        ));
        break;

      default:
        dishesList = <b>Failed to load data, please try again</b>;
        break;
    };

    return (
      <div className="Dishes">
        <div className='row'>
        {dishesList}
        </div>
      </div>
    );
  };
};

export default Dishes;
