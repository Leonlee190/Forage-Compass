import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import CheckContext from "./CheckContext";
import "./LeftBar.css";

export const LeftSubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  function handleClick(title) {
    changeCheck(title);
    console.log("From Sub:", check);
  }

  const { check, changeCheck } = useContext(CheckContext);

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
                id={item.type}
                name={item.type}
                checked={check.get(item.type)}
                onChange={(e) => {
                  handleClick(item.type);
                }}
              />
              <label htmlFor={item.type}>{item.title}</label>
            </li>
          );
        })}
    </>
  );
};
