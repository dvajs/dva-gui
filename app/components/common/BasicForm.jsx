import React, { Component, PropTypes } from 'react';
import { Input, Button, Form, Select } from 'antd';

class EffectForm extends Component {
  handleSave = () => {
    const values = this.props.form.getFieldsValue();
    this.props.onSave(values);
  }
  handleCancel = () => {
    this.props.onCancel();
  }
  render() {
    const { fields, form, operation } = this.props;
    const { getFieldDecorator } = form;

    const keys = Object.keys(fields);
    const items = keys.map(key => {
      const current = fields[key];
      let fill;
      switch (current.type) {
        case 'textarea':
          fill = (<Input
            type="textarea"
            autosize={{ minRows: 2, maxRows: 6 }}
            { ...current.config }
          />);
          break;
        case 'select':
          fill = (<Select size="large" { ...current.config } >
            { current.options.map(option =>
              <Option value={option.value} key={option.value}>{option.label}</Option>)
            }
          </Select>);
          break;
        default:
          fill = <Input type="text" { ...current.config } />;
          break;
      }
      return (<Form.Item label={current.label || key} key={key}>
        {
          getFieldDecorator(key, {
            initialValue: this.props[key],
          })(fill)
        }
      </Form.Item>);
    });

    return (<Form vertical>
      { items }
      { operation && <div className="effect-form-operation">
        <Button type="primary" onClick={this.handleSave}>Save</Button>
        <Button onClick={this.handleCancel}>Cancel</Button>
      </div> }
    </Form>);
  }
}
export default Form.create()(EffectForm);
