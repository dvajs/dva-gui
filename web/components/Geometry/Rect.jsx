import React from 'react';

const Rect = (props) =>
  <div className={`node ${props.className}`}>
    <div className="node-content-wrapper">{ props.children }</div>
  </div>;

export default Rect;
