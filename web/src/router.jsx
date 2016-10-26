import React from 'react';
import { Router, Route, IndexRedirect } from 'dva/router';
import Root from './routes/RootPanel';
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
        <Route path="dataflow" breadcrumbName="dataflow" component={DataFlowPanel} />
        <Route path="dataflow/:activeNode" breadcrumbName="actionflow" component={DataFlowDetailPanel} />

        {/* for testing */}
        <Route path="view" component={DataFlowDetailPanel} />
      </Route>
    </Route>
  </Router>
);
