import React, { PropTypes } from 'react';
import Circle from '../Geometry/Circle';
import Label from '../Geometry/Label';

class StateGroup extends React.Component {
  render() {
    const { coordinates } = this.props;
    if (!coordinates) return null;

    return (
      <div style={{ padding: 10 }}>
        <Label
          data={{
            id: 'StateGroup.Label',
            x: coordinates.x + 40,
            y: coordinates.y,
          }}
        >
          STATE
        </Label>
        <Circle
          data={{
            id: 'StateGroup.Content',
            x: coordinates.x + 30,
            y: coordinates.y + 36,
          }}
        />
      </div>
    );
  }
}


StateGroup.propTypes = {
  coordinates: PropTypes.object,
};
export default StateGroup;
