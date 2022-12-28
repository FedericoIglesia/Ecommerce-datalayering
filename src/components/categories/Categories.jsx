import React, { Component } from "react";
import Currency from "../currency/Currency";
import CartOverlay from "../cart overlay/CartOverlay";
import Cards from "../cards/Cards";
import c from "./Categories.module.css";
import back from "../../assets/back-icon.png";

export default class Categories extends Component {
  render() {
    return (
      <>
        <nav className={c.nav}>
          <div className={c["nav-container"]}>
            <ul className={c.list}>
              <li>WOMEN</li>
              <li>MEN</li>
              <li>KIDS</li>
            </ul>
            <img src={back} className={c.back} />
            <ul className={c["icons-list"]}>
              <Currency />
              <CartOverlay />
            </ul>
          </div>
        </nav>
        <section className={c.products}>
          <h2>Category name</h2>
          <Cards />
        </section>
      </>
    );
  }
}
