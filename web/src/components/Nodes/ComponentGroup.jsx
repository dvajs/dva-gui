import React, { PropTypes } from 'react';
import { createNode } from 'rc-fringing';
import ComponentNode from './ComponentNode';
import Label from '../Geometry/Label';

class ComponentGroup extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.components !== this.props.components ||
      nextProps.coordinates !== this.props.coordinates
    );
  }
  drawLabel() {
    const { coordinates } = this.props;
    if (!this.label) {
      this.label = createNode(
        () => ({
          getNodeData: () => ({
            id: 'ComponentGroup.Label',
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
    const ComponentLabel = this.drawLabel();
    let ComponentCreateLink;
    if (!noCreateLink) {
      ComponentCreateLink = this.drawCreateLink();
    }
    return (
      <div>
        <ComponentLabel>COMPONENTS</ComponentLabel>
        {
          noCreateLink ?
            null :
              <ComponentCreateLink>
                <a href={null} onClick={this.props.showComponentCreateModal}>+ Create</a>
              </ComponentCreateLink>
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
