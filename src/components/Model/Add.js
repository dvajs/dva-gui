import React from 'react';
import { Form, Input } from 'antd';

function Add({ form, onDispatch, onModelCreate }) {
  const { getFieldDecorator, getFieldsValue, resetFields } = form;

  function handleSubmit(e) {
    e.preventDefault();
    onModelCreate(getFieldsValue().namespace);
    resetFields();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Add</h3>
      {
        getFieldDecorator('namespace')(
          <Input placeholder="model namespace" />
        )
      }
    </Form>
  );
}

export default Form.create()(Add);
