// https://www.digitalocean.com/community/tutorials/how-to-integrate-the-google-maps-api-into-react-applications
import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import "./map.css"; // minor styling here
import CurrentLocation from "./location"; // centers map @ curr loc

export class MapContainer extends Component {
  state = {
    // this is all stuff from google-react tutorial
    showingInfoWindow: false, // hides/shows infoWindow
    activeMarker: {}, // shows marker on click
    selectedPlace: {}, // shows info window to selected marker
  };

  // sets active marker as this one, props as the location of the marker
  // I think? .. and switches the state of the infowindow on/off
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: !this.state.showingInfoWindow,
    });

  // hides the info window
  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    return (
      // current location tries to get your location and then centers the map around it.  storred in map/location.js
      <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
        {/*This I think just puts a single marker in the center of screen, for testing/from tutorial*/}
        <Marker onClick={this.onMarkerClick} name={"Current Location"} />
        {/* this is where we put the info window */}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClick={this.onClose}
        >
          {/* this is where the info for infowindow is displayed...
            can later put in, ratings, size, picture?  whatever */}
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </CurrentLocation>
    );
  }
}

// not sure how to hide the apiKey quite yet...
// or if I did it right... differentiated from documentation
MapContainer = GoogleApiWrapper({
  apiKey: "AIzaSyBDg6EoMTVDIdl2PUR_ZaJ5br6fuMjGWRQ",
})(MapContainer);
