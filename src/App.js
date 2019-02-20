import React, { Component } from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import modelInstance from "./data/DinnerModel";
import SelectDish from "./SelectDish/SelectDish";
import Detail from './Detail/Detail';
import Summary from './Summary/Summary';
import Print from './Print/Print';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Dinner Planner"
    };
  }

  render() {
    return (
      <div>
      <div className="App">
        <header className="App-header">
          {/* <h1 className="title">{this.state.title}</h1> */}
          <nav className="navbar mx-auto fixed title">
              <h1 className='mx-auto'>Dinner Planner</h1>
          </nav>

            {/* We rended diffrent component based on the path */}
            <Route exact path="/" component={Welcome} />
            <Route
              path="/search"
              render={() => <SelectDish model={modelInstance} />}
            />

            <Route 
              path="/detail"
              render={() => <Detail model={modelInstance} />}
              
            />

             <Route 
              path="/summary"
              render={() => <Summary model={modelInstance} />}
              
            />

            <Route 
              path="/print"
              render={() => <Print model={modelInstance} />}
              
            />
          </header>
        </div>
      </div>
    );
  

}
}
export default App;
