import React, { useState } from "react";
import { LeftBarData } from "./LeftBarData";
import { LeftSubMenu } from "./LeftSubMenu";
import "./LeftBar.css";
import { Link } from "react-router-dom";

function LeftBar() {
  // const [subnav, setSubnav] = useState(false);

  // const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <div className="left-menu">
        {LeftBarData.map((item, index) => {
          return <LeftSubMenu item={item} key={index} />;
        })}
      </div>
    </>

    //     {LeftBarData.map((item, index) => {
    //       const hasSubNav = !!item.subNav.length;

    //       const subNavJSX = item.subNav.map((subNavItem, subNavIndex) => {
    //         return (
    //           <li key={subNavIndex} className={subNavItem.cName}>
    //             <input
    //               type="checkbox"
    //               id={subNavItem.title}
    //               name={subNavItem.title}
    //             />
    //             <label for={subNavItem.title}>{subNavItem.title}</label>
    //           </li>
    //         );
    //       });

    //       return (
    //         <ul>
    //           <li key={index} className={item.cName}>
    //             <Link
    //               to="#"
    //               className="menuSelect"
    //               onClick={item.subNav && showSubnav}
    //             >
    //               {item.icon}
    //               <span>{item.title}</span>
    //               <span className="expand-icon">
    //                 {item.subNav && subnav
    //                   ? item.iconOpened
    //                   : item.subNav
    //                   ? item.iconClosed
    //                   : null}
    //               </span>
    //             </Link>
    //           </li>
    //           <ul>{hasSubNav && subnav && subNavJSX}</ul>
    //         </ul>

    //       );
    //     })}
    //   </div>
    // </>
  );
}

export default LeftBar;
