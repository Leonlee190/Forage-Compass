import React from "react";
import * as mdIcons from "react-icons/md";
import * as riIcons from "react-icons/ri";
import * as giIcons from "react-icons/gi";

export const LeftBarData = [
  {
    title: "Berry",
    icon: <giIcons.GiElderberry />,
    cName: "nav-text",
    iconClosed: <riIcons.RiArrowDownSFill />,
    iconOpened: <riIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Blueberry",
        cName: "sub-nav-text",
      },
      {
        title: "Blackberry",
        cName: "sub-nav-text",
      },
      {
        title: "Marionberry",
        cName: "sub-nav-text",
      },
    ],
  },
  {
    title: "Mushroom",
    icon: <giIcons.GiMushroomGills />,
    cName: "nav-text",
    iconClosed: <riIcons.RiArrowDownSFill />,
    iconOpened: <riIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Chantrelle Mushroom",
        cName: "sub-nav-text",
      },
      {
        title: "Porcini Mushroom",
        cName: "sub-nav-text",
      },
      {
        title: "Oyster Mushroom",
        cName: "sub-nav-text",
      },
    ],
  },
  {
    title: "Fruits",
    icon: <giIcons.GiFruitTree />,
    cName: "nav-text",
    iconClosed: <riIcons.RiArrowDownSFill />,
    iconOpened: <riIcons.RiArrowUpSFill />,
    subNav: [],
  },
];
