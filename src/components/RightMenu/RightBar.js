import React from "react";
import * as mdIcons from "react-icons/md";

export const RightBar = [
  {
    title: "Request to put in new item",
    path: "/requests",
    icon: <mdIcons.MdPlaylistAdd />,
    cName: "nav-text",
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <mdIcons.MdReport />,
    cName: "nav-text",
  },
  {
    title: "Contacts",
    path: "/contacts",
    icon: <mdIcons.MdPermContactCalendar />,
    cName: "nav-text",
  },
];
