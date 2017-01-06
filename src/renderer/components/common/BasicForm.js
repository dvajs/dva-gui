import React, { Component } from 'react';
import { Input, Button, Form, Select } from 'antd';
import Editor from '../UI/Editor';

const editorWrapperStyle = { display: 'flex', height: 160 };
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
          fill = (
            <Editor
              content=""
              language="javascript"
            />
          );
          break;
        case 'select':
          fill = (<Select size="large" {...current.config} >
            { current.options.map(option =>
              <Select.Option value={option.value} key={option.value}>{option.label}</Select.Option>)
            }
          </Select>);
          break;
        default:
          fill = <Input type="text" {...current.config} disabled />;
          break;
      }
      return (<Form.Item label={current.label || key} key={key}>
        <div style={current.type === 'textarea' ? editorWrapperStyle : {}}>
          {
            getFieldDecorator(key, {
              initialValue: this.props[key],
            })(fill)
          }
        </div>
      </Form.Item>);
    });

    return (<Form vertical>
      { items }
      { operation && <div className="effect-form-operation">
        <Button type="primary" onClick={this.handleSave}>Save</Button>
        <Button type="ghost" onClick={this.handleCancel}>Cancel</Button>
      </div> }
    </Form>);
  }
}
export default Form.create()(EffectForm);
