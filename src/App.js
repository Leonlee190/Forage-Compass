import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Requests from "./pages/Requests";
import Reports from "./pages/Reports";
import Contacts from "./pages/Contacts";
import { MapContainer } from "./components/map/MapContainer";
import React, { useState } from "react";

function App() {
  const [appsData, setData] = useState(null);

  // part of the prop drilling from popup.js->lb.js->navb.js
  const transferData = (dataPackage) => {
    console.log("Data Package in app.js, pushing down.");
    // wasn't sure how to use dataPackage for pushing stuff down.
    // sets data to const var called appsData
    setData(dataPackage);
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
            <MapContainer parentData={appsData} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
