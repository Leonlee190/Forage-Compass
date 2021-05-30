import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LeftBar.css";

let URL = "http://localhost:3001/";

export const LeftSubMenu = ({ item }) => {
  const [check, setCheck] = useState(new Map());
  const showCheck = (item) =>
    setCheck(
      check.has(item)
        ? check.set(item, !check.get(item))
        : check.set(item, true)
    );

  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  function handleClick(title, checked) {
    console.log("checked: ", title, checked);
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
                checked={check.get(item.title)}
                onChange={(e) => {
                  showCheck(item.title);
                  handleClick(item.title, check);
                }}
              />
              <label htmlFor={item.title}>{item.title}</label>
            </li>
          );
        })}
    </>
  );
};
