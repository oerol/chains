import "./App.css";
import DeckSelection from "./DeckSelection";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DeckOverview from "./DeckOverview";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/deck/:id" component={DeckOverview} />
        <Route path="/" component={DeckSelection} />
      </Switch>
    </Router>
  );
}

export default App;
