import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Form, Icon, Popconfirm, Input } from 'antd';
import ModelSubscriptionForm from './ModelSubscriptionForm';
import ModelEffectForm from './ModelEffectForm';
import ModelReducerForm from './ModelReducerForm';
import DataList from './DataList';
import DataObject from './DataObject';

class ModelForm extends React.Component {
  onDeleteModel() {

  }
  updateState = (e) => {
    const _state = e.target.value;
    if (_state === JSON.stringify(this.props.model.state)) return;

    const { filePath, namespace } = this.props.model;
    this.props.dispatch({
      type: 'ipc',
      method: 'models.updateState',
      payload: {
        source: _state,
        namespace,
        filePath,
      },
    });
  }
  showSubscriptionModal = () => {
    this.props.dispatch({
      type: 'dataflow/showSubscriptionModal',
      payload: {},
    });
  }
  hideSubscriptionModal = () => {
    this.props.dispatch({
      type: 'dataflow/hideSubscriptionModal',
      payload: {},
    });
  }
  updateSubscription = (data) => {
    const { filePath, namespace } = this.props.model;
    this.props.dispatch({
      type: 'ipc',
      method: 'models.updateSubscription',
      payload: {
        name: data.key,
        source: data.value,
        namespace,
        filePath,
      },
    });
  }
  createSubscription = (subscription) => {
    const { namespace, filePath } = this.props.model;
    this.props.dispatch({
      type: 'ipc',
      method: 'models.addSubscription',
      payload: {
        ...subscription,
        namespace,
        filePath,
      },
    });
    this.hideSubscriptionModal();
  }
  deleteSubscription = (subscriptionName) => {
    const { filePath, namespace } = this.props.model;
    this.props.dispatch({
      type: 'ipc',
      method: 'models.removeSubscription',
      payload: {
        name: subscriptionName,
        namespace,
        filePath,
      },
    });
  }
  showEffectModal = () => {
    this.props.dispatch({
      type: 'dataflow/showEffectModal',
      payload: {},
    });
  }
  hideEffectModal = () => {
    this.props.dispatch({
      type: 'dataflow/hideEffectModal',
      payload: {},
    });
  }
  createEffect = (effect) => {
    const { namespace, filePath } = this.props.model;
    this.props.dispatch({
      type: 'ipc',
      method: 'models.addEffect',
      payload: {
        ...effect,
        namespace,
        filePath,
      },
    });
    this.hideEffectModal();
  }
  deleteEffect = (effectName) => {
    const { filePath, namespace } = this.props.model;
    this.props.dispatch({
      type: 'ipc',
      method: 'models.removeEffect',
      payload: {
        name: effectName,
        namespace,
        filePath,
      },
    });
  }
  updateEffect = (data) => {
    const { filePath, namespace } = this.props.model;
    this.props.dispatch({
      type: 'ipc',
      method: 'models.updateEffect',
      payload: {
        name: data.key,
        source: data.value,
        namespace,
        filePath,
      },
    });
  }
  showReducerModal = () => {
    this.props.dispatch({
      type: 'dataflow/showReducerModal',
      payload: {},
    });
  }
  hideReducerModal = () => {
    this.props.dispatch({
      type: 'dataflow/hideReducerModal',
      payload: {},
    });
  }
  createReducer = (reducer) => {
    const { namespace, filePath } = this.props.model;
    this.props.dispatch({
      type: 'ipc',
      method: 'models.addReducer',
      payload: {
        ...reducer,
        namespace,
        filePath,
      },
    });
    this.hideReducerModal();
  }
  updateReducer = (data) => {
    const { filePath, namespace } = this.props.model;
    this.props.dispatch({
      type: 'ipc',
      method: 'models.updateReducer',
      payload: {
        name: data.key,
        source: data.value,
        namespace,
        filePath,
      },
    });
  }
  deleteReducer = (reducerName) => {
    const { filePath, namespace } = this.props.model;
    this.props.dispatch({
      type: 'ipc',
      method: 'models.removeReducer',
      payload: {
        name: reducerName,
        namespace,
        filePath,
      },
    });
  }
  render() {
    const { dataflow, model, form, models } = this.props;
    const { reducerByIds = {}, effectByIds = {}, subscriptionByIds = {} } = models;
    return (
      <div className="dataflow-form">
        <div className="block">
          { model.namespace }
          <Popconfirm
            placement="topLeft"
            title="Are you sure to delete this component?"
            onConfirm={this.onDeleteModel}
            okText="Yes" cancelText="No"
          >
            <a className="operation">
              <Icon type="delete" /> Delete
            </a>
          </Popconfirm>
        </div>

        <Form vertical>
          <div className="block">
            <Form.Item label="Initial State">
              <Input
                type="textarea"
                defaultValue={JSON.stringify(model.state)}
                onBlur={this.updateState}
                autosize
              />
            </Form.Item>
          </div>

          <div className="block">
            <a className="operation" onClick={this.showSubscriptionModal}>+ Create</a>
            <Form.Item label="Subscriptions">
              <DataList
                source={model.subscriptions}
                render={
                  r => <DataObject
                    type="Subscription"
                    key={subscriptionByIds[r].name}
                    objectKey={subscriptionByIds[r].name}
                    objectValue={subscriptionByIds[r].source}
                    onDelete={this.deleteSubscription}
                    onBlur={this.updateSubscription}
                  />
                }
              />
            </Form.Item>
          </div>

          <div className="block">
            <a className="operation" onClick={this.showEffectModal}>+ Create</a>
            <Form.Item label="Effects">
              <DataList
                source={model.effects}
                render={
                  r => <DataObject
                    type="Effect"
                    key={effectByIds[r].name}
                    objectKey={effectByIds[r].name}
                    objectValue={effectByIds[r].source}
                    onDelete={this.deleteEffect}
                    onBlur={this.updateEffect}
                  />
                }
              />
            </Form.Item>
          </div>

          <div className="block">
            <a className="operation" onClick={this.showReducerModal}>+ Create</a>
            <Form.Item label="Reducers">
              <DataList
                source={model.reducers}
                render={
                  r => <DataObject
                    type="Reducer"
                    key={reducerByIds[r].name}
                    objectKey={reducerByIds[r].name}
                    objectValue={reducerByIds[r].source}
                    onDelete={this.deleteReducer}
                    onBlur={this.updateReducer}
                  />
                }
              />
            </Form.Item>
          </div>
        </Form>
        <ModelSubscriptionForm
          dataflow={dataflow}
          hideSubscriptionModal={this.hideSubscriptionModal}
          onSubscriptionCreate={this.createSubscription}
        />
        <ModelEffectForm
          dataflow={dataflow}
          hideEffectModal={this.hideEffectModal}
          onEffectCreate={this.createEffect}
        />
        <ModelReducerForm
          dataflow={dataflow}
          hideReducerModal={this.hideReducerModal}
          onReducerCreate={this.createReducer}
        />
      </div>
    );
  }
}

ModelForm.propTypes = {
  form: PropTypes.object.isRequired,
  model: PropTypes.object.isRequired,
  models: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  dataflow: PropTypes.object.isRequired,
};
export default connect(
  ({ dataflow }) => ({ dataflow })
)(Form.create()(ModelForm));
