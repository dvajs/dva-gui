import React, { PropTypes } from 'react';

class DataList extends React.Component {
  render() {
    const { source = [], render } = this.props;
    return (
      <ul className="datalist">
        {
          source.map(data => <li key={data}>{ render(data) }</li>)
        }
      </ul>
    );
  }
}

DataList.propTypes = {
  source: PropTypes.array,
  render: PropTypes.func,
};
export default DataList;
