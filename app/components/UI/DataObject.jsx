import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Input, Icon, Popconfirm } from 'antd';

class DataObject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  onBlur = (e) => {
    const updatedValue = e.target.value;
    if (updatedValue === this.props.objectValue) return;

    this.props.onBlur({
      key: this.props.objectKey,
      value: updatedValue,
    });
  }
  toggle = () => {
    this.setState({
      open: !this.state.open,
    });
  }
  render() {
    const { objectKey, objectValue } = this.props;
    const connectCls = classNames({
      'dataobject-content': true,
      'dataobject-content-open': this.state.open,
    });
    return (
      <div className="dataobject">
        <div className="dataobject-left">
          {
            this.state.open ?
            <Icon type="minus-square-o" onClick={this.toggle} /> :
            <Icon type="plus-square-o" onClick={this.toggle} />
          }
        </div>
        <div className={connectCls}>
          {objectKey}
          <Input
            type="textarea"
            defaultValue={objectValue}
            rows="3"
            autosize
            className="object-value"
            onBlur={this.onBlur}
          />
        </div>
        <div className="dataobject-right">
          <Popconfirm
            placement="topLeft"
            title={`Are you sure to delete this ${this.props.type} ?`}
            onConfirm={() => this.props.onDelete(objectKey)}
            okText="Yes" cancelText="No"
          >
            <Icon type="delete" />
          </Popconfirm>
        </div>
      </div>
    );
  }
}

DataObject.propTypes = {
  type: PropTypes.string,
  objectKey: PropTypes.string.isRequired,
  objectValue: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onBlur: PropTypes.func,
};
export default DataObject;
