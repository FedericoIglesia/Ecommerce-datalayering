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
  }

  render() {
    return (
      <>
        <Nav />
        <section className={c.products}>
          <h2>
            {this.props.initialProducts.length
              ? this.props.initialProducts[0].category[0].toUpperCase() +
                this.props.initialProducts[0].category.slice(1)
              : "Women"}
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
  };
};

export const mapDispatchToProps = {
  getAllProducts,
  filterByCategory,
  selectedCategory,
  getProductDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
