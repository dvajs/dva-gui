import React, { PropTypes } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { connect } from 'dva';
import {
  modelsSelector,
  componentByIdsSelector,
} from '../../selectors/dva';


class ComponentDispatchModal extends React.Component {
  handelCancel = () => {
    this.props.dispatch({
      type: 'dataflow/hideComponentDispatchModal',
    });
  }
  handleOk = () => {
    const { activeNodeId, componentByIds } = this.props;
    const comp = componentByIds[activeNodeId];
    if (!comp) return;  // TODO: add error message

    const values = this.props.form.getFieldsValue();
    this.props.dispatch({
      type: 'ipc',
      method: 'routeComponents.addDispatch',
      payload: {
        filePath: comp.filePath,
        componentName: comp.componentName,
        actionType: `${values.modelNamespace}/${values.actionType}`,
      },
    });
    this.handelCancel();
  }
  render() {
    const { dataflow, models, form } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    const modelNamespaceInputVal = getFieldValue('modelNamespace') ?
      `${getFieldValue('modelNamespace')}/` :
      '';

    return (
      <Modal
        title="Dispatch a new action"
        visible={dataflow.showComponentDispatchModal}
        okText="Confrim" cancelText="Cancel"
        onOk={this.handleOk}
        onCancel={this.handelCancel}
        maskClosable={false}
      >
        <Form vertical>
          <Form.Item label="Target Model">
            {
              getFieldDecorator('modelNamespace')(
                <Select>
                  {
                    models.map(model =>
                      <Select.Option
                        key={model.namespace}
                        value={model.namespace}
                      >
                        {model.namespace}
                      </Select.Option>
                    )
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="ActionType">
            {
              getFieldDecorator('actionType')(
                <Input
                  addonBefore={modelNamespaceInputVal}
                />
              )
            }
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

ComponentDispatchModal.propTypes = {
  dataflow: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object,
  models: PropTypes.array,
  componentByIds: PropTypes.object,
  activeNodeId: PropTypes.string,
};
export default connect(
  state => ({
    dataflow: state.dataflow,
    models: modelsSelector(state),
    componentByIds: componentByIdsSelector(state),
  })
)(
  Form.create()(ComponentDispatchModal)
);
