import React from 'react';
import Root from './routes/RootPanel';
import { Router, Route, IndexRedirect } from 'dva/router';
import GraphPanel from './routes/GraphPanel';
import DataFlowPanel from './routes/DataFlowPanel';
import RoutesPanel from './routes/RoutesPanel';
import DataFlowDetailPanel from './routes/DataFlowDetailPanel';

export default ({ history }) => (
  <Router history={history}>
    <Route path="/" component={Root}>
      <IndexRedirect to="graph" />
      <Route path="graph" component={GraphPanel}>
        <IndexRedirect to="dataflow" />
        <Route path="router" component={RoutesPanel} />
        <Route path="dataflow" component={DataFlowPanel} />

        {/* for testing */}
        <Route path="view" component={DataFlowDetailPanel} />
      </Route>
    </Route>
  </Router>
);
