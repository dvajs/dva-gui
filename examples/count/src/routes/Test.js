import React from 'react';
import { connect } from 'dva';

function Test(props) {
  return (
    <div>
      Route Component: 'Test'
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Test);
