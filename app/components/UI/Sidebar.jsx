import React, { PropTypes } from 'react';

const style = {
  display: 'none',
};

const Sidebar = props =>
  <div
    className="dataflow-sidebar"
    style={{ ...style, display: props.visible ? 'block' : 'none', ...props.style }}
  >
    {props.children}
  </div>;

Sidebar.propTypes = {
  style: PropTypes.object,
  visible: PropTypes.bool,
  children: PropTypes.any,
};
export default Sidebar;
