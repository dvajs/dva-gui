import React, { PropTypes } from 'react';
import { Button } from 'antd';
import './Welcome.less';

const Welcome = props =>
  <div className="welcome">
    <div className="welcome-title">
      Welcome to DvaGUI.
    </div>
    <Button type="ghost" onClick={props.onOpen}>
      Open a Dva Project
    </Button>
  </div>;

Welcome.propTypes = {
  onOpen: PropTypes.func,
};

export default Welcome;
