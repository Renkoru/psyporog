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
  const [testResult, setTestResult] = useState({ 0: 0, 1: 0 });
  function onLimitsSet(newLimits) {
    setLimits(newLimits);
  }

  function onResult(data) {
    setTestResult(data);
  }

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/psyporog/" exact component={Initial} />

          <Route path="/psyporog/limit-detection" exact>
            <LimitDetection onLimitsSet={onLimitsSet} />
          </Route>

          <Route path="/psyporog/threshold-detection" exact>
            <ThresholdDetection
              onResult={onResult}
              leftLimit={limits[0]}
              rightLimit={limits[1]}
            />
          </Route>

          <Route path="/psyporog/result" exact>
            <Result data={testResult} />
          </Route>

          <Route
            path="/psyporog/normalization"
            exact
            component={Normalization}
          />

          {/* <Redirect from="/" to={routes.studentList} /> */}

          {/* <Route path="*" component={NoMatch} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
