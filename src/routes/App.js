import React from 'react';
import { connect } from 'dva';
import ModelManager from '../components/Model/Manager';
import { selector as modelSelector } from '../models/models';

function App({ models, dispatch }) {
  return (
    <div>
      <h1>dva-gui</h1>
      <ModelManager models={models} />
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    models: modelSelector(state, ownProps),
  };
}

export default connect(mapStateToProps)(App);
