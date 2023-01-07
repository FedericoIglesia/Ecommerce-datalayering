import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions";
import p from "./PDP.module.css";

export class PDP extends Component {
  render() {
    return (
      <div className={p.container}>
        <div className={p["small-img--container"]}>
          <img src={this.props.currentDetail.img} alt="product_image" />
          <img src={this.props.currentDetail.img} alt="product_image" />
          <img src={this.props.currentDetail.img} alt="product_image" />
        </div>
        <div className={p["big-img--container"]}>
          <img src={this.props.currentDetail.img} alt="product_image" />
        </div>
        <div className={p["details--container"]}>
          <h2>{this.props.currentDetail.productName}</h2>
          <p>SIZE: </p>
          <div>XS</div>
          <div>S</div>
          <div>M</div>
          <div>L</div>
          <p>COLOR:</p>
          <div></div>
          <div></div>
          <div></div>
          <p>PRICE:</p>
          <p>{this.props.currentDetail.price}</p>
          <button>ADD TO CART</button>
          <p>{this.props.currentDetail.description}</p>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (props) => {
  return {
    currentDetail: props.currentDetail,
  };
};

export const mapDispatchToProps = {
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(PDP);
