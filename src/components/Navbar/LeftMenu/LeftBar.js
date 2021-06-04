import React, { useState } from "react";
import { LeftBarData } from "./LeftBarData";
import { LeftSubMenu } from "./LeftSubMenu";
import Popup from "../Popup/Popup";
import * as biIcons from "react-icons/bi";
import { Link } from "react-router-dom";
import "./LeftBar.css";

function LeftBar(props) {
  const [isOpen, setIsOpen] = useState(false);

  // opens and closes the pop up window.
  const togglePopup = () => {
    setIsOpen(!isOpen);
    console.log("open... close... open... close...");
  };
  // this is the prop drilling function, sending it up.
  const pushItUp = (dataPackage) => {
    console.log("Data package in Left Bar");
    // prop pushes it to Nav Bar...
    props.pushItNav(dataPackage);
  };

  return (
    <>
      <div>
        <Link to="#" className="add-button nav-text-left" onClick={togglePopup}>
          <biIcons.BiLocationPlus />
          <span className="quick-fix">Add an Item</span>
        </Link>
        {/* This is where we get the prop to pass the data from. */}
        {isOpen && <Popup handleClose={togglePopup} pushItUp={pushItUp} />}
      </div>
      <div className="left-menu">
        {LeftBarData.map((item, index) => {
          return <LeftSubMenu item={item} />;
        })}
      </div>
    </>
  );
}

export default LeftBar;
