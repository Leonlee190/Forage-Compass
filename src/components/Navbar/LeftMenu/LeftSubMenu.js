import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LeftBar.css";
import "../Navbar.css";

export const LeftSubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

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
            <li key={item} className={item.cName}>
              <input type="checkbox" id={item.title} name={item.title} />
              <label for={item.title}>{item.title}</label>
            </li>
          );
        })}
    </>
  );
};

// export default LeftSubMenu;
