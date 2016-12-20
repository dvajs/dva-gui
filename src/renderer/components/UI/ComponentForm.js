import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Form, Input, Icon, Popconfirm } from 'antd';
import DataList from './DataList';
import DispatchFormModal from './DispatchFormModal';

class ComponentForm extends React.Component {
  onDeleteComponent = () => {
    const { component } = this.props;
    this.props.dispatch({
      type: 'ipc',
      method: 'routeComponents.remove',
      payload: {
        filePath: component.filePath,
      },
    });
  }
  showComponentDispatchModal = () => {
    this.props.dispatch({
      type: 'dataflow/showComponentDispatchModal',
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { component } = this.props;
    return (
      <div className="dataflow-form">
        <div className="block">
          { component.name}
          <Popconfirm
            placement="topLeft"
            title="Are you sure to delete this component?"
            onConfirm={this.onDeleteComponent}
            okText="Yes" cancelText="No"
          >
            <a className="operation">
              <Icon type="delete" /> Delete
            </a>
          </Popconfirm>
        </div>
        <Form vertical>
          <div className="block">
            <Form.Item label="StateMappings">
              <DataList
                source={component.stateMappings}
                render={model => model}
              />
            </Form.Item>
          </div>
          <div className="block">
            <a
              href={null}
              className="operation"
              onClick={this.showComponentDispatchModal}
            >
              + Create
            </a>
            <Form.Item label="Dispatches">
              <DataList
                source={component.dispatches}
                render={action => action}
              />
            </Form.Item>
          </div>
        </Form>
        <DispatchFormModal />
      </div>
    );
  }
}

ComponentForm.propTypes = {
  form: PropTypes.object.isRequired,
  component: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
};
export default connect()(Form.create()(ComponentForm));
