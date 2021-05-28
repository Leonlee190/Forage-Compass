import React, { useState } from "react";
import { LeftBarData } from "./LeftBarData";
import { LeftSubMenu } from "./LeftSubMenu";
import * as biIcons from "react-icons/bi";
import "./LeftBar.css";

function LeftBar() {
  return (
    <>
      <div>
        <biIcons.BiLocationPlus />
      </div>
      <div className="left-menu">
        {LeftBarData.map((item, index) => {
          return <LeftSubMenu item={item} key={index} />;
        })}
      </div>
    </>
  );
}

export default LeftBar;
