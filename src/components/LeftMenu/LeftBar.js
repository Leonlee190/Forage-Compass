import React from "react";
import * as mdIcons from "react-icons/md";

export const LeftBar = [
  {
    title: "Add stuff",
    path: "/requests",
    icon: <mdIcons.MdPlaylistAdd />,
    cName: "nav-text",
  },
  {
    title: "Choose stuff",
    path: "/reports",
    icon: <mdIcons.MdReport />,
    cName: "nav-text",
  },
  {
    title: "Doink stuff",
    path: "/contacts",
    icon: <mdIcons.MdPermContactCalendar />,
    cName: "nav-text",
  },
];
