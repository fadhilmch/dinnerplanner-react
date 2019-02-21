import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Detail.css";
import modelInstance from "../data/DinnerModel";
import { Link } from "react-router-dom";


class Detail extends Component {
    constructor(props) {
        super(props);
        this.model = props.model;
        this.state = {
            status: "LOADING",
            id: this.model.getCurrentDish(),
            numberOfGuests: this.model.getNumberOfGuests(),
            dishes: []
        };
    }

    componentDidMount() {
        this.model.addObserver(this);
        this.model.getDish()
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
    }

    componentWillUnmount() {
        this.model.removeObserver(this);
    };

    addToMenuHandler() {
        this.model.addDishToMenu();
    }

     update() {
        this.setState({
            numberOfGuests: this.model.getNumberOfGuests() 
        });
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
                    <td>{ingredients.amount*this.state.numberOfGuests + ' ' +ingredients.unit} </td>
                    <td> {ingredients.name} </td>
                    <td> {price*this.state.numberOfGuests}</td>
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
                <Sidebar model={this.model} />
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
                                <Link to="/search">
                                    <button id ='backtoSearch' href="#"  className="btn btn-warning" >Back to Search</button>
                                </Link>
                                </div>
                            </div>
                            <div className="col-md-8">
                            <div className='padding_bottom'>
                                <div>
                                    <div className='background_table'>
                                        <div id='guestIngredients'>
                                            <h5 className="left"> INGREDIENTS FOR {this.state.numberOfGuests}  PEOPLE</h5>
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
                                        {/* <Link to='/search'> */}
                                        <button id ='addToMenu' onClick = {() => this.addToMenuHandler()} href="#" className="btn btn-warning left" >Add to Menu</button>
                                        {/* </Link> */}
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