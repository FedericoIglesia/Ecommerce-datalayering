import React, { Component } from "react";
import Nav from "../nav/Nav";
import CartOverlay from "../cart overlay/CartOverlay";
import Currency from "../currency/Currency";
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

export class Categories extends Component {
  constructor() {
    super();
    // this.state = {
    //   selected: "women",
    // };
    this.handleProductDetail = this.handleProductDetail.bind(this);
  }

  componentDidMount() {
    this.props.getAllProducts();
  }

  // handleCategory = (e) => {
  //   this.props.filterByCategory(e.target.value);
  //   e.target.value === "men"
  //     ? this.setState(() => {
  //         return { selected: "men" };
  //       })
  //     : e.target.value === "kids"
  //     ? this.setState(() => {
  //         return { selected: "kids" };
  //       })
  //     : this.setState(() => {
  //         return { selected: "women" };
  //       });
  // };

  handleProductDetail(e) {
    this.props.getProductDetail(e.id);
  }

  render() {
    return (
      <>
        <Nav />
        {/* <nav className={c.nav}>
          <div className={c["nav-container"]}>
            <ul className={c.list}>
              <button
                onClick={this.handleCategory}
                value="women"
                style={
                  this.state.selected == "women"
                    ? { borderBottom: "2px solid #5ece7b", color: "#5ece7b" }
                    : {}
                }
              >
                WOMEN
              </button>
              <button
                onClick={this.handleCategory}
                value="men"
                style={
                  this.state.selected == "men"
                    ? { borderBottom: "2px solid #5ece7b", color: "#5ece7b" }
                    : {}
                }
              >
                MEN
              </button>
              <button
                onClick={this.handleCategory}
                value="kids"
                style={
                  this.state.selected == "kids"
                    ? { borderBottom: "2px solid #5ece7b", color: "#5ece7b" }
                    : {}
                }
              >
                KIDS
              </button>
            </ul>
            <img src={back} className={c.back} />
            <ul className={c["icons-list"]}>
              <Currency />
              <CartOverlay />
            </ul>
          </div>
        </nav> */}
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
