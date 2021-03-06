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
      addMarker: false,
      lastClick: null,
      currentLocation: {
        lat: lat,
        lng: lng,
      },
    };
  }

  // checks for updates to connections, location
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

  // gets current location and recenters map there
  recenterMap() {
    const map = this.map;
    const current = this.state.currentLocation;

    const google = this.props.google;
    const gmaps = google.maps;

    if (map) {
      let center = new gmaps.LatLng(current.lat, current.lng);
      ////////////////////////////
      // this part puts a marker down when recentering around location
      const infoWindow = new gmaps.InfoWindow({
        content: "<h4>Superstar!</h4><p>that is what you are...</p>",
      });
      const superstar = new gmaps.Marker({
        icon: "/icons/star.png",
        position: current,
        title: "Superstar!",
      });
      superstar.addListener("click", () => {
        infoWindow.close();
        infoWindow.open(this.map, superstar);
      });
      superstar.setMap(map);
      //////////////////////////////
      // pans to center of map
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

      // this is just to maintain the ux from the previous change
      // below to 'rightclick' from 'click'
      // some implementation is triggered from last click being changed. :/
      this.map.addListener("click", (evt) => {
        this.setState({ lastClick: evt.latLng.toJSON() });
      });

      // this will eventually be used to add a users specific location
      // on the map when they right click or long press map.
      this.map.addListener("rightclick", (evt) => {
        // Was trying to prevent the clicks except when wanted.
        const position = evt.latLng.toJSON();
        let contentStyling =
          "<h4>Temp Test Marker from right click</h4>" +
          "<p>lat: " +
          position.lat +
          "</p>" +
          "<p>long: " +
          position.lng +
          "</p>";

        // this triggers something in the map container I believe
        this.setState({ lastClick: evt.latLng.toJSON() });
        const infoWindow = new gmaps.InfoWindow({
          content: contentStyling,
        });
        const marker = new gmaps.Marker({
          icon: "/icons/oyster.png",
          position: evt.latLng,
          title: "new marker!",
        });
        marker.addListener("click", () => {
          infoWindow.close();
          infoWindow.open(this.map, marker);
        });
        marker.setMap(this.map);
        // this connects the onMapClick function of the child/map to the onMapClicked function of the parent/map container function.
        this.props.onMapClick(this.state.lastClick);
        // }
      });
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
