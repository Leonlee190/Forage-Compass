import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Requests from "./pages/Requests";
import Reports from "./pages/Reports";
import Contacts from "./pages/Contacts";
import { MapContainer } from "./components/map/MapContainer";
import CheckContext from "./components/Navbar/LeftMenu/CheckContext";
import { useState } from "react";

function App() {
  const [check, setCheck] = useState(new Map());
  const changeCheck = (item) => {
    setCheck(
      check.has(item)
        ? check.set(item, !check.get(item))
        : check.set(item, true)
    );

    console.log("From App: ", check);
  };

  const checkValue = { check, changeCheck };

  return (
    <CheckContext.Provider value={checkValue}>
      <div className="App">
        <Router>
          <Navbar />
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
              <MapContainer checked={check} />
            </Route>
          </Switch>
        </Router>
      </div>
    </CheckContext.Provider>
  );
}

export default App;
