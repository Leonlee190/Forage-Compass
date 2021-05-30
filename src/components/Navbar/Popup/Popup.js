import React from "react";
import "./Popup.css";
import { Link } from "react-router-dom";
import * as aiIcons from "react-icons/ai";
import axios from "axios";

const Popup = (props) => {
  let nameValue = "";
  // this is here for the first item in the drop down menu
  let varietyValue = "Blackberry";
  let lat;
  let lng;
  const success = (pos) => {
    lat = pos.coords.latitude;
    lng = pos.coords.longitude;
    console.log("catches lat lng when open pop up\n", lat, lng);
  };
  navigator.geolocation.getCurrentPosition(success);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("I clicked the button, did it do the thing?");
    const dataPackage = {
      name: nameValue,
      variety: varietyValue,
      latitude: lat,
      longitude: lng,
    };
    console.log(dataPackage);

    axios
      .post("http://localhost:3001/locations", dataPackage)
      .then((response) => {
        console.log("did it post the data?");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    // props.pushItUp(dataPackage); // this was start of prop drilling
    props.handleClose();
  };
  const nameChange = (event) => {
    nameValue = event.target.value;
  };
  const varietyChange = (event) => {
    varietyValue = event.target.value;
  };
  return (
    <div className="modal">
      <div className="modal_content">
        <Link to="#" className="modal_close" onClick={props.handleClose}>
          <aiIcons.AiOutlineClose />
        </Link>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Location Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            size="50"
            onChange={nameChange}
          ></input>
          <label htmlFor="type">Type:</label>
          <select id="type" name="type" form="type" onChange={varietyChange}>
            <option value="Blackberry">Blackberry</option>
            <option value="Blueberry">Blueberry</option>
            <option value="Huckleberry">Huckleberry</option>
            <option value="Raspberry">Raspberry</option>
            <option value="Marionberry">Marionberry</option>
            <option value="Chantrelle">Chantrelle Mushroom</option>
            <option value="Morel">Morel Mushroom</option>
            <option value="Matsutake">White Matsutake Mushroom</option>
            <option value="Oyster">Oyster Mushroom</option>
            <option value="Porcini">Porcini Mushroom</option>
            <option value="Apple">Apple</option>
            <option value="Lemon">Lemon</option>
            <option value="Peach">Peach</option>
            <option value="Persimmon">Persimmon</option>
            <option value="Pear">Pear</option>
          </select>
          <input type="submit" value="Use Current Loc" />
        </form>
      </div>
    </div>
  );
};

export default Popup;
