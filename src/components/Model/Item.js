import React from 'react';
import { Popconfirm } from 'antd';
import Reducer from './Reducer';
import AddField from './AddField';
import styles from './styles.css';

function Item(props) {
  const { model } = props;
  const {
    namespace,
    state,
    effects,
    reducers,
    subscriptions,
  } = model;

  function handleModelRemove() {
    props.onModelRemove(model.namespace, model.filePath);
  }

  function handleModelAddReducer(name) {
    props.onModelAddReducer(model.namespace, model.filePath, name);
  }

  function handleModelRemoveReducer(name) {
    props.onModelRemoveReducer(model.namespace, model.filePath, name);
  }

  return (
    <div className={styles.item}>
      <h3 className={styles.title}>{namespace}</h3>
      <div>state: {JSON.stringify(state)}</div>
      <div>
        reducers
        <div className={styles.itemList}>
          {
            reducers.map(reducer =>
              <Reducer
                key={reducer.name}
                reducer={reducer}
                onModelRemoveReducer={handleModelRemoveReducer}
                onModelUpdateReducer={props.onModelUpdateReducer}
              />
            )
          }
          <AddField onSubmit={handleModelAddReducer} />
        </div>
      </div>
      <div>
        effects
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