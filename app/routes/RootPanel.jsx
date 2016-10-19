import React, { PropTypes } from 'react';
import { connect } from 'dva';
import Welcome from '../components/UI/Welcome';

class RootPanel extends React.Component {
  render() {
    const { project } = this.props;
    return (
      <div className="RootPanel" style={{ height: '100%' }}>
        {
          !project.sourcePath ?
          <Welcome /> :
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
  project,
}))(RootPanel);
