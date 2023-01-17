import React, { Component } from "react";
import c from "../categories/Categories.module.css";
import { connect } from "react-redux";

export class Cards extends Component {
  render() {
    return (
      <>
        <div className={c["card-container"]}>
          <img src={this.props.img} className={c.img} />
          <p>{this.props.name}</p>
          <p>
            <strong>
              {this.props.USDselected
                ? "$" + this.props.price
                : this.props.EURselected
                ? "€" + this.props.price
                : "¥" + this.props.price}
            </strong>
          </p>
        </div>
      </>
    );
  }
}

export const mapStateToProps = (props) => {
  return {
    EURselected: props.EURselected,
    USDselected: props.USDselected,
    JPYselected: props.JPYselected,
  };
};

export default connect(mapStateToProps)(Cards);
