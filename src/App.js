import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Grid, Home, MusicSearcher, Song } from './views';
import browserHistory from "./services/browserHistory";

function App() {
  return (
    <div className="App">
      <BrowserRouter history={browserHistory}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/grid" exact component={Grid} />
          <Route path="/music-searcher" exact component={MusicSearcher} />
          <Route path="/music-searcher/song/:trackID" exact component={Song} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
