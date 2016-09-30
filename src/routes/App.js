import React from 'react';
import { connect } from 'dva';
import ModelManager from '../components/Model/Manager';
import { selector as modelSelector } from '../models/models';
import styles from './App.css';

const CHANNEL = 'ipc';

function App({ models, dispatch }) {

  function onModelCreate(namespace) {
    dispatch({
      type: CHANNEL,
      method: 'models.create',
      payload: {
        namespace,
        filePath: `src/models/${namespace}.js`,
      },
    });
  }

  function onModelRemove(namespace, filePath) {
    dispatch({
      type: CHANNEL,
      method: 'models.remove',
      payload: {
        namespace,
        filePath,
      },
    });
  }

  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>dva-gui</h1>
      <hr />
      <ModelManager
        models={models}
        onModelCreate={onModelCreate}
        onModelRemove={onModelRemove}
      />
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    models: modelSelector(state, ownProps),
  };
}

export default connect(mapStateToProps)(App);
