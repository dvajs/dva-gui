import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Modal, Form, Input } from 'antd';

class ModelCreateModal extends React.Component {
  handelCancel = () => {
    this.props.dispatch({
      type: 'dataflow/hideModelCreateModal',
    });
  }
  handleOk = () => {
    const values = this.props.form.getFieldsValue();
    this.props.dispatch({
      type: 'ipc',
      method: 'models.create',
      payload: {
        namespace: values.namespace,
        filePath: `${values.filePath}/${values.namespace}.js`,
      },
    });
    this.handelCancel();
  }
  render() {
    const { dataflow, project, form } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    const namespaceInputVal = getFieldValue('namespace') ?
      `/${getFieldValue('namespace')}.js` :
      '/(namespace).js';

    return (
      <Modal
        title="Create a Model"
        visible={dataflow.showModelCreateModal}
        okText="Confrim" cancelText="Cancel"
        onOk={this.handleOk}
        onCancel={this.handelCancel}
        maskClosable={false}
      >
        <Form vertical>
          <Form.Item label="Namespace">
            {
              getFieldDecorator('namespace')(<Input type="text" />)
            }
          </Form.Item>
          <Form.Item label="File Path">
            start with {`"${project.sourcePath}/"`}
            {
              getFieldDecorator('filePath', {
                initialValue: 'models',
              })(
                <Input
                  addonAfter={namespaceInputVal}
                />
              )
            }
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

ModelCreateModal.propTypes = {
  dataflow: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object,
  project: PropTypes.object,
};
export default connect(({ dataflow, project }) => ({ dataflow, project }))(
  Form.create()(ModelCreateModal)
);
