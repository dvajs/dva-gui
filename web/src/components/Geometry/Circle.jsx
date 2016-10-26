import React from 'react';

const style = {
};

const Node = (props) => {
  if (props.size) {
    style.width = props.size;
    style.height = props.size;
  }
  return <div className="circle" style={style} />;
};


export default Node;
