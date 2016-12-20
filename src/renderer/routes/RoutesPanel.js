import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { createContainer } from 'rc-fringing';
import { getRouteConnections, getRouteNodesLDR } from '../utils/router';

import Paper from '../components/Geometry/Paper';
import RouteNode from '../components/Nodes/RouteNode';
import Sidebar from '../components/UI/Sidebar';
import RouteForm from '../components/UI/RouteForm';

class RoutesPanel extends Component {
  constructor(...arg) {
    super(...arg);
    this.state = {
      activeNode: {},
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
  onActiveNodesChange = (nodes) => {
    const activeNode = nodes.length ? nodes[0] : null;
    this.setState({
      activeNode,
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
  handleReletiveLevelChange(value) {
    this.setState({
      relativeLevel: value,
    });
  }
  removeRoute = (id) => {
    const { router } = this.props;
    this.props.dispatch({
      type: 'ipc',
      method: 'router.remove',
      payload: {
        id,
        filePath: router.filePath,
      },
    });
  }
  render() {
    const { router } = this.props;
    if (!router.filePath) return null;

    const { activeNode = {} } = this.state;
    const { routeByIds = {}, tree } = router;
    const data = getRouteNodesLDR(tree);
    const connections = getRouteConnections(router.tree);
    const RoutesPaper = this.drawPaper();
    return (
      <div className="view view-graph">
        <RoutesPaper
          connections={connections}
          onActiveNodesChange={this.onActiveNodesChange}
        >
          <div className="view view-routerlayout">
            {
              data.map((route, i) => {
                const depth = routeByIds[route.id].depth;
                const gap = depth > 2 ? 200 : 100;
                return (
                  <RouteNode
                    key={route.id}
                    data={{
                      id: route.id,
                      x: depth * gap,
                      y: i * 40,
                    }}
                    route={routeByIds[route.id]}
                  />
                );
              })
            }
          </div>
        </RoutesPaper>
        <Sidebar visible={!!activeNode.id}>
          {
            activeNode.id ?
              <RouteForm route={router.routeByIds[activeNode.id]} onRemove={this.removeRoute} /> :
              null
          }
        </Sidebar>
      </div>
    );
  }
}

RoutesPanel.propTypes = {
  router: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
export default connect(state => ({ router: state['dva.router'] }))(RoutesPanel);
