import React from 'react';
import AddField from './AddField';

function Add({ onModelCreate }) {
  return (
    <div>
      <h3>Add</h3>
      <AddField onSubmit={onModelCreate} />
    </div>
  );
}

export default Add;
