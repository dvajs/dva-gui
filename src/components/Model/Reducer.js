import React from 'react';
import { Popconfirm } from 'antd';

function Reducer({ reducer, onModelRemoveReducer }) {

  function handleRemove() {
    onModelRemoveReducer(reducer.name);
  }

  return (
    <div>
      { reducer.name }
      { ' ' }
      <Popconfirm title="Are you sure delete this reducer?" onConfirm={handleRemove} okText="Yes" cancelText="No">
        <a href="#">Delete</a>
      </Popconfirm>
    </div>
  );
}

export default Reducer;
