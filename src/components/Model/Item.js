import React from 'react';
import { Popconfirm } from 'antd';
import styles from './styles.css';

function Item({ model, onModelRemove }) {
  const {
    namespace,
    state,
    effects,
    reducers,
    subscriptions,
  } = model;

  function handleModelRemove() {
    onModelRemove(model.namespace, model.filePath);
  }

  return (
    <div className={styles.item}>
      <h3 className={styles.title}>{namespace}</h3>
      <div>state: {JSON.stringify(state)}</div>
      <div>
        effects
      </div>
      <div>
        reducers
      </div>
      <div>
        subscriptions
      </div>
      <Popconfirm title="Are you sure delete this model?" onConfirm={handleModelRemove} okText="Yes" cancelText="No">
        <button>Delete</button>
      </Popconfirm>
    </div>
  );
}

export default Item;