// https://www.digitalocean.com/community/tutorials/how-to-integrate-the-google-maps-api-into-react-applications
import React, { Component } from "react";
import { GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import "./map.css"; // minor styling here
import Map from "./map"; // centers map @ curr loc
import { ListoMarkers } from "./playMarkerData";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // this is all stuff from google-react tutorial
      showingInfoWindow: false, // hides/shows infoWindow
      activeMarker: {}, // shows marker on click
      selectedPlace: {}, // shows info window to selected marker
      markerObjects: [], // holds array of the markers.
      mapTypeControl: true,
      lastClick: null,
    };

    this.onMarkerMounted = (element) => {
      this.setState((prevState) => ({
        markerObjects: [...prevState.markerObjects, element.marker],
      }));
    };

    // this.map.addListener("click", (evt) => {
    //   console.log("clicked again.");
    // });
  }

  // sets active marker as this one, props as the location of the marker
  // I think? .. and switches the state of the infowindow on/off
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: !this.state.showingInfoWindow,
    });

  // hides the info window
  onInfoWindowClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  onMapClicked = (data) => {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null,
    });
    console.log("Did it work finally?...");
    console.log(data);
  };

  // handleClick = (location) => {
  //   console.log("we found the parent.");
  //   console.log(location);
  // };
  render() {
    return (
      // current location tries to get your location and then centers the map around it.  storred in map/location.js
      <Map
        centerAroundCurrentLocation
        google={this.props.google}
        onMapClick={this.onMapClicked}
      >
        {/* This is the part that places all the icons on map */}
        {ListoMarkers.map((item) => (
          <Marker
            ref={this.onMarkerMounted}
            title={item.name} // title I think is the mouseover?
            name={item.name} // just a name
            src={item.icon} // passes image src to marker src property!
            inSeason={item.inSeason} // get's time in timestamp
            position={{ lat: item.lat, lng: item.lng }} // place on map
            onClick={this.onMarkerClick} // does thing above ^^^
            icon={{
              url: item.icon, // drops the custom icon
            }}
          />
        ))}

        {/* this is where we put the info window format*/}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onInfoWindowClose}
        >
          {/* this is where the info for infowindow is displayed...
            can later put in, ratings, size, picture?  whatever */}
          <div>
            <img src={this.state.selectedPlace.src} alt="" />
            <h4>{this.state.selectedPlace.name}</h4>
            <p>In Season: {this.state.selectedPlace.inSeason}</p>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

// not sure how to hide the apiKey quite yet...
// or if I did it right... differentiated from documentation
MapContainer = GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer);
