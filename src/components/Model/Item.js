import React from 'react';

function Item({ model }) {
  const {
    namespace,
    state,
    effects,
    reducers,
    subscriptions,
  } = model;

  return (
    <div>
      <h3>{namespace}</h3>
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
    </div>
  );
}

export default Item;