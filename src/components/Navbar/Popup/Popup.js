import React from "react";
import "./Popup.css";
import { Link } from "react-router-dom";
import * as aiIcons from "react-icons/ai";
import axios from "axios";

const Popup = (props) => {
  let nameValue = "";
  // this is here for the first item in the drop down menu
  let varietyValue = "Blackberry";

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("I clicked the button, did it do the thing?");
    const dataPackage = {
      name: nameValue,
      variety: varietyValue,
    };
    console.log(dataPackage);
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
            <option value="blackberry">Blackberry</option>
            <option value="blueberry">Blueberry</option>
            <option value="huckleberry">Huckleberry</option>
            <option value="raspberry">Raspberry</option>
            <option value="marionberry">Marionberry</option>
            <option value="chantrelle">Chantrelle Mushroom</option>
            <option value="morel">Morel Mushroom</option>
            <option value="matsutake">White Matsutake Mushroom</option>
            <option value="oyster">Oyster Mushroom</option>
            <option value="porcini">Porcini Mushroom</option>
            <option value="apple">Apple</option>
            <option value="lemon">Lemon</option>
            <option value="peach">Peach</option>
            <option value="persimmon">Persimmon</option>
            <option value="pear">Pear</option>
          </select>
          <input type="submit" value="Use Current Loc" />
        </form>
      </div>
    </div>
  );
};

export default Popup;
