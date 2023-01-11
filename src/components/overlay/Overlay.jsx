import React, { Component } from "react";
import { connect } from "react-redux";

export class Overlay extends Component {
  render() {
    return (
      <div
        style={
          this.props.flag
            ? {
                background: "rgba(57, 55, 72, 0.22)",
                maxWidth: "100%",
                height: "100vmax",
                position: "relative",
              }
            : {}
        }
      ></div>
    );
  }
}

export const mapStateToProps = (props) => {
  return {
    flag: props.flag,
  };
};

export default connect(mapStateToProps)(Overlay);
