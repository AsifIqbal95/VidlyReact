import React, { Component } from "react";
import "./App.css";
import Movies from "./components/Movies";
import NavBar from "./components/common/NavBar";
import Customers from "./components/Customers";
import NotFound from "./components/NotFound";
import Rentals from "./components/Rentals";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import MovieForm from "./components/movieForm";
import Login from "./components/loginForm";

class App extends Component {
  routes = [
    { name: "Movies", to: "/movies" },
    { name: "Customers", to: "/customers" },
    { name: "Rentals", to: "/rentals" },
    { name: "Login", to: "/login" }
  ];

  render() {
    return (
      <React.Fragment>
        <NavBar links={this.routes} brand="Vidly" />
        <main className="container">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Redirect exact from="/" to="/movies" />
            <Route component={NotFound} />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
