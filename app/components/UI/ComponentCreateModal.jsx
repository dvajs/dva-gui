import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Modal, Form, Input } from 'antd';

class ComponentCreateModal extends React.Component {
  handelCancel = () => {
    this.props.dispatch({
      type: 'dataflow/hideComponentCreateModal',
    });
  }
  handleOk = () => {
    const values = this.props.form.getFieldsValue();
    this.props.dispatch({
      type: 'ipc',
      method: 'routeComponents.create',
      payload: {
        componentName: values.componentName,
        filePath: `${values.filePath}/${values.componentName}.jsx`,
      },
    });
    this.handelCancel();
  }
  render() {
    const { dataflow, project, form } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    const componentNameInputVal = getFieldValue('componentName') ?
      `/${getFieldValue('componentName')}.jsx` :
      '/(ComponentName).jsx';

    return (
      <Modal
        title="Create a component"
        visible={dataflow.showComponentCreateModal}
        okText="Confrim" cancelText="Cancel"
        onOk={this.handleOk}
        onCancel={this.handelCancel}
        maskClosable={false}
      >
        <Form vertical>
          <Form.Item label="Component Name">
            {
              getFieldDecorator('componentName')(<Input type="text" />)
            }
          </Form.Item>
          <Form.Item label="File Path">
            start with {`"${project.sourcePath}/"`}
            {
              getFieldDecorator('filePath')(
                <Input
                  addonAfter={componentNameInputVal}
                />
              )
            }
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

ComponentCreateModal.propTypes = {
  dataflow: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object,
  project: PropTypes.object,
};
export default connect(({ dataflow, project }) => ({ dataflow, project }))(
  Form.create()(ComponentCreateModal)
);
