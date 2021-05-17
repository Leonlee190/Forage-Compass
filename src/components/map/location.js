// https://www.digitalocean.com/community/tutorials/how-to-integrate-the-google-maps-api-into-react-applications
import React from "react";
import ReactDOM from "react-dom";
import "./map.css";

// not sure how to move this to css yet... about there.
// connected to render portion as well.
const mapStyles = {
  map: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
};

export class CurrentLocation extends React.Component {
  // constructor sets current location
  constructor(props) {
    super(props);

    // initial center set to portland below
    const { lat, lng } = this.props.initialCenter;

    this.state = {
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
    this.loadMap(); //<^> // I don't know about this <^> part?...
  }

  // grabs reference to DOM and see's where you want your map placed
  loadMap() {
    if (this.props && this.props.google) {
      // checks is google available
      const { google } = this.props;
      const maps = google.maps;

      // refs is deprecated, dunno what to do here... tutorial.
      const mapRef = this.refs.map;

      // reference to Dom element
      const node = ReactDOM.findDOMNode(mapRef);

      let { zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);

      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom,
        }
      );

      // maps.Map() is constructor that makes the map
      this.map = new maps.Map(node, mapConfig);
    }
  }

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

  // renders the map
  render() {
    const style = Object.assign({}, mapStyles.map);

    return (
      <div>
        <div className="my_map" style={style} ref="map">
          Loading MAP...
        </div>
        {this.renderChildren()}
      </div>
    );
  }
}

// default location if can't get geolocation.
CurrentLocation.defaultProps = {
  zoom: 13,
  initialCenter: {
    lat: 45.5191,
    lng: -122.675,
  },
  centerAroundCurrentLocation: false,
  visible: true,
};

export default CurrentLocation;
