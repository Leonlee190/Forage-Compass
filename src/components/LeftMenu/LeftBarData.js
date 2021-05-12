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
      },
      {
        title: "Blackberry",
      },
      {
        title: "Marionberry",
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
      },
      {
        title: "Porcini Mushroom",
      },
      {
        title: "Oyster Mushroom",
      },
    ],
  },
  {
    title: "Fruits",
    icon: <giIcons.GiFruitTree />,
    cName: "nav-text",
    iconClosed: <riIcons.RiArrowDownSFill />,
    iconOpened: <riIcons.RiArrowUpSFill />,
  },
];
