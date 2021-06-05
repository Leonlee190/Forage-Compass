import React from "react";
import * as mdIcons from "react-icons/md";
import { SiSwagger } from "react-icons/si";

export const RightBar = [
  {
    title: "Home",
    path: "/",
    icon: <mdIcons.MdHome />,
    cName: "nav-text-right",
  },
  {
    title: "Request and Reports",
    path: "/requests",
    icon: <mdIcons.MdPlaylistAdd />,
    cName: "nav-text-right",
  },
  {
    title: "Contacts",
    path: "/contacts",
    icon: <mdIcons.MdPermContactCalendar />,
    cName: "nav-text-right",
  },
  {
    title: "API Documentation",
    path: "/apidocs",
    icon: <SiSwagger />,
    cName: "nav-text-right",
  },
];
