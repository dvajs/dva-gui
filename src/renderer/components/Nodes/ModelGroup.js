import React, { PropTypes } from 'react';
import ModelNode from './ModelNode';
import Label from '../Geometry/Label';

class ModelGroup extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.models !== this.props.models ||
      nextProps.coordinates !== this.props.coordinates
    );
  }
  drawModelList() {
    const { coordinates, models, noDetailLink, noRemoveLink } = this.props;
    return models.map((m, i) => {
      const data = {
        id: m.id,
        x: coordinates.x,
        y: coordinates.y + 36 + (i * 35),
      };
      return (
        <ModelNode
          key={m.id}
          data={data}
          removeModel={this.props.removeModel}
          noDetailLink={noDetailLink}
          noRemoveLink={noRemoveLink}
        >
          {m.namespace}
        </ModelNode>
      );
    });
  }
  render() {
    const { coordinates, noCreateLink } = this.props;
    if (!coordinates) return null;
    return (
      <div>
        <Label
          data={{
            id: 'ModelGroup.Label',
            x: coordinates.x,
            y: coordinates.y,
          }}
        >
          MODELS
        </Label>
        {
          noCreateLink ?
            null :
            <Label
              data={{
                id: 'ModelGroup.createLink',
                x: coordinates.x + 100,
                y: coordinates.y,
              }}
            >
              <a href={null} onClick={this.props.showModelCreateModal}>+ Create</a>
            </Label>
        }
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
  noCreateLink: PropTypes.bool,
  noDetailLink: PropTypes.bool,
};
export default ModelGroup;
