import React, { PropTypes } from 'react';
import { Modal, Form, Input } from 'antd';
import Editor from './Editor';

class ModelSubscriptionForm extends React.Component {
  handleOk = () => {
    const values = this.props.form.getFieldsValue();
    this.props.onSubscriptionCreate(values);
  }
  handleCancel = () => {
    this.props.hideSubscriptionModal();
  }
  render() {
    const { dataflow, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        title="Add Subscription"
        visible={dataflow.showSubscriptionModal}
        okText="Confrim" cancelText="Cancel"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form vertical>
          <Form.Item label="Subscription">
            {
              getFieldDecorator('name')(
                <Input type="text" placeholder="Subscription Name" />
              )
            }
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', height: 160 }}>
              {
                getFieldDecorator('source')(
                  <Editor
                    content=""
                    language="javascript"
                  />
                )
              }
            </div>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

ModelSubscriptionForm.propTypes = {
  dataflow: PropTypes.object.isRequired,
  hideSubscriptionModal: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  onSubscriptionCreate: PropTypes.func,
};
export default Form.create()(ModelSubscriptionForm);
