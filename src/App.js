import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Requests from "./pages/Requests";
import Reports from "./pages/Reports";
import Contacts from "./pages/Contacts";
import { MapContainer } from "./components/map/MapContainer";
import React from "react";

function App() {
  var appsData;
  const contRef = React.createRef();

  const transferData = (dataPackage) => {
    console.log("We hit the top app function... going down!");
    console.log(appsData);
    appsData = dataPackage;
    console.log(appsData);
    // this.passitDown(dataPackage)
    // contRef.current.printAstatement();
  };
  return (
    <div className="App">
      <Router>
        <Navbar transferData={transferData} />
        <Switch>
          <Route path="/requests">
            <Requests />
          </Route>
          <Route path="/reports">
            <Reports />
          </Route>
          <Route path="/contacts">
            <Contacts />
          </Route>
          <Route path="/">
            {/* the actual map component, centers around your location. */}
            <MapContainer ref={contRef} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
