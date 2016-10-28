import React from 'react';
import { createNode } from 'rc-fringing';

const style = {
};

const Circle = (props) => {
  if (props.size) {
    style.width = props.size;
    style.height = props.size;
  }
  return <div className="circle" style={style} />;
};


export default createNode(() => ({
  getNodeData: props => props.data,
  canDrag: () => false,
}))(Circle);
