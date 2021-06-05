import React from "react";
import * as mdIcons from "react-icons/md";

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
];
