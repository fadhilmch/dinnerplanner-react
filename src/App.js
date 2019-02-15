import React, { Component } from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import modelInstance from "./data/DinnerModel";
import SelectDish from "./SelectDish/SelectDish";
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
      <div>
        <nav class="navbar mx-auto fixed title">
            <h1 class='mx-auto'>Dinner Planner</h1>
        </nav>

      </div>
      <div className="App">
        <header className="App-header">
          <h1 className="title">{this.state.title}</h1>

          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome} />
          <Route
            path="/search"
            render={() => <SelectDish model={modelInstance} />}
          />
        </header>
      </div>
      </div>
    );
  }
}

export default App;
