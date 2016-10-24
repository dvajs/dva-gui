import React, { PropTypes } from 'react';
import { createNode } from 'rc-fringing';
import Circle from '../Geometry/Circle';
import Label from '../Geometry/Label';

class StateGroup extends React.Component {
  drawLabel() {
    const { coordinates } = this.props;
    if (!this.label) {
      this.label = createNode(
        () => ({
          getNodeData: () => ({
            id: 'StateGroup.Label',
            x: coordinates.x + 40,
            y: coordinates.y,
          }),
          canDrag: () => false,
          canSelect: () => false,
        })
      )(Label);
    }
    return this.label;
  }
  drawCircle() {
    const { coordinates } = this.props;
    if (!this.circle) {
      this.circle = createNode(
        () => ({
          getNodeData: () => ({
            id: 'StateGroup.Content',
            x: coordinates.x + 30,
            y: coordinates.y + 36,
          }),
          canDrag: () => false,
          canSelect: () => false,
        })
      )(Circle);
    }
    return this.circle;
  }
  render() {
    const { coordinates } = this.props;
    if (!coordinates) return null;

    const StateLabel = this.drawLabel();
    const StateCircle = this.drawCircle();
    return (
      <div style={{ padding: 10 }}>
        <StateLabel>STATE</StateLabel>
        <StateCircle />
      </div>
    );
  }
}


StateGroup.propTypes = {
  coordinates: PropTypes.object,
};
export default StateGroup;
