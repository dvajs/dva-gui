import React from 'react';
import { Button, message } from 'antd';

const Welcome = (props) => {
  return (
    <div className="welcome">
      <div className="welcome-title">
        Welcome to Cygnus.
      </div>
      <Button onClick={() => {}} type="ghost">
        Open a Dva Project
      </Button>
    </div>
  );
};

export default Welcome;
