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
      checkedLoc: this.props.parentData.check, // Holding the checked variety in hashMap
      displayPlaces: [], // Display only the checked types
    };

    // this I'm not really sure if it does anything or not.
    this.onMarkerMounted = (element) => {
      this.setState((prevState) => ({
        markerObjects: [...prevState.markerObjects, element.marker],
      }));
    };
  }

  componentDidUpdate(prevProps) {
    // checks if the parent data package has been updated.
    console.log("Inside of updating map container.js");
    // if the dataPackage... transfered to parentData here is new
    // then we get all the things and update the results.
    if (
      this.props.parentData.appsData &&
      prevProps.parentData.appsData !== this.props.parentData.appsData
    ) {
      console.log("Re-requesting data from server");
      axios
        .get("https://htpc.wignalls.net:3001/locations")
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
          console.log(results);
          // Function to filter the placesResult by checking with the checkedLoc's values
          let filtered = results.filter((entry) => {
            return (
              this.state.checkedLoc.has(entry.variety) &&
              this.state.checkedLoc.get(entry.variety)
            );
          });
          this.setState({
            displayPlaces: filtered,
            placesResults: results,
          });
        })
        .catch((error) => {
          console.log("Something went wrong...");
          console.log(error);
        });
    }
    // If checkbox's values are different from last prop
    if (
      prevProps.parentData.type !== this.props.parentData.type ||
      prevProps.parentData.val !== this.props.parentData.val
    ) {
      // Add the new values into the checked location
      this.state.checkedLoc.set(
        this.props.parentData.type,
        this.props.parentData.val
      );

      // Filter the placesResult with the new checked locations
      let filtered = this.state.placesResults.filter((entry) => {
        return (
          this.state.checkedLoc.has(entry.variety) &&
          this.state.checkedLoc.get(entry.variety)
        );
      });

      // Set state to re-render with the filtered data
      this.setState({
        displayPlaces: filtered,
      });

      console.log(
        "Checked Location Update Fired Display state: ",
        this.state.checkedLoc
      );
    }
  }

  componentDidMount() {
    // NOTE!!!  THIS IS WHERE WE WILL MAKE REQUEST TO SERVER, I THINK...
    // probs need some check make sure server is up
    axios
      .get("https://htpc.wignalls.net:3001/locations")
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

        console.log(results);
        this.setState({
          placesResults: results,
          checkedLoc: this.props.parentData.check,
        });
        console.log("hello world, initial pull from server");
        console.log("From update state:", this.state.checkedLoc);
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
      checkedLoc: this.props.parentData.check,
    });
    console.log("Did it work finally?...");
    console.log(data);
  };

  printAstatement = () => {
    console.log("This was printed in map container...");
  };

  render() {
    console.log("rendering the mapContainer");
    return (
      // current location tries to get your location and then centers the map around it.  storred in map/location.js
      <Map
        centerAroundCurrentLocation
        google={this.props.google}
        onMapClick={this.onMapClicked}
      >
        {/* This is the part that places all the icons on map 
            Now print with displayPlaces because that's the filtered map*/}
        {this.state.displayPlaces.map((item) => (
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

// wrapper function to hold the api key for requests.
MapContainer = GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer);
