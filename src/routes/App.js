import React from 'react';
import { connect } from 'dva';
import ModelManager from '../components/Model/Manager';
import { selector as modelSelector } from '../models/models';
import styles from './App.css';

function App({ models, dispatch }) {
  return (
    <div className={styles.normal}>
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
