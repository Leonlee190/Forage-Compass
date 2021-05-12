import React, { useState } from "react";
import { LeftBarData } from "./LeftBarData";

function LeftBar() {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <div className="left-menu">
        {LeftBarData.map((item, index) => {
          return (
            <li key={index} className={item.cName}>
              {item.icon}
              <span>{item.title}</span>
            </li>
          );
        })}
      </div>
    </>
  );
}

export default LeftBar;
