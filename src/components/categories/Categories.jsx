import React, { Component } from "react";
import Nav from "../nav/Nav";
import Cards from "../cards/Cards";
import c from "./Categories.module.css";

import { connect } from "react-redux";
import {
  getAllProducts,
  filterByCategory,
  selectedCategory,
  getProductDetail,
} from "../../redux/actions";
import { Link } from "react-router-dom";
import { current } from "@reduxjs/toolkit";
import TagManager from "react-gtm-module";

export class Categories extends Component {
  constructor() {
    super();

    this.handleProductDetail = this.handleProductDetail.bind(this);
  }

  componentDidMount() {
    this.props.getAllProducts();
  }

  handleProductDetail(e) {
    localStorage.setItem("currentItem", JSON.stringify(e));
    this.props.getProductDetail(e.id);
    TagManager.dataLayer({
      dataLayer: {
        event: "productClick",
        ecommerce: {
          click: {
            actionField: { list: "list" },
            products: [
              {
                id: e.id,
                name: e.productName,
                price: e.price,
                category: e.category,
                position: e.id - 1,
              },
            ],
          },
        },
      },
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.initialProducts !== this.props.initialProducts) {
      TagManager.dataLayer({
        dataLayer: {
          event: "productImpression",
          ecommerce: {
            currencyCode: this.props.USDselected
              ? "USD"
              : this.props.EURselected
              ? "EUR"
              : "JPY",
            impressions: [
              {
                id: this.props.products.map((p) => p.id),
                name: this.props.products.map((p) => p.productName),
                price: this.props.initialProducts
                  .map((p) => p.price)
                  .concat(this.props.products.map((p) => p.price).slice(6)),
                category: this.props.products.map((p) => p.category),
                position: this.props.products.map((p, idx) => idx + 1),
              },
            ],
          },
        },
      });
    }
  }

  render() {
    return (
      <>
        <section className={c.products}>
          <h2>
            {this.props.initialProducts.length
              ? this.props.initialProducts[0].category[0].toUpperCase() +
                this.props.initialProducts[0].category.slice(1)
              : "Loading"}
          </h2>
          <div
            className={c["products-container"]}
            style={{ marginTop: "10rem" }}
          >
            {this.props.initialProducts ? (
              this.props.initialProducts.map((e) => (
                <Link
                  key={e.id}
                  to="pdp"
                  onClick={() => this.handleProductDetail(e)}
                >
                  <Cards
                    key={e.id}
                    name={e.productName}
                    img={e.img}
                    description={e.description}
                    category={e.category}
                    price={e.price}
                    id={e.id}
                  />
                </Link>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </section>
      </>
    );
  }
}

export const mapStateToProps = (props) => {
  return {
    initialProducts: props.initialProducts,
    flag: props.flag,
    products: props.products,
    USDselected: props.USDselected,
    EURselected: props.EURselected,
    JPYselected: props.JPYselected,
  };
};

export const mapDispatchToProps = {
  getAllProducts,
  filterByCategory,
  selectedCategory,
  getProductDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
