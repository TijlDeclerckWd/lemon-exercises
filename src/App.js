import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Grid, Home } from './views';
import browserHistory from "./services/browserHistory";

function App() {
  return (
    <div className="App">
      <BrowserRouter history={browserHistory}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/grid" exact component={Grid} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
