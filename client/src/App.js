import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Default from "./components/Default";
import Cart from "./components/Cart";
import Modal from "./components/Modal";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LogoutPage from './pages/LogoutPage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
        <Navbar />
        <div className="container">
        <Switch>
          <Route path="/products"><ProductList /></Route>
          <Route path="/details"><Details /></Route>
          <Route path="/cart"><Cart /></Route> 
          <Route exact path="/"> <LoginPage /> </Route>
          <Route path="/register"> <RegisterPage /></Route>
          <Route path="/logout"> <LogoutPage /></Route>
          <Route component={Default} />
        </Switch>
        </div>
        <Modal />
        </Router>
      </div>
    );
  }
}

export default App;
