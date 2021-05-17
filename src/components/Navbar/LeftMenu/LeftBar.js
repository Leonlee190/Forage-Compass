import React, { useState } from "react";
import { LeftBarData } from "./LeftBarData";
import "./LeftBar.css";

function LeftBar() {
  const [subnav, setSubnav] = useState({});

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <div className="left-menu">
        {LeftBarData.map((item, index) => {
          const hasSubNav = !!item.subNav.length;

          const subNavJSX = item.subNav.map((subNavItem, subNavIndex) => {
            return (
              <li key={subNavIndex} className={subNavItem.cName}>
                <input
                  type="checkbox"
                  id={subNavItem.title}
                  name={subNavItem.title}
                />
                <label for={subNavItem.title}>{subNavItem.title}</label>
              </li>
            );
          });

          return (
            <ul>
              <li key={index} className={item.cName}>
                {item.icon}
                <span>{item.title}</span>
                <span className="expand-icon">{item.iconClosed}</span>
              </li>
              <li>{hasSubNav && subNavJSX}</li>
            </ul>
          );
        })}
      </div>
    </>
  );
}

export default LeftBar;
