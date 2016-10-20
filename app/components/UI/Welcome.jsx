import React from 'react';
import { Button, message } from 'antd';

const ipcHelper = require('../../../main/ipc-helper')('');

const Welcome = (props) => {
  const quitApp = () => {
    ipcHelper.send('application:quit');
  }
  return (
    <div className="welcome">
      <div className="welcome-title">
        Welcome to Cygnus.
      </div>
      <Button onClick={quitApp} type="ghost">
        Open a Dva Project
      </Button>
    </div>
  );
};

export default Welcome;
