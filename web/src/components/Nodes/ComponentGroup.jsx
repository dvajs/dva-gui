import React, { PropTypes } from 'react';
import ComponentNode from './ComponentNode';
import Label from '../Geometry/Label';

class ComponentGroup extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.components !== this.props.components ||
      nextProps.coordinates !== this.props.coordinates
    );
  }
  drawComponentList() {
    const { coordinates, components, noDetailLink } = this.props;
    return components.map((comp, i) => {
      const data = {
        id: comp.id,
        x: coordinates.x,
        y: coordinates.y + 36 + (i * 35),
      };
      return (
        <ComponentNode
          key={comp.id}
          data={data}
          removeComponent={this.props.removeComponent}
          showComponentDispatchModal={this.props.showComponentDispatchModal}
          noDetailLink={noDetailLink}
        >
          {comp.name}
        </ComponentNode>
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
            id: 'ComponentGroup.Label',
            x: coordinates.x,
            y: coordinates.y,
          }}
        >
          COMPONENTS
        </Label>
        {
          noCreateLink ?
            null :
              <Label
                data={{
                  id: 'ComponentGroup.createLink',
                  x: coordinates.x + 100,
                  y: coordinates.y,
                }}
              >
                <a href={null} onClick={this.props.showComponentCreateModal}>+ Create</a>
              </Label>
        }
        { this.drawComponentList() }
      </div>
    );
  }
}

ComponentGroup.propTypes = {
  coordinates: PropTypes.object,
  components: PropTypes.array,
  removeComponent: PropTypes.func,
  showComponentCreateModal: PropTypes.func,
  showComponentDispatchModal: PropTypes.func,
  noCreateLink: PropTypes.bool,
  noDetailLink: PropTypes.bool,
};
export default ComponentGroup;
