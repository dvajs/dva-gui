import React, { PropTypes } from 'react';
import { Modal, Form, Input } from 'antd';
import Editor from './Editor';

class ModelReducerForm extends React.Component {
  handleOk = () => {
    const values = this.props.form.getFieldsValue();
    this.props.onReducerCreate(values);
  }
  handleCancel = () => {
    this.props.hideReducerModal();
  }
  render() {
    const { dataflow, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        title="Add Reducers"
        visible={dataflow.showReducerModal}
        okText="Confrim" cancelText="Cancel"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form vertical>
          <Form.Item>
            {
              getFieldDecorator('name')(
                <Input type="text" placeholder="Reducer Name" />
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

ModelReducerForm.propTypes = {
  form: PropTypes.object.isRequired,
  dataflow: PropTypes.object.isRequired,
  hideReducerModal: PropTypes.func.isRequired,
  onReducerCreate: PropTypes.func.isRequired,
};
export default Form.create()(ModelReducerForm);
