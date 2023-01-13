import React, { Component } from "react";
import { connect } from "react-redux";
import ca from "./Cart.module.css";
import Nav from "../nav/Nav";
import { removeItem, savePrice, saveQty } from "../../redux/actions";
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

  componentDidMount() {
    this.setState(() => {
      return { totalPrice: +this.props.cartItems[0].price };
    });
  }

  handleSum = (idx) => {
    let newArr = [...this.state.qty];
    newArr[idx] = newArr[idx] + 1;
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
      this.props.savePrice(0);
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

  render() {
    return (
      <>
        <h2>CART</h2>
        {this.props.cartItems.length > 0 ? (
          this.props.cartItems.map((item, idx) => {
            return (
              <div className={ca["items-container"]} key={item.id}>
                <div className={ca["details-container"]}>
                  <h3 style={{ fontWeight: "400" }}>{item.productName}</h3>
                  <h3 style={{ marginTop: "-8px" }}>
                    ${item.price * this.props.qty[idx]}
                  </h3>
                  <p style={{ marginTop: "-10px" }}>SIZE:</p>
                  <div className={ca["size-details"]}>
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
                  <p style={{ marginTop: "-10px" }}>COLOR:</p>
                  <div className={ca["color-details"]}>
                    <div>
                      <div className={ca["color-details--selected"]}></div>
                    </div>
                    <div>
                      <div></div>
                    </div>
                    <div>
                      <div></div>
                    </div>
                  </div>
                </div>
                <div className={ca["qty-container"]}>
                  <button
                    className={ca["qty-btn"]}
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
                  <img className={ca["item-img"]} src={item.img} />
                </div>
              </div>
            );
          })
        ) : (
          <h3>You have no products in the cart yet!</h3>
        )}

        <div>
          <p>
            Tax 21%:{" "}
            <span>
              $
              {this.props.cartItems.length == 0
                ? 0
                : this.props.totalPrice * 0.42}
            </span>
          </p>
          <p>
            Quantity: <span>{this.props.qty.reduce((a, b) => a + b, 0)}</span>
          </p>
          <p>
            Total:{" "}
            <span>
              ${this.props.cartItems.length == 0 ? 0 : this.props.totalPrice}
            </span>
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
    flag: props.flag,
    qty: props.qty,
    totalPrice: props.totalPrice,
  };
};

export const mapDispatchToProps = {
  removeItem,
  savePrice,
  saveQty,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
