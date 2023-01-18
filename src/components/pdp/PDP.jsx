import React, { Component } from "react";
import { connect } from "react-redux";

import {
  addToCart,
  getProductDetail,
  getAllProducts,
  savePrice,
} from "../../redux/actions";
import p from "./PDP.module.css";
import Nav from "../nav/Nav";
import TagManager from "react-gtm-module";

export class PDP extends Component {
  constructor() {
    super();
    //since i'm not handling details responses in my mocked api, i'll get the current item from the local storage in case a reload happens.
    this.state = {
      storageItem: {},
    };
  }

  componentDidMount() {
    this.props.getAllProducts();
    let a = JSON.parse(localStorage.getItem("currentItem"));
    if (a) {
      this.setState(() => {
        return { storageItem: a };
      });
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.storageItem !== this.state.storageItem) {
      TagManager.dataLayer({
        dataLayer: {
          event: "productDetail",
          ecommerce: {
            detail: {
              products: [
                {
                  id: this.state.storageItem.id,
                  name: this.state.storageItem.productName,
                  price: this.state.storageItem.price,
                  category: this.state.storageItem.category,
                  position: this.state.storageItem.id - 1,
                },
              ],
            },
          },
        },
      });
    }
  }

  handleAddToCart = () => {
    this.props.addToCart(this.state.storageItem.id);
    this.props.savePrice(this.state.storageItem.price);
    TagManager.dataLayer({
      dataLayer: {
        event: "addToCart",
        ecommerce: {
          currencyCode: this.props.USDselected
            ? "USD"
            : this.props.EURselected
            ? "EUR"
            : "JPY",
          add: {
            products: [
              {
                id: this.state.storageItem.id,
                name: this.state.storageItem.productName,
                price: this.state.storageItem.price,
                category: this.state.storageItem.category,
              },
            ],
          },
        },
      },
    });
    // localStorage.setItem("cart", JSON.stringify(this.state.storageItem));
  };

  render() {
    return (
      <>
        <div className={p.container}>
          <div className={p["small-img--container"]}>
            <img
              src={this.props.currentDetail.img || this.state.storageItem.img}
              alt="product_image"
            />
            <img
              src={this.props.currentDetail.img || this.state.storageItem.img}
              alt="product_image"
            />
            <img
              src={this.props.currentDetail.img || this.state.storageItem.img}
              alt="product_image"
            />
          </div>
          <div className={p["big-img--container"]}>
            <img
              src={this.props.currentDetail.img || this.state.storageItem.img}
              alt="product_image"
            />
          </div>
          <div className={p["details--container"]}>
            <h2>
              {this.props.currentDetail.productName ||
                this.state.storageItem.productName}
            </h2>
            <p>
              <strong>SIZE:</strong>
            </p>
            <div className={p["size-details"]}>
              <div>XS</div>
              <div>S</div>
              <div>M</div>
              <div>L</div>
            </div>
            <p>
              <strong>COLOR:</strong>
            </p>
            <div className={p["color-details"]}>
              <div>
                <div className={p["color-details--selected"]}></div>
              </div>
              <div>
                <div></div>
              </div>
              <div>
                <div></div>
              </div>
            </div>
            <p style={{ fontSize: "18px", marginTop: "40px" }}>
              <strong>PRICE:</strong>
            </p>
            <p style={{ fontSize: "24px" }}>
              <strong>
                {this.props.USDselected
                  ? "$" + this.state.storageItem.price
                  : this.props.EURselected
                  ? "€" + this.state.storageItem.price
                  : "¥" + this.state.storageItem.price}
                {/* {this.props.initialProducts
                  ? this.props.initialProducts.find(
                      (i) => i.id == this.state.storageItem.id
                    ).price
                  : "$" + this.props.currentDetail.price ||
                    this.state.storageItem.price} */}

                {/* {this.state.storageItem.price} */}
              </strong>
            </p>
            <button
              className={p["addCart-btn"]}
              onClick={() => this.handleAddToCart()}
            >
              ADD TO CART
            </button>
            <p>
              {this.props.currentDetail.description ||
                this.state.storageItem.description}
            </p>
          </div>
        </div>
      </>
    );
  }
}

export const mapStateToProps = (props) => {
  return {
    currentDetail: props.currentDetail,
    initialProducts: props.initialProducts,
    flag: props.flag,
    EURselected: props.EURselected,
    USDselected: props.USDselected,
    JPYselected: props.JPYselected,
  };
};

export const mapDispatchToProps = {
  addToCart,
  getProductDetail,
  getAllProducts,
  savePrice,
};

export default connect(mapStateToProps, mapDispatchToProps)(PDP);
