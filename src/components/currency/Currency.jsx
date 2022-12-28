import React, { Component } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default class Currency extends Component {
  render() {
    const style = { color: "white", fontSize: "1.5em" };
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <p style={{ fontWeight: "500", fontSize: "18px" }}>$</p>
        <IoIosArrowDown style={{ height: "10px", marginLeft: "5px" }} />
      </div>
    );
  }
}
