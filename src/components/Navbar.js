/* eslint-disable no-lone-blocks */
import React, { useState } from "react";
import * as faIcons from "react-icons/fa";
import * as aiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { RightBar } from "./RightMenu/RightBar";
import LeftBar from "./LeftMenu/LeftBar";
import { IconContext } from "react-icons";

function Navbar() {
  {
    /* Using state to configure when to open and close the pop out menu. Function below to trigger state change. */
  }
  const [rightbar, setRightbar] = useState(false);
  const [leftbar, setLeftbar] = useState(false);

  const showRightbar = () => setRightbar(!rightbar);
  const showLeftbar = () => setLeftbar(!leftbar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        {/* Creating Navbar div with two Icons */}
        <div className="navbar">
          <Link to="#" className="menu-bars-left">
            <faIcons.FaCompass onClick={showLeftbar} />
          </Link>
          <Link to="#" className="menu-bars-right">
            <faIcons.FaBars onClick={showRightbar} />
          </Link>
        </div>
        {/* Setting left menu bar pop out functionality. 
            First in ul class is the x icon which also triggers the state change.
            Next imports the menu list from the LeftBar.js and displaces it with the item.path link that can be passed onto the router in the App.js
            App.js catches the link and switches it to the path pages. */}
        <nav className={leftbar ? "nav-menu-left active" : "nav-menu-left"}>
          <ul className="nav-menu-items" onClick={showLeftbar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <aiIcons.AiOutlineClose />
              </Link>
            </li>
            <LeftBar />
          </ul>
        </nav>
        {/* Setting right menu bar pop out functionality. 
            First in ul class is the x icon which also triggers the state change.
            Next imports the menu list from the RightBar.js and displaces it with the item.path link that can be passed onto the router in the App.js
            App.js catches the link and switches it to the path pages. */}
        <nav className={rightbar ? "nav-menu-right active" : "nav-menu-right"}>
          <ul className="nav-menu-items" onClick={showRightbar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <aiIcons.AiOutlineClose />
              </Link>
            </li>
            {RightBar.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
