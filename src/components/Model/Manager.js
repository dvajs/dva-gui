import React from 'react';
import List from './List';
import Add from './Add';
import styles from './styles.css';

function Manager(props) {
  return (
    <div className={styles.layout}>
      <h2>Models</h2>
      <List
        models={props.models}
        onModelRemove={props.onModelRemove}
      />
      <Add onModelCreate={props.onModelCreate} />
    </div>
  );
}

export default Manager;
