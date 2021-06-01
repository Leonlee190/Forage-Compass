import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Requests from "./pages/Requests";
import Reports from "./pages/Reports";
import Contacts from "./pages/Contacts";
import { MapContainer } from "./components/map/MapContainer";
import React, { useState } from "react";
import CheckContext from "./components/Navbar/LeftMenu/CheckContext";

function App() {
  // State to pass into context for getting checked location's values
  const [check, setCheck] = useState(new Map());

  // Changed variety and it's changed boolean value stored as state
  const [chosen, setChosen] = useState("");
  const [chosenVal, setChosenVal] = useState(false);

  // Function to add the value into the check hashMap when checked
  const changeCheck = (item) => {
    setCheck(
      check.has(item)
        ? check.set(item, !check.get(item))
        : check.set(item, true)
    );

    // When checkbox is clicked store the changes
    setChosen(item);
    setChosenVal(check.get(item));
  };

  // Pairing check hashMap and check hashMap changing function to pass into context
  const checkValue = { check, changeCheck };

  const [appsData, setData] = useState(null);

  // Sending multiple values into MapContainer.js as props
  // const props = { check: check, appsData: appsData };
  const props = {
    check: check,
    type: chosen,
    val: chosenVal,
    appsData: appsData,
  };

  // part of the prop drilling from popup.js->lb.js->navb.js
  const transferData = (dataPackage) => {
    console.log("Data Package in app.js, pushing down.");
    // wasn't sure how to use dataPackage for pushing stuff down.
    // sets data to const var called appsData
    setData(dataPackage);
  };
  return (
    // Wrapping the whole thing with context to retrieve checked value
    <CheckContext.Provider value={checkValue}>
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
              <MapContainer parentData={props} />
            </Route>
          </Switch>
        </Router>
      </div>
    </CheckContext.Provider>
  );
}

export default App;
