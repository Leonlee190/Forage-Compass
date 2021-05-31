// https://www.digitalocean.com/community/tutorials/how-to-integrate-the-google-maps-api-into-react-applications
import React, { Component } from "react";
import { GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import "./map.css"; // minor styling here
import Map from "./map"; // centers map @ curr loc
import { ListoMarkers } from "./playMarkerData";
import axios from "axios";

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
      placesResults: [], // this might hold all the markers on map
      checkedLoc: this.props.checked,
    };

    this.onMarkerMounted = (element) => {
      this.setState((prevState) => ({
        markerObjects: [...prevState.markerObjects, element.marker],
      }));
    };
  }

  componentDidUpdate() {
    console.log("update fired: ", this.state.checkedLoc);
  }

  componentDidMount() {
    // NOTE!!!  THIS IS WHERE WE WILL MAKE REQUEST TO SERVER, I THINK...
    // probs need some check make sure server is up
    axios
      .get("http://localhost:3001/locations")
      .then((response) => {
        // console.log(response.data);
        const results = response.data.map((marker) => {
          return {
            key: marker._id,
            variety: marker.variety,
            name: marker.name,
            lat: marker.latitude,
            lng: marker.longitude,
          };
        });
        // results.filter(function (entry) {
        //   return (
        //     this.state.checkedLoc.has(entry.variety) &&
        //     this.state.checkedLoc.get(entry.variety)
        //   );
        // });
        console.log(results);
        this.setState({
          placesResults: results,
        });
        console.log("hello world");
      })
      .catch((error) => {
        console.log("Something went wrong...");
        console.log(error);
      });
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
      checkedLoc: this.props.checked,
    });
    console.log("Did it work finally?...");
    console.log(data);
    console.log("From Map Click:", this.props.checked);
    console.log("From Map Click state: ", this.state.checkedLoc);
    console.log("From Map Click places: ", this.state.placesResults);

    let results = this.state.placesResults.filter((entry) => {
      return (
        this.state.checkedLoc.has(entry.variety) &&
        this.state.checkedLoc.get(entry.variety)
      );
    });

    console.log("Places: ", this.state.placesResults);
    console.log("After Filter: ", results);
  };

  render() {
    return (
      // current location tries to get your location and then centers the map around it.  storred in map/location.js
      <Map
        centerAroundCurrentLocation
        google={this.props.google}
        onMapClick={this.onMapClicked}
      >
        {/* This is the part that places all the icons on map */}
        {this.state.placesResults.map((item) => (
          <Marker
            ret={this.onMarkerMounted}
            key={item.key}
            variety={item.variety}
            name={item.name}
            position={{ lat: item.lat, lng: item.lng }}
            onClick={this.onMarkerClick}
            src={"/icons/" + item.variety.toLowerCase() + ".png"} // passes image src to marker src property!
            icon={{
              url: "/icons/" + item.variety.toLowerCase() + ".png", // drops the custom icon
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
            <p>{this.state.selectedPlace.variety}</p>
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
