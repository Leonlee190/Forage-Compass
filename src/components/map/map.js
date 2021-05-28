import React from "react";
import ReactDOM from "react-dom";
import "./map.css";

// don't think I can take this out and put in css file
// connected to render portion as well.
const mapStyles = {
  map: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "0px",
  },
};

export class Map extends React.Component {
  // constructor sets current location
  constructor(props) {
    super(props);

    // initial center set to portland below
    const { lat, lng } = this.props.initialCenter;

    this.state = {
      lastClick: null,
      currentLocation: {
        lat: lat,
        lng: lng,
      },
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // for in case of network issues...
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    // to load it to the readers current locale
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  recenterMap() {
    const map = this.map;
    const current = this.state.currentLocation;

    const google = this.props.google;
    const gmaps = google.maps;

    if (map) {
      let center = new gmaps.LatLng(current.lat, current.lng);
      map.panTo(center);
    }
  }

  // set's a callback to fetch current location.
  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude,
            },
          });
        });
      }
    }
    this.loadMap();
  }

  // grabs reference to DOM and see's where you want your map placed
  loadMap() {
    if (this.props && this.props.google) {
      // checks is google available
      const { google } = this.props;
      const gmaps = google.maps;

      // refs is deprecated, dunno what to do here... tutorial.
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      // reference to Dom element

      let { zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
      const center = new gmaps.LatLng(lat, lng);

      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom,
          // this removes the funny buttons stuff, leaves only map.
          disableDefaultUI: true,
        }
      );

      // maps.Map() is constructor that makes the map
      this.map = new gmaps.Map(node, mapConfig);

      this.map.addListener("click", (evt) => {
        let contentStyling =
          "<div>" +
          '<img src="/icons/raspberry-1-32.png" alt="" />' +
          "<h4>{this.state.selectedPlace.name}</h4>" +
          "<p>In Season: {this.state.selectedPlace.inSeason}</p>" +
          "</div>";
        this.setState({ lastClick: evt.latLng.toJSON() });
        const infoWindow = new gmaps.InfoWindow({
          content: contentStyling,
        });
        const marker = new gmaps.Marker({
          icon: "/icons/mushroom-32.png",
          position: this.state.lastClick,
          title: "new marker!",
        });
        marker.addListener("click", () => {
          infoWindow.open(this.map, marker);
        });
        marker.setMap(this.map);
        // this connects the onMapClick function of the child/map to the onMapClicked function of the parent/map container function.
        this.props.onMapClick(this.state.lastClick);
      });
    }
  }

  // function holdStuff(location) {

  // }
  // get's that prev Mapker picks browser location
  // parent-child component communication
  renderChildren() {
    const { children } = this.props;

    if (!children) return;
    return React.Children.map(children, (c) => {
      if (!c) return;

      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation,
      });
    });
  }

  // onMapClick = (evt) => {
  //   this.props.onMapClick(evt.latLng.toJSON());
  //   evt.preventDefault();
  // };
  // renders the map
  render() {
    const style = Object.assign({}, mapStyles.map);

    return (
      <div>
        <div
          className="my_map"
          style={style}
          ref="map"
          onClick={this.onMapClick}
        >
          {/* this ^^^ sends the clicks up to parent MapContainer to do things with !!!!! */}
          Loading MAP...
        </div>
        {this.renderChildren()} {/* throws the markers back up?*/}
      </div>
    );
  }
}

// default location if can't get geolocation.
Map.defaultProps = {
  zoom: 13,
  initialCenter: {
    lat: 45.5191,
    lng: -122.675,
  },
  centerAroundCurrentLocation: false,
  visible: true,
};

export default Map;
