import React from 'react';
import { connect } from 'dva';
import Welcome from '../components/UI/Welcome';

function Root(props) {
  function openProject() {
    props.dispatch({
      type: 'project/open',
    });
  }
  return (
    <div>
      {
        props.project.sourcePath ?
        props.children :
        <Welcome onOpen={openProject} />
      }
    </div>
  );
}

export default connect(
  state => ({
    project: state.project,
  }),
)(Root);
