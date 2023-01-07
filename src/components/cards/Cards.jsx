import React, { Component } from "react";
import c from "../categories/Categories.module.css";

export default class Cards extends Component {
  render() {
    return (
      <>
        <div className={c["card-container"]}>
          <img src={this.props.img} className={c.img} />
          <p>{this.props.name}</p>
          <p>${this.props.price}</p>
        </div>
      </>
    );
  }
}
