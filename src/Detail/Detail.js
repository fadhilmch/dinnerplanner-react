import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Detail.css";
import { Link } from "react-router-dom";
import modelInstance from "../data/DinnerModel";

class Detail extends Component {
	constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.state = {
        status: "LOADING"
      
    };
}

  componentDidMount() {
    // when data is retrieved we update the state
    // this will cause the component to re-render
   
    modelInstance
      .getDish(684100)
      .then(dishes => {
        this.setState({
          status: "LOADED",
          dishes: dishes	

        });
        console.log(dishes);
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });

  }

	render(){
		let dish = null;
		let ingredients = null;
		let price =1;
		switch(this.state.status){
		case 'LOADING':
		  dish = <em>Loading...</em>;
		break;
		case 'LOADED':
		dish = this.state.dishes;
		ingredients = dish.extendedIngredients.map(ingredients =>(
			<tr>
				<td>{ingredients.amount + ' ' +ingredients.unit} </td>
				<td> {ingredients.name} </td>
				<td> {price}</td>
                <td>SEK</td>
			</tr>

		));
		
		break;

		default:
        dish = <b>Failed to load data, please try again</b>;
        break;

		}

		return (
		<div>
		 <Sidebar model={this.props.model} />
		 <div className="Detail">
              <div id ='detailComponent'>
                <div className="row">
                    <div className="col-md-4">
                        <div id='dish-wrapper'>
                        	<h4> {dish.title} </h4>
		 					<img className="fitImage" src = {dish.image} />
                        </div>
                        <a id ='backtoSearch'href="#" className="btn btn-warning">Back to Search</a>
                    </div>
                    <div className="col-md-8">
                        <div>
                            <div>
                                <div id='guestIngredients'>
                                    <h5 className="left"> INGREDIENTS FOR {this.state.guest}  PEOPLE</h5>
                                </div>
                                <div className="left">
                                    <div className="table-responsive">
                                        <table className="table" >
                                            <tbody id="ingredients-wrapper">
                                            {ingredients}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <a id ='addToMenu'href="#" className="btn btn-warning left" >Add to Menu</a>
                            </div>
                        </div>
                    </div>
                </div>
                 
                    
                <div>
                    <h4>PREPARATION</h4>
                    <div>
                        <div id="dish-preparation">
                            <p>
                            {dish.instructions}
                            </p>
                        </div>
                    </div>
                </div>
                </div>
                <div>
                   
                </div>
   
		 	
		 </div>

		 </div>

		 )

}
}

export default Detail


