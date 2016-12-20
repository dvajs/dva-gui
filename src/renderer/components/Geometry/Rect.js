import React from 'react';
import { createNode } from 'rc-fringing';

const Rect = (props) =>
  <div className={`node ${props.className}`}>
    <div className="node-content-wrapper">{ props.children }</div>
  </div>;

export default createNode(() => ({
  getNodeData: props => props.data,
  canDrag: () => false,
}))(Rect);
