
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { createContainer } from 'rc-fringing';
import { getRouteConnections, getRouteNodesLDR } from '../utils/router';

import Paper from '../components/Geometry/Paper';
import RouteNode from '../components/Nodes/RouteNode';

class RoutesPanel extends Component {
  constructor(...arg) {
    super(...arg);
    this.state = {
      activeNodes: [],
    };
  }
  onSave(id, result) {
    this.props.dispatch({
      type: 'update/route',
      payload: {
        id,
        result,
      },
    });
  }
  drawPaper() {
    if (!this.Paper) {
      this.Paper = createContainer({
        width: 1000,
        height: 1000,
      })(Paper);
    }
    return this.Paper;
  }
  handleActiveNodesChange(nodes) {
    const values = nodes.map(n => n.id);
    if (values.sort().toString() !== this.state.activeNodes.sort().toString()) {
      this.setState({
        activeNodes: nodes.map(n => n.id),
      });
    }
  }
  handleReletiveLevelChange(value) {
    this.setState({
      relativeLevel: value,
    });
  }
  render() {
    const { router } = this.props;
    if (!router.filePath) return null;
    const { routeByIds = {}, tree } = router;
    const data = getRouteNodesLDR(tree);

    const connections = getRouteConnections(router.tree);
    const RoutesPaper = this.drawPaper();
    return (
      <div className="view view-graph">
        <RoutesPaper
          connections={connections}
          onActiveNodesChange={this:: this.handleActiveNodesChange}
        >
          <div className="view view-routerlayout">
            {
              data.map((route, i) =>
                <RouteNode
                  key={route.id}
                  data={{
                    id: route.id,
                    x: routeByIds[route.id].depth * 200,
                    y: i * 40,
                  }}
                  route={routeByIds[route.id]}
                />
              )
            }
          </div>
        </RoutesPaper>
      </div>
    );
  }
}

RoutesPanel.propTypes = {
  router: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
export default connect(state => ({ router: state['dva.router'] }))(RoutesPanel);
