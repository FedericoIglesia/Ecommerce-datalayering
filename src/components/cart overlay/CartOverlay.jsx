import React, { Component } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import c from "../cart/Cart.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeItem, savePrice, saveQty } from "../../redux/actions";

export class CartOverlay extends Component {
  constructor() {
    super();
    this.state = {
      displayCart: false,
      // cartItems: JSON.parse(localStorage.getItem("cart")) || [],
      qty: [1],
      totalPrice: 0,
    };
  }

  componentDidMount() {
    // let a = JSON.parse(localStorage.getItem("cart"));
    // if (a) {
    //   if (this.state.cartItems.length == 0) {
    //     this.setState(() => {
    //       return { cartItems: [a] };
    //     });
    //   }
    // }
    this.setState((prev) => {
      return { totalPrice: +this.props.cartItems[0].price };
    });
    console.log(this.state.cartItems);
  }

  toggle = () => {
    this.setState((prev) => ({ displayCart: !prev.displayCart }));
    // this.props.grayedBody(!this.state.displayCart);
  };

  handleSum = (idx) => {
    let newArr = [...this.state.qty];
    newArr[idx] = newArr[idx] + 1;
    console.log(newArr[idx]);
    // newArr.push(1);

    this.setState((prev) => {
      return {
        qty: [...newArr],
        totalPrice: prev.totalPrice + +this.props.cartItems[idx].price,
      };
    });
  };

  handleSub = (idx) => {
    console.log(idx);
    let newArr = [...this.state.qty];
    if (newArr[idx] > 1) {
      newArr[idx] = newArr[idx] - 1;
      this.setState((prev) => {
        return {
          qty: [...newArr],
          totalPrice: prev.totalPrice - this.props.cartItems[idx].price,
        };
      });
    } else {
      this.props.removeItem(idx);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.qty !== this.state.qty) {
      this.props.saveQty(this.state.qty);
    }
    if (prevState.totalPrice !== this.state.price) {
      this.props.savePrice(this.state.totalPrice);
    }
  }

  // handleCartInfo = () => {
  //   this.props.savePrice(this.state.totalPrice);
  //   this.props.saveQty(this.state.qty);
  // };

  render() {
    // let a = JSON.parse(localStorage.getItem("cart"));
    return (
      <div>
        <AiOutlineShoppingCart className={c.icon} onClick={this.toggle} />
        {this.state.displayCart && this.props.cartItems.length > 0 ? (
          <div className={c["cart-container"]}>
            <h2 style={{ margin: "30px 16px" }}>
              My Bag,{" "}
              <span style={{ fontWeight: "400" }}>
                {this.props.cartItems.length == 1
                  ? this.props.cartItems.length + " item"
                  : this.props.cartItems.length + " items"}{" "}
              </span>
            </h2>
            {this.props.cartItems.map((item, idx) => {
              return (
                <div className={c["items-container"]} key={item.id}>
                  <div className={c["details-container"]}>
                    <h3 style={{ fontWeight: "400" }}>{item.productName}</h3>
                    <h3 style={{ marginTop: "-8px" }}>
                      ${item.price * this.props.qty[idx]}
                    </h3>
                    <p style={{ marginTop: "-10px" }}>Size:</p>
                    <div className={c["size-details"]}>
                      <div>
                        <p>XS</p>
                      </div>
                      <div>
                        <p>S</p>
                      </div>
                      <div>
                        <p>M</p>
                      </div>
                      <div>
                        <p>L</p>
                      </div>
                    </div>
                    <p style={{ marginTop: "-10px" }}>Color:</p>
                    <div className={c["color-details"]}>
                      <div>
                        <div className={c["color-details--selected"]}></div>
                      </div>
                      <div>
                        <div></div>
                      </div>
                      <div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                  <div className={c["qty-container"]}>
                    <button
                      className={c["qty-btn"]}
                      onClick={() => this.handleSum(idx)}
                    >
                      +
                    </button>
                    <p
                      className={c.quantity}
                      style={{ fontSize: "15px", marginRight: "3px" }}
                    >
                      {this.props.qty[idx]}
                    </p>
                    <button
                      className={c["qty-btn"]}
                      onClick={() => this.handleSub(idx)}
                    >
                      -
                    </button>
                  </div>
                  <div>
                    <img className={c["item-img"]} src={item.img} />
                  </div>
                </div>
              );
            })}
            <div className={c.totals}>
              <p>
                <strong>Total</strong>
              </p>
              <p>
                <strong>
                  {/* ${this.props.cartItems.reduce((a, b) => a + +b.price, 0)} */}
                  $
                  {this.props.cartItems.length == 0 ? 0 : this.state.totalPrice}
                </strong>
              </p>
            </div>
            <div className={c["checkout-btn-container"]}>
              <Link to="/cart">
                <button className={c["view-bag-btn"]}>VIEW BAG</button>
              </Link>
              <button
                style={{
                  border: "#5ece7b",
                  backgroundColor: "#5ece7b",
                  color: "#fff",
                }}
                className={c["checkout-btn"]}
              >
                CHECK OUT
              </button>
            </div>
          </div>
        ) : (
          <div className={c["no-cart-items"]}>
            {this.state.displayCart && "NO ITEMS IN THE CART"}
          </div>
        )}
      </div>
    );
  }
}

export const mapStateToProps = (props) => {
  return {
    cartItems: props.cartItems,
    flag: props.flag,
    qty: props.qty,
  };
};

export const mapDispatchToProps = {
  removeItem,
  savePrice,
  saveQty,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
