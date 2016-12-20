import React from 'react';
import { connect } from 'dva';

function Root(props) {
  return (
    <div>
      {props.children}
    </div>
  );
}

export default connect()(Root);
