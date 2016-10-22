import React, { PropTypes } from 'react';
import { createNode } from 'rc-fringing';
import ComponentNode from './ComponentNode';
import Label from '../Geometry/Label';

class ComponentGroup extends React.Component {
  drawLabel() {
    const { coordinates } = this.props;
    if (!this.label) {
      this.label = createNode(
        () => ({
          getNodeData: () => ({
            id: 'ComponentGroup.Label',
            x: coordinates.x - 10,
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
            id: 'ComponentGroup.createLink',
            x: coordinates.x + 100,
            y: coordinates.y,
          }),
          canDrag: () => false,
          canSelect: () => false,
        })
      )(Label);
    }
    return this.createLink;
  }
  drawComponentList() {
    const { coordinates, components } = this.props;
    return components.map((comp, i) => {
      const data = {
        id: comp.id,
        x: coordinates.x,
        y: coordinates.y + 36 + i * 35,
      };
      return (
        <ComponentNode key={comp.id} data={data} removeComponent={this.props.removeComponent} >
          {comp.name}
        </ComponentNode>
      );
    });
  }
  render() {
    const { coordinates } = this.props;
    if (!coordinates) return null;

    const ComponentLabel = this.drawLabel();
    const ComponentCreateLink = this.drawCreateLink();
    return (
      <div>
        <ComponentLabel>COMPONENTS</ComponentLabel>
        <ComponentCreateLink>
          <a href={null} onClick={this.props.showComponentCreateModal}>+ Create</a>
        </ComponentCreateLink>
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
};
export default ComponentGroup;
