import React from "react";
import Categories from "./components/categories/Categories";
import Cart from "./components/cart/Cart";
import PDP from "./components/pdp/PDP";
import Nav from "./components/nav/Nav";
import Overlay from "./components/overlay/Overlay";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import TagManager from "react-gtm-module";

const TagManagerArgs = {
  gtmId: "GTM-MMBD7SG",
};

TagManager.initialize(TagManagerArgs);

export const US = Intl.NumberFormat("en-us", {
  currency: "USD",
  style: "currency",
});

// Tried using Latvian locale but the Euro sign shows up after the number, not sure if that is correct
export const EU = Intl.NumberFormat("nl-NL", {
  currency: "EUR",
  style: "currency",
});
export const JA = Intl.NumberFormat("ja-JP", {
  currency: "JPY",
  style: "currency",
});

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      exit: false,
    };
  }

  render() {
    return (
      <BrowserRouter>
        <Nav />
        <Overlay />
        <Routes>
          <Route exact path="/" element={<Categories />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pdp" element={<PDP />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export const mapStateToProps = (props) => {
  return {
    flag: props.flag,
  };
};

export default connect(mapStateToProps)(App);
