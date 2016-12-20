import React, { Component } from 'react';
import BasicForm from './BasicForm';

export default class EffectForm extends Component {
  render() {
    const fields = {
      namespace: {
      },
      name: {
      },
      source: {
        type: 'textarea',
        config: {
          placeholder: `Add a effect for ${this.props.name}`,
        },
      },
    };
    return <BasicForm operation fields={fields} {...this.props} />;
  }
}

