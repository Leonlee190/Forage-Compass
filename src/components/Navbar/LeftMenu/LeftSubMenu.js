import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LeftBar.css";
// import "../Navbar.css";

export const LeftSubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  function handleClick(title) {
    console.log("checked: ", title);
  }

  return (
    <>
      <Link to="#" className={item.cName} onClick={item.subNav && showSubnav}>
        {item.icon}
        <span>{item.title}</span>
        <span className="expand-icon">
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </span>
      </Link>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <li key={index} className={item.cName}>
              <input
                type="checkbox"
                id={item.title}
                name={item.title}
                onChange={(e) => {
                  handleClick(item.title);
                }}
              />
              <label htmlFor={item.title}>{item.title}</label>
            </li>
          );
        })}
    </>
  );
};
