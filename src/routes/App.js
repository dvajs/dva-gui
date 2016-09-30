import React from 'react';
import { connect } from 'dva';
import ModelManager from '../components/Model/Manager';
import { selector as modelSelector } from '../models/models';
import styles from './App.css';

const CHANNEL = 'ipc';

function App({ models, dispatch }) {

  function realDispatch(method, payload) {
    dispatch({
      type: CHANNEL,
      method,
      payload,
    });
  }

  function onModelCreate(namespace) {
    realDispatch('models.create', {
      namespace,
      filePath: `src/models/${namespace}.js`,
    });
  }
  function onModelRemove(namespace, filePath) {
    realDispatch('models.remove', {
      namespace, filePath
    });
  }
  function onModelAddReducer(namespace, filePath, name) {
    // TODO: addReducer 可传入 source
    realDispatch('models.addReducer', {
      namespace, filePath, name
    });
  }
  function onModelRemoveReducer(namespace, filePath, name) {
    realDispatch('models.removeReducer', {
      namespace, filePath, name
    });
  }
  function onModelUpdateReducer(namespace, filePath, name, source) {
    realDispatch('models.removeReducer', {
      namespace, filePath, name, source
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
        onModelAddReducer={onModelAddReducer}
        onModelRemoveReducer={onModelRemoveReducer}
        onModelUpdateReducer={onModelUpdateReducer}
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
