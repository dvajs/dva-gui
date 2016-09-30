import React from 'react';
import Item from './Item';

function List(props) {
  return (
    <div>
      {
        props.models.map(item =>
          <Item
            key={item.namespace}
            model={item}
            onModelRemove={props.onModelRemove}
            onModelAddReducer={props.onModelAddReducer}
            onModelRemoveReducer={props.onModelRemoveReducer}
            onModelUpdateReducer={props.onModelUpdateReducer}
          />
        )
      }
    </div>
  );
}

export default List;
