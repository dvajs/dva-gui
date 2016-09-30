import React from 'react';
import Item from './Item';

function List({ models, onModelRemove }) {
  return (
    <div>
      {
        models.map(item =>
          <Item
            key={item.namespace}
            model={item}
            onModelRemove={onModelRemove}
          />
        )
      }
    </div>
  );
}

export default List;
