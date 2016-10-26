import React from 'react';
import { Router, Route } from 'dva/router';
import App from './routes/App';

export default function({ history }) {
  return (
    <Router history={ history }>
      <Route component={App} />
    </Router>
  );
}
