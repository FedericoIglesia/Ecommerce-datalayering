import React, { Component } from "react";
import c from "../categories/Categories.module.css";
import { connect } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { US, EU, JA } from "../../App";

export class Cards extends Component {
  render() {
    return (
      <>
        <div
          className={
            this.props.cartItems.some((i) => i.id === this.props.id)
              ? c["card-container-shadow"]
              : c["card-container"]
          }
        >
          <img src={this.props.img} className={c.img} />
          <p
            style={
              this.props.cartItems.some((i) => i.id === this.props.id)
                ? { transform: "translate(-6rem,1rem)" }
                : {}
            }
          >
            {this.props.name}
          </p>
          <p
            style={
              this.props.cartItems.some((i) => i.id === this.props.id)
                ? { transform: "translate(-5.5rem,0.1rem)" }
                : {}
            }
          >
            <strong>
              {this.props.USDselected
                ? US.format(this.props.price)
                : this.props.EURselected
                ? EU.format(this.props.price)
                : JA.format(this.props.price)}
            </strong>
          </p>
          {this.props.cartItems.some((i) => i.id === this.props.id) && (
            <div className={c["card-item-cart"]}>
              <AiOutlineShoppingCart
                color="white"
                className={c["card-cart-icon"]}
              />
            </div>
          )}
        </div>
      </>
    );
  }
}

export const mapStateToProps = (props) => {
  return {
    cartItems: props.cartItems,
    EURselected: props.EURselected,
    USDselected: props.USDselected,
    JPYselected: props.JPYselected,
  };
};

export default connect(mapStateToProps)(Cards);
