import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import "./map.css";

const mapStyles = {
  width: "100%",
  height: "100%",
};

export class MapContainer extends Component {
  render() {
    return (
      <Map
        className="my_map"
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: 45.5191,
          lng: -122.675,
        }}
      />
    );
  }
}

MapContainer = GoogleApiWrapper({
  apiKey: "AIzaSyBDg6EoMTVDIdl2PUR_ZaJ5br6fuMjGWRQ",
})(MapContainer);
