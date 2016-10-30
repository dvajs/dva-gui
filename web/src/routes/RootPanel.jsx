import React, { PropTypes } from 'react';
import { connect } from 'dva';
import Welcome from '../components/UI/Welcome';

class RootPanel extends React.Component {
  onOpen = () => {
    this.props.dispatch({
      type: 'ipc-application',
      method: 'application:open-file',
      payload: {},
    });
  }
  render() {
    const { project } = this.props;
    return (
      <div className="RootPanel" style={{ height: '100%' }}>
        {
          !project.sourcePath ?
            <Welcome onOpen={this.onOpen} /> :
            this.props.children
        }
      </div>
    );
  }
}

RootPanel.propTypes = {
  project: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};

export default connect(({ project }) => ({
  project,
}))(RootPanel);
