import React, { Component } from "react";
import { connect } from "react-redux";
import c from "./Cart.module.css";
import Nav from "../nav/Nav";
export class Cart extends Component {
  constructor() {
    super();
  }

  // Do i really need to call some action here?...REVIEW
  // componentDidMount(){
  // this.props.getCartItems()
  // }

  render() {
    return (
      <>
        <h2>CART</h2>
        {this.props.cartItems.length > 0 ? (
          this.props.cartItems.map((c) => {
            <div>
              <h4>{this.props.cartItems.productName}</h4>
              <p>{this.props.cartItems.price}</p>
              <p></p>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <p></p>
              <div></div>
              <div></div>
              <div></div>
            </div>;
          })
        ) : (
          <h3>You have no products in the cart yet!</h3>
        )}

        <div>
          <p>
            Tax 21%: <span></span>
          </p>
          <p>
            Quantity: <span></span>
          </p>
          <p>
            Total: <span></span>
          </p>
          <button>ORDER</button>
        </div>
      </>
    );
  }
}

export const mapStateToProps = (props) => {
  return {
    cartItems: props.cartItems,
  };
};

export default connect(mapStateToProps)(Cart);
