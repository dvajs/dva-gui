import React from 'react';
import { Router, Route, IndexRedirect } from 'dva/router';
import Root from './routes/Root';
import GraphPanel from './routes/GraphPanel';
import RoutesPanel from './routes/RoutesPanel';
import DataFlowPanel from './routes/DataFlowPanel';
import DataFlowDetailPanel from './routes/DataFlowDetailPanel';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Root} >
        <IndexRedirect to="graph" />
        <Route path="graph" component={GraphPanel} >
          <IndexRedirect to="dataflow" />
          <Route path="router" component={RoutesPanel} />
          <Route path="dataflow" breadcrumbName="dataflow" component={DataFlowPanel} />
          <Route path="dataflow/:activeNode" breadcrumbName="actionflow" component={DataFlowDetailPanel} />
        </Route>
      </Route>
    </Router>
  );
}

export default RouterConfig;
