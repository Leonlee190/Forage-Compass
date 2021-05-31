import React from "react";
import * as riIcons from "react-icons/ri";
import * as giIcons from "react-icons/gi";

export const LeftBarData = [
  {
    title: "Berry",
    icon: <giIcons.GiElderberry />,
    cName: "nav-text-left",
    iconClosed: <riIcons.RiArrowDownSFill />,
    iconOpened: <riIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Blackberry",
        type: "Blackberry",
        cName: "sub-nav-text",
      },
      {
        title: "Blueberry",
        type: "Blueberry",
        cName: "sub-nav-text",
      },
      {
        title: "Huckleberry",
        type: "Huckleberry",
        cName: "sub-nav-text",
      },
      {
        title: "Raspberry",
        type: "Raspberry",
        cName: "sub-nav-text",
      },
      {
        title: "Marionberry",
        type: "Marionberry",
        cName: "sub-nav-text",
      },
    ],
  },
  {
    title: "Mushroom",
    icon: <giIcons.GiMushroomGills />,
    cName: "nav-text-left",
    iconClosed: <riIcons.RiArrowDownSFill />,
    iconOpened: <riIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Chantrelle Mushroom",
        type: "Chantrelle",
        cName: "sub-nav-text",
      },
      {
        title: "Morel Mushroom",
        type: "Morel",
        cName: "sub-nav-text",
      },
      {
        title: "White Matsutake Mushroom",
        type: "Matsutake",
        cName: "sub-nav-text",
      },
      {
        title: "Oyster Mushroom",
        type: "Oyster",
        cName: "sub-nav-text",
      },
      {
        title: "Porcini Mushroom",
        type: "Porcini",
        cName: "sub-nav-text",
      },
    ],
  },
  {
    title: "Fruits",
    icon: <giIcons.GiFruitTree />,
    cName: "nav-text-left",
    iconClosed: <riIcons.RiArrowDownSFill />,
    iconOpened: <riIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Apple",
        type: "Apple",
        cName: "sub-nav-text",
      },
      {
        title: "Lemon",
        type: "Lemon",
        cName: "sub-nav-text",
      },
      {
        title: "Peach",
        type: "Peach",
        cName: "sub-nav-text",
      },
      {
        title: "Persimmon",
        type: "Persimmon",
        cName: "sub-nav-text",
      },
      {
        title: "Pear",
        type: "Pear",
        cName: "sub-nav-text",
      },
    ],
  },
];
