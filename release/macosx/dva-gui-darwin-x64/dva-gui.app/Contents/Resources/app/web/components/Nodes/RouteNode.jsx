import React, { Component, PropTypes } from 'react';
import { createNode } from 'rc-fringing';
import { Form, Row, Col } from 'antd';

class RouterNode extends Component {
  render() {
    const { route = {} } = this.props;
    const { attributes = {} } = route;
    let result;

    switch (route.type) {
      case 'Route':
        result = (<Row type="flex">
          <Col className="node-router-primary">{attributes.path}</Col>
          <Col className="node-router-normal">{attributes.component}</Col>
        </Row>);
        break;
      case 'IndexRedirect':
        result = (<div className="node-router-primary">IndexRedirect to {attributes.to}</div>);
        break;
      case 'Router':
        result = (<div className="node-router-normal">Root</div>);
        break;
      case 'Redirect':
        result = (<Row type="flex">
          <Col className="node-router-primary">{attributes.from}</Col>
          <Col className="node-router-primary">=></Col>
          <Col className="node-router-primary">{attributes.to}</Col>
        </Row>);
        break;
      default:
        result = null;
    }
    return (<div className="node node-router">
      { result }
      <div className="node-children-wrapper">
        { this.props.children }
      </div>
    </div>);
  }
}

RouterNode.propTypes = {
  route: PropTypes.object.isRequired,
  children: PropTypes.array,
};

export default createNode(() => ({
  getNodeData: (props) => props.data,
  canDrag: () => false,
}))(Form.create()(RouterNode));
