import React, { Component } from "react";
import Currency from "../currency/Currency";
import CartOverlay from "../cart overlay/CartOverlay";
import c from "../categories/Categories.module.css";
import { filterByCategory } from "../../redux/actions";
import { connect } from "react-redux";
import back from "../../assets/back-icon.png";
import { Link } from "react-router-dom";

export class Nav extends Component {
  constructor() {
    super();
    this.state = {
      selected: "women",
    };
  }

  handleCategory = (e) => {
    this.props.filterByCategory(e.target.value);
    e.target.value === "men"
      ? this.setState(() => {
          return { selected: "men" };
        })
      : e.target.value === "kids"
      ? this.setState(() => {
          return { selected: "kids" };
        })
      : this.setState(() => {
          return { selected: "women" };
        });
  };

  render() {
    return (
      <div>
        <nav className={c.nav}>
          <div className={c["nav-container"]}>
            <ul className={c.list}>
              <Link to="/">
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
              </Link>
              <Link to="/">
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
              </Link>
              <Link to="/">
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
              </Link>
            </ul>
            <img src={back} className={c.back} />
            <ul className={c["icons-list"]}>
              <Currency />
              <CartOverlay />
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export const mapStateToProps = (props) => {
  return {
    initialProducts: props.initialProducts,
  };
};

export const mapDispatchToProps = {
  filterByCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
