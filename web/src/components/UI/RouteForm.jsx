import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Form, Input, Select, Icon, Popconfirm } from 'antd';

const routeTypes = ['Route', 'IndexRoute', 'IndexRedirect', 'Redirect', 'Rooter'];

class RouteForm extends React.Component {
  renderAttributes() {
    const { route } = this.props;
    const attributes = Object.keys(route.attributes);
    if (!attributes.length) return null;

    return attributes.map((attr) => {
      switch (attr) {
        case 'path':
          return (<Form.Item label={attr} key={attr}>
            <Input type="text" value={route.attributes[attr]} />
          </Form.Item>);
        case 'component':
          return (
            <Form.Item label={attr} key={attr}>
              <Input type="text" value={route.attributes[attr]} />
            </Form.Item>
          );
        default:
          return (
            <Form.Item label={attr} key={attr}>
              <Input type="text" value={route.attributes[attr]} />
            </Form.Item>
          );
      }
    });
  }
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
          </div>
          {
            Object.keys(route.attributes).length ?
              <div className="block">
                { this.renderAttributes() }
              </div> :
              null
          }
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
