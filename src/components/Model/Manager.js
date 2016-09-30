import React from 'react';
import List from './List';
import Add from './Add';

function Manager(props) {
  return (
    <div>
      <h2>Models</h2>
      <List models={props.models} />
      <Add />
    </div>
  );
}

export default Manager;
