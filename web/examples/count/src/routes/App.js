import React from 'react';

function App({ dispatch }) {
  function handleClick() {
    dispatch({
      type: 'count/add',
    });
    dispatch({
      type: 'app/showLoading',
    });
  }
  return (
    <div>App</div>
  );
}

export default App;
