import React, { PropTypes } from 'react';
import { createNode } from 'rc-fringing';
import ModelNode from './ModelNode';
import Label from '../Geometry/Label';

class ModelGroup extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.models !== this.props.models ||
      nextProps.coordinates !== this.props.coordinates
    );
  }
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
  drawCreateLink() {
    const { coordinates } = this.props;
    if (!this.createLink) {
      this.createLink = createNode(
        () => ({
          getNodeData: () => ({
            id: 'ModelGroup.createLink',
            x: coordinates.x + 80,
            y: coordinates.y,
          }),
          canDrag: () => false,
          canSelect: () => false,
        })
      )(Label);
    }
    return this.createLink;
  }
  drawModelList() {
    const { coordinates, models } = this.props;
    return models.map((m, i) => {
      const data = {
        id: m.id,
        x: coordinates.x,
        y: coordinates.y + 36 + (i * 35),
      };
      return (
        <ModelNode key={m.id} data={data} removeModel={this.props.removeModel}>
          {m.namespace}
        </ModelNode>
      );
    });
  }
  render() {
    const { coordinates } = this.props;
    if (!coordinates) return null;
    console.debug('Model Render');
    const ModelLabel = this.drawLabel();
    const ModelCreateLink = this.drawCreateLink();
    return (
      <div>
        <ModelLabel>MODELS</ModelLabel>
        <ModelCreateLink>
          <a href={null} onClick={this.props.showModelCreateModal}>+ Create</a>
        </ModelCreateLink>
        { this.drawModelList() }
      </div>
    );
  }
}

ModelGroup.propTypes = {
  coordinates: PropTypes.object,
  models: PropTypes.array,
  showModelCreateModal: PropTypes.func,
  removeModel: PropTypes.func,
};
export default ModelGroup;
