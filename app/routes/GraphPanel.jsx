import { connect } from 'dva';
import React from 'react';
import GraphTabs from '../components/UI/Tabs';

class GraphPanel extends React.Component {
  componentDidMount() {
  }
  render() {
    return (
      <div className="panel panel-graph">
        <GraphTabs />
        <div style={{ padding: '60px 20px 20px' }}>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default connect(({ dva }) => ({ dva }))(GraphPanel);
