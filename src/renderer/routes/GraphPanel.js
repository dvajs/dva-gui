import React from 'react';

class GraphPanel extends React.Component {
  componentDidMount() {
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default GraphPanel;
