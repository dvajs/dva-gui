import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Modal, Form } from 'antd';
import Editor from './Editor';

class ComponentSourceModal extends React.Component {
  handelCancel = () => {
    this.props.dispatch({
      type: 'dataflow/hideComponentSource',
    });
  }
  handleOk = () => {
    const values = this.props.form.getFieldsValue();
    this.props.dispatch({
      type: 'ipc',
      method: 'routeComponents.update',
      payload: {
        source: values.source,
        filePath: this.props.dataflow.currentComponent.filePath,
      },
    });
    this.handelCancel();
  }
  render() {
    const { dataflow, form } = this.props;
    const { getFieldDecorator } = form;

    if (!dataflow.currentComponent) return null;
    return (
      <Modal
        visible={dataflow.showComponentSource}
        okText="Update" cancelText="Cancel"
        onOk={this.handleOk}
        onCancel={this.handelCancel}
        maskClosable={false}
        width={720}
      >
        <Form vertical>
          <Form.Item label={dataflow.currentComponent.name}>
            <div style={{ display: 'flex', height: 360 }}>
              {
                getFieldDecorator('source')(
                  <Editor
                    content={dataflow.currentComponent.source}
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

ComponentSourceModal.propTypes = {
  dataflow: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object,
  project: PropTypes.object,
};
export default connect(({ dataflow, project }) => ({ dataflow, project }))(
  Form.create()(ComponentSourceModal)
);
