import React, { Component } from "react";
import { connect } from "react-redux";

export class Overlay extends Component {
  render() {
    return (
      <div
        style={
          this.props.flag
            ? {
                background: "rgba(57, 55, 72, 0.42)",
                width: "100vw",
                height: "95vh",
                position: "absolute",
                zIndex: 1,
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
