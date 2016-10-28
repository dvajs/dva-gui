import React, { PropTypes } from 'react';
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

Circle.propTypes = {
  size: PropTypes.string,
};

export default createNode(() => ({
  getNodeData: props => props.data,
  canDrag: props => (typeof props.data.canDrag !== 'undefined' ? props.data.canDrag : false),
  canSelect: props => (typeof props.data.canSelect !== 'undefined' ? props.data.canDrag : false),
}))(Circle);
