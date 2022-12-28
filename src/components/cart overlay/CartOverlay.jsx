import React, { Component } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import co from "../cart overlay/CartOverlay.module.css";

export default class CartOverlay extends Component {
  render() {
    return (
      <div>
        <AiOutlineShoppingCart className={co.icon} />
      </div>
    );
  }
}
