import React, { Component } from "react";
import { AiTwotoneRightCircle } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import cu from "./Currency.module.css";
import { convertCurrency } from "../../redux/actions";
import { connect } from "react-redux";

export class Currency extends Component {
  constructor() {
    super();
    this.state = {
      display: false,
    };
    this.currRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutSide);
  }

  handleClickOutSide = (e) => {
    if (this.currRef.current && !this.currRef.current.contains(e.target)) {
      this.setState({ display: false });
    }
  };

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutSide);
  }

  toggle = () => {
    this.setState((prev) => {
      return { display: !prev.display };
    });
  };

  handleCurrency = (e) => {
    this.props.convertCurrency(e.target.value);
  };

  render() {
    return (
      <div
        style={{ display: "flex", alignItems: "center" }}
        className={cu["currency-container"]}
        ref={this.currRef}
      >
        <p
          style={{ fontWeight: "500", fontSize: "18px" }}
          onClick={this.toggle}
        >
          $
        </p>
        <IoIosArrowDown
          style={{ height: "10px", marginLeft: "5px" }}
          onClick={this.toggle}
        />
        {this.state.display && (
          <div className={cu["currency-options"]}>
            <button
              value="usd"
              onClick={this.handleCurrency}
              style={this.props.USDselected ? { background: "#eeeeee" } : {}}
            >
              $ USD
            </button>
            <button
              value="eur"
              onClick={this.handleCurrency}
              style={this.props.EURselected ? { background: "#eeeeee" } : {}}
            >
              € EUR
            </button>
            <button
              value="jpy"
              onClick={this.handleCurrency}
              style={this.props.JPYselected ? { background: "#eeeeee" } : {}}
            >
              ¥ JPY
            </button>
          </div>
        )}
      </div>
    );
  }
}

export const mapStateToProps = (props) => {
  return {
    initialProducts: props.initialProducts,
    EURselected: props.EURselected,
    USDselected: props.USDselected,
    JPYselected: props.JPYselected,
  };
};

export const mapDispatchToProps = {
  convertCurrency,
};

export default connect(mapStateToProps, mapDispatchToProps)(Currency);
