import React, { PropTypes } from 'react';
import { createNode } from 'rc-fringing';
import ModelNode from './ModelNode';
import Label from '../Geometry/Label';

class ModelGroup extends React.Component {
  drawLabel() {
    const { coordinates } = this.props;
    if (!this.label) {
      this.label = createNode(
        () => ({
          getNodeData: () => ({
            id: 'ModelGroup.Label',
            x: coordinates.x,
            y: coordinates.y,
          }),
          canDrag: () => false,
          canSelect: () => false,
        })
      )(Label);
    }
    return this.label;
  }
  drawModelList() {
    const { coordinates, models } = this.props;
    return models.map((m, i) => {
      const data = {
        id: m.id,
        x: coordinates.x,
        y: coordinates.y + 36 + i * 35,
      };
      return (
        <ModelNode key={m.id} data={data}>
          {m.namespace}
        </ModelNode>
      );
    });
  }
  render() {
    const { coordinates } = this.props;
    if (!coordinates) return null;

    const ModelLabel = this.drawLabel();
    return (
      <div>
        <ModelLabel>MODELS</ModelLabel>
        { this.drawModelList() }
      </div>
    );
  }
}

ModelGroup.propTypes = {
  coordinates: PropTypes.object,
  models: PropTypes.array,
};
export default ModelGroup;
