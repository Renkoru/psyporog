import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import {
  Initial,
  LimitDetection,
  ThresholdDetection,
  Result,
  Normalization,
} from "../scenes";

function App() {
  const [limits, setLimits] = useState([0, 1]);
  function onLimitsSet(newLimits) {
    setLimits(newLimits);
  }

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Initial} />
          <Route path="/limit-detection" exact>
            <LimitDetection onLimitsSet={onLimitsSet} />
          </Route>
          <Route path="/threshold-detection" exact>
            <ThresholdDetection leftLimit={limits[0]} rightLimit={limits[1]} />
          </Route>
          <Route path="/result" exact component={Result} />
          <Route path="/normalization" exact component={Normalization} />

          {/* <Redirect from="/" to={routes.studentList} /> */}

          {/* <Route path="*" component={NoMatch} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
