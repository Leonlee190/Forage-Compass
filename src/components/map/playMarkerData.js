// this is a toy list to go over the marker loading implementations.

function getDate(timestamp) {
  var date = new Date(timestamp);
  var month = date.toLocaleString("en-us", { month: "long" });
  return month;
}

export const ListoMarkers = [
  {
    key: 1,
    lat: 45.590315,
    lng: -122.658287,
    name: "Roso Upick Berries",
    variety: "Blackberry",
  },
  {
    key: 2,
    lat: 45.572422,
    lng: -122.702952,
    name: "Rachel's Raspberry Stash",
    variety: "Raspberry",
  },
  // {
  //   id: 3,
  //   lat: 45.535838,
  //   lng: -122.727242,
  //   name: "mushroom",
  //   icon: "/icons/mushroom.png",
  //   inSeason: getDate(11570125606),
  // },
  // {
  //   id: 4,
  //   lat: 45.549989,
  //   lng: -122.607134,
  //   name: "apple",
  //   icon: "/icons/apple.png",
  //   inSeason: getDate(8559125606),
  // },
  // {
  //   id: 5,
  //   lat: 45.468101,
  //   lng: -122.585816,
  //   name: "apple",
  //   icon: "/icons/apple.png",
  //   inSeason: getDate(8559125606),
  // },
  // {
  //   id: 6,
  //   lat: 45.464185,
  //   lng: -122.557475,
  //   name: "mushroom",
  //   icon: "/icons/mushroom.png",
  //   inSeason: getDate(11576125606),
  // },
  // {
  //   id: 7,
  //   lat: 45.507117, // this is mt tabor
  //   lng: -122.596518,
  //   name: "cherry",
  //   icon: "/icons/cherry.png",
  //   inSeason: getDate(16576125606),
  // },
  // {
  //   id: 8,
  //   lat: 45.489405,
  //   lng: -122.571496,
  //   name: "lemon",
  //   icon: "/icons/lemon.png",
  //   inSeason: getDate(14576125606),
  // },
  // {
  //   id: 9,
  //   lat: 45.483412, // woodstock park
  //   lng: -122.612672,
  //   name: "watermelon",
  //   icon: "/icons/watermelon.png",
  //   inSeason: getDate(11576125606),
  // },
  // {
  //   id: 10,
  //   lat: 45.51582,
  //   lng: -122.646026,
  //   name: "pear",
  //   icon: "/icons/pear.png",
  //   inSeason: getDate(11577777606),
  // },
  // {
  //   id: 11,
  //   lat: 45.537437,
  //   lng: -122.596198,
  //   name: "grapes",
  //   icon: "/icons/grape.png",
  //   inSeason: getDate(11333355506),
  // },
];
