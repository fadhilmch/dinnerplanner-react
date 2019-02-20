import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Detail.css";
import modelInstance from "../data/DinnerModel";


class Detail extends Component {
    constructor(props) {
        super(props);
        // We create the state to store the various statuses
        // e.g. API data loading or error
        console.log(props)
        this.state = {
            status: "LOADING",
            id: this.props.model.getCurrentDish()

        };
    }

    componentDidMount() {
        modelInstance
            .getDish(this.state.id)
            .then(dishes => {
                this.setState({
                    status: "LOADED",
                    dishes: dishes

                });
            })
            .catch(() => {
                this.setState({
                    status: "ERROR"
                });
            });
    }

    handleClick() {

    }

    render() {
        let dish = null;
        let ingredients = null;
        let price = 1;

        switch (this.state.status) {
            case 'LOADING':
                dish = <em>Loading...</em>;
                break;
            case 'LOADED':
                dish = this.state.dishes;
                ingredients = dish.extendedIngredients.map(ingredients => (

                    <tr key = {ingredients.id}>
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
              <div id ='detailComponent' className= 'margin'>
                <div className="row" key ={dish.id}>

                    <div className="col-md-4">
                        <div className='padding_bottom'>
                        <div id='dish-wrapper' >
                            <h4> {dish.title} </h4>
                            <img className="fitImage" src = {dish.image} alt = {dish.title}/>
                            <div className= "padding-top">
                               
                            </div>
                         
                        </div>
                        <button id ='backtoSearch' href="#"  className="btn btn-warning" >Back to Search</button>
                        </div>
                    </div>
                    <div className="col-md-8">
                    <div className='padding_bottom'>
                        <div>
                            <div className='background_table'>
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
                                <button id ='addToMenu' onClick = {() => {this.props.model.addDishToMenu(dish.id)}} href="#" className="btn btn-warning left" >Add to Menu</button>
                            </div>
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