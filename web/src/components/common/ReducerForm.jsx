import React, { Component } from 'react';
import BasicForm from './BasicForm';

export default class ReducerForm extends Component {
  render() {
    const fields = {
      namespace: {
      },
      name: {
      },
      source: {
        type: 'textarea',
        config: {
          placeholder: `Add a reducer for ${this.props.name}`,
        },
      },
    };
    return <BasicForm operation fields={fields} {...this.props} />;
  }
}

