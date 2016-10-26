import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Form, Input, Select, Icon, Popconfirm } from 'antd';

const routeTypes = ['Route', 'IndexRoute', 'IndexRedirect', 'Redirect', 'Rooter'];

class RouteForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { route } = this.props;
    return (
      <div className="dataflow-form">
        <div className="block">
          &nbsp;
          <Popconfirm
            placement="topLeft"
            title="Are you sure to delete this route?"
            onConfirm={() => this.props.onRemove(route.id)}
            okText="Yes" cancelText="No"
          >
            <a className="operation">
              <Icon type="delete" /> Delete
            </a>
          </Popconfirm>
        </div>
        <Form vertical>
          <div className="block">
            <Form.Item label="Type">
              {
                getFieldDecorator('type', { initialValue: route.type })(
                  <Select>
                    { routeTypes.map(type =>
                      <Select.Option key={type} value={type}>{type}</Select.Option>) }
                  </Select>
                )
              }
            </Form.Item>
            {
              route.attributes.path ?
                <Form.Item label="Path">
                  <Input type="text" value={route.attributes.path} />
                </Form.Item> :
                null
            }
            {
              route.attributes.component ?
                <Form.Item label="Component">
                  <Input type="text" value={route.attributes.component} />
                </Form.Item> :
                null
            }
          </div>
        </Form>
      </div>
    );
  }
}

RouteForm.propTypes = {
  form: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};
export default connect()(Form.create()(RouteForm));
