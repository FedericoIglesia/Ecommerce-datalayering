import React, { Component } from "react";
import { connect } from "react-redux";
import ca from "./Cart.module.css";
import Nav from "../nav/Nav";
import {
  removeItem,
  savePrice,
  saveQty,
  addQty,
  subQty,
} from "../../redux/actions";
export class Cart extends Component {
  constructor() {
    super();
    this.state = {
      displayCart: false,
      // cartItems: JSON.parse(localStorage.getItem("cart")) || [],
      qty: [1],
      totalPrice: 0,
    };
  }

  // componentDidMount() {
  //   this.setState(() => {
  //     return { totalPrice: +this.props.cartItems[0].price };
  //   });
  // }

  // handleSum = (idx) => {
  //   let newArr = [...this.state.qty];
  //   newArr[idx] = newArr[idx] + 1;
  //   // newArr.push(1);

  //   this.setState((prev) => {
  //     return {
  //       qty: [...newArr],
  //       totalPrice: prev.totalPrice + +this.props.cartItems[idx].price,
  //     };
  //   });
  // };

  handleSum = (idx) => {
    this.props.addQty(idx);
    this.props.savePrice(
      this.props.cartItems[idx].price * this.props.cartItems[idx].qty
    );
  };

  // handleSub = (idx) => {
  //   console.log(idx);
  //   let newArr = [...this.state.qty];
  //   if (newArr[idx] > 1) {
  //     newArr[idx] = newArr[idx] - 1;

  //     this.setState((prev) => {
  //       return {
  //         qty: [...newArr],
  //         totalPrice: prev.totalPrice - this.props.cartItems[idx].price,
  //       };
  //     });
  //   } else {
  //     this.props.savePrice(0);
  //     this.props.removeItem(idx);
  //   }
  // };

  handleSub = (idx) => {
    this.props.subQty(idx);
    this.props.savePrice(
      this.props.cartItems[idx].price * this.props.cartItems[idx].qty
    );
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.qty !== this.state.qty) {
  //     this.props.saveQty(this.state.qty);
  //   }
  //   if (prevState.totalPrice !== this.state.price) {
  //     this.props.savePrice(this.state.totalPrice);
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.qty !== this.state.qty) {
      this.props.saveQty(this.state.qty);
    }
  }

  render() {
    return (
      <>
        <h2 className={ca["cart-title"]}>CART</h2>
        {this.props.cartItems.length > 0 ? (
          this.props.cartItems.map((item, idx) => {
            return (
              <div className={ca["cart-items-container"]} key={item.id}>
                <div className={ca["cart-details-container"]}>
                  <div className={ca["cart-name-details"]}>
                    <h3 style={{ fontWeight: "400" }}>{item.productName}</h3>
                    <h3 style={{ marginTop: "-8px" }}>
                      {this.props.USDselected
                        ? "$" + item.price * this.props.qty[idx]
                        : this.props.EURselected
                        ? "€" + item.price * this.props.qty[idx]
                        : "¥" + (item.price * this.props.qty[idx]).toFixed(2)}
                    </h3>
                    <p style={{ marginTop: "-10px" }}>
                      <strong>SIZE:</strong>
                    </p>
                    <div className={ca["cart-size-details"]}>
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
                    <p style={{ marginTop: "-10px" }}>
                      <strong>COLOR:</strong>
                    </p>
                    <div className={ca["cart-color-details"]}>
                      <div>
                        <div
                          className={ca["cart-color-details--selected"]}
                        ></div>
                      </div>
                      <div>
                        <div></div>
                      </div>
                      <div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={ca["cart-qty-img"]}>
                  <div className={ca["cart-qty-container"]}>
                    <button
                      className={ca["cart-qty-btn"]}
                      onClick={() => this.handleSum(idx)}
                    >
                      +
                    </button>
                    <p
                      className={ca.quantity}
                      style={{ fontSize: "15px", marginRight: "3px" }}
                    >
                      {this.props.qty[idx]}
                    </p>
                    <button
                      className={ca["qty-btn"]}
                      onClick={() => this.handleSub(idx)}
                    >
                      -
                    </button>
                  </div>
                  <div>
                    <img className={ca["cart-item-img"]} src={item.img} />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h3 className={ca["cart-final-details"]}>
            You have no products in the cart yet!
          </h3>
        )}

        <div className={ca["cart-final-details"]}>
          <p>
            Tax 21%:{" "}
            <span>
              {this.props.cartItems.length == 0
                ? 0
                : this.props.USDselected
                ? "$" +
                  (
                    this.props.cartItems.reduce(
                      (a, b) => a + +b.price * +b.qty,
                      0
                    ) * 0.42
                  ).toFixed(2)
                : this.props.EURselected
                ? "€" +
                  (
                    this.props.cartItems.reduce(
                      (a, b) => a + +b.price * +b.qty,
                      0
                    ) * 0.42
                  ).toFixed(2)
                : "¥" +
                  (
                    this.props.cartItems.reduce(
                      (a, b) => a + +b.price * +b.qty,
                      0
                    ) * 0.42
                  ).toFixed(2)}
            </span>
          </p>
          <p>
            Quantity:{" "}
            <span>{this.props.cartItems.reduce((a, b) => a + +b.qty, 0)}</span>
          </p>
          <p>
            Total:{" "}
            <span>
              {this.props.cartItems.length == 0
                ? 0
                : this.props.USDselected
                ? "$" +
                  this.props.cartItems.reduce(
                    (a, b) => a + +b.price * +b.qty,
                    0
                  )
                : this.props.EURselected
                ? "€" +
                  this.props.cartItems.reduce(
                    (a, b) => a + +b.price * +b.qty,
                    0
                  )
                : "¥" +
                  this.props.cartItems.reduce(
                    (a, b) => a + +b.price * +b.qty,
                    0
                  )}
            </span>
          </p>
          <button
            className={ca["checkout-btn"]}
            style={{
              border: "#5ece7b",
              backgroundColor: "#5ece7b",
              color: "#fff",
              width: "279px",
              height: "43px",
            }}
          >
            ORDER
          </button>
        </div>
      </>
    );
  }
}

export const mapStateToProps = (props) => {
  return {
    cartItems: props.cartItems,
    flag: props.flag,
    qty: props.qty,
    totalPrice: props.totalPrice,
    EURselected: props.EURselected,
    USDselected: props.USDselected,
    JPYselected: props.JPYselected,
  };
};

export const mapDispatchToProps = {
  removeItem,
  savePrice,
  saveQty,
  addQty,
  subQty,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
