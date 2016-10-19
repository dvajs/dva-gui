import React from 'react';
import { Button } from 'antd';

const Welcome = (props) => {
  return (
    <div className="welcome">
      <div className="welcome-title">
        Welcome to Cygnus.
      </div>
      <Button type="ghost">
        Open a Dva Project
      </Button>
    </div>
  );
};

export default Welcome;
