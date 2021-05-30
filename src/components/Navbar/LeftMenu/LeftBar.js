import React, { useState } from "react";
import { LeftBarData } from "./LeftBarData";
import { LeftSubMenu } from "./LeftSubMenu";
import Popup from "../Popup/Popup";
import * as biIcons from "react-icons/bi";
import { Link } from "react-router-dom";
import "./LeftBar.css";

function LeftBar() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    console.log("open... close... open... close...");
  };

  return (
    <>
      <div>
        <Link to="#" className="add-button" onClick={togglePopup}>
          <biIcons.BiLocationPlus />
        </Link>
        {isOpen && <Popup handleClose={togglePopup} />}
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
