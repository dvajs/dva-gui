import React from 'react';
import Item from './Item';

function List({ models }) {
  return (
    <div>
      { models.map(item => <Item key={item.namespace} model={item} />) }
    </div>
  );
}

export default List;
