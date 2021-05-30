import React, { useState } from "react";
import { LeftBarData } from "./LeftBarData";
import { LeftSubMenu } from "./LeftSubMenu";
import Popup from "../Popup/Popup";
import * as biIcons from "react-icons/bi";
import { Link } from "react-router-dom";
import "./LeftBar.css";

function LeftBar() {
  const [isOpen, setIsOpen] = useState(false);
  var infoPackage;

  const togglePopup = () => {
    setIsOpen(!isOpen);
    console.log("open... close... open... close...");
  };

  const pushItUp = (dataPackage) => {
    console.log("pushin' it up up up...");
    console.log(dataPackage);
  };

  return (
    <>
      <div>
        <Link to="#" className="add-button" onClick={togglePopup}>
          <biIcons.BiLocationPlus />
        </Link>
        {isOpen && <Popup handleClose={togglePopup} pushItUp={pushItUp} />}
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
