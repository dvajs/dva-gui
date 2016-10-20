import React, { PropTypes } from 'react';
import { connect } from 'dva';
import Welcome from '../components/UI/Welcome';
import { Button } from 'antd';

class RootPanel extends React.Component {
  render() {
    const { project } = this.props;
    return (
      <div className="RootPanel" style={{ height: '100%' }}>
        {
          !project.sourcePath ?
          <Welcome dispatch={this.props.dispatch}/> :
          this.props.children
        }
      </div>
    );
  }
}

RootPanel.propTypes = {
  project: PropTypes.object.isRequired,
};

export default connect(({ project }) => ({
  project
}))(RootPanel);
