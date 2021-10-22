import "./App.css";
import DeckSelection from "./DeckSelection";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DeckOverview from "./DeckOverview";
import ModuleSelection from "./ModuleSelection";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/deck/:id" component={DeckOverview} />
        <Route path="/module/:id" component={DeckSelection} />
        <Route path="/" component={ModuleSelection} />
      </Switch>
    </Router>
  );
}

export default App;
