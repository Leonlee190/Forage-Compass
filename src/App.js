import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Requests from "./pages/Requests";
import Reports from "./pages/Reports";
import Contacts from "./pages/Contacts";
import { MapContainer } from "./components/map/map";

function App() {
  return (
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
<<<<<<< HEAD
=======
            {/* the actual map component, centers around your location. */}
>>>>>>> main
            <MapContainer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
