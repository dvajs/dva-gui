import React, { PropTypes } from 'react';
import { Modal, Form, Input } from 'antd';

class DispatchFormModal extends React.Component {
  handleOk() {}
  handleCancel = () => {
  }
  render() {
    return (
      <Modal
        title="Dispatch an action"
        visible={false}
        okText="Confrim" cancelText="Cancel"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form vertical>
          <Form.Item>
            <Input type="text" placeholder="Type" />
          </Form.Item>
          <Form.Item>
            <Input type="textarea" placeholder="Payload" rows="5" />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

DispatchFormModal.propTypes = {
};
export default DispatchFormModal;
