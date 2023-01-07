import React, { Component } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import c from "../cart/Cart.module.css";
import { Link } from "react-router-dom";

export default class CartOverlay extends Component {
  constructor() {
    super();
    this.state = {
      displayCart: false,
    };
  }

  // toggle(){
  // this.setState(prev => prev.displayCart = !prev.displayCart)
  // }

  render() {
    return (
      <div>
        <AiOutlineShoppingCart
          className={c.icon}
          onClick={() =>
            this.setState((prev) => ({ displayCart: !prev.displayCart }))
          }
        />
        {this.state.displayCart && (
          <div className={c["cart-container"]}>
            <h2>
              My Bag, <span>n° items</span>
            </h2>
            <div className={c["items-container"]}>
              <div className={c["details-container"]}>
                <h3>item name</h3>
                <h3>price</h3>
                <p>Size:</p>
                <div className={c["item-size"]}>XS</div>
                <div className={c["item-size"]}>S</div>
                <div className={c["item-size"]}>M</div>
                <div className={c["item-size"]}>L</div>
                <p>Color:</p>
                <div className={c["item-color"]}></div>
                <div className={c["item-color"]}></div>
                <div className={c["item-color"]}></div>
              </div>
              <div className={c["qty-container"]}>
                <div className={c["qty-btn"]}>+</div>
                <p>qty</p>
                <div className={c["qty-btn"]}>-</div>
              </div>
              <div className={c["item-img"]}>
                <img />
              </div>
            </div>
            <div className={c.totals}>
              <p>Total</p>
              <p>$</p>
            </div>
            <div className={c["checkout-btn-container"]}>
              <button>VIEW BAG</button>
              <Link to="/cart">
                <button>CHECK OUT</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

// export const mapStateToProps = (props) => {
//   return {
//     initialProducts: props.initialProducts,
//   };
// };

// export const mapDispatchToProps = {

// };

// export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
