import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart/Cart";
import Default from "./components/Default";
import Details from "./components/Details";
import Modal from "./components/Modal";

export default class App extends Component {
  render() {
    return (
      <>
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/" component={ProductList}></Route>
          <Route path="/details" component={Details}></Route>
          <Route path="/cart" component={Cart}></Route>
          <Route component={Default}></Route>
        </Switch>
        <Modal></Modal>
      </>
    );
  }
}
