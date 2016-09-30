import React from 'react';
import { Form, Input } from 'antd';

function AddField({ form, onSubmit }) {
  const { getFieldDecorator, getFieldsValue, resetFields } = form;

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(getFieldsValue().namespace);
    resetFields();
  }

  return (
    <Form onSubmit={handleSubmit}>
      {
        getFieldDecorator('namespace')(
          <Input placeholder="model namespace" />
        )
      }
    </Form>
  );
}

export default Form.create()(AddField);
