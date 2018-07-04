import { PureComponent } from 'react';

import { makeEtherscanLink } from '../../../../helpers/eth';

export default class BaseWidget extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fnDescription: props.fnDescription,
      dapp: props.dapp
    };
  }

  getResult(defaultValue) {
    const { fnDescription, dapp } = this.props;
    if (!dapp.funcResults || dapp.funcResults[fnDescription.name] === undefined) {
      return defaultValue ? defaultValue : '';
    }

    return dapp.funcResults[fnDescription.name];
  }

  getOption(optionName, defaultValue) {
    const { fnDescription } = this.props;
    if (
      typeof fnDescription === 'object' &&
      'ui:widget_options' in fnDescription &&
      typeof fnDescription['ui:widget_options'] === 'object' &&
      optionName in fnDescription['ui:widget_options']
    ) {
      return fnDescription['ui:widget_options'][optionName];
    }

    return defaultValue ? defaultValue : undefined;
  }

  render() {
    const { fnDescription, dapp } = this.props;

    const result = this.getResult();

    if (
      typeof fnDescription === 'object' &&
      'outputs' in fnDescription &&
      typeof fnDescription.outputs === 'object' &&
      'items' in fnDescription.outputs &&
      Array.isArray(fnDescription.outputs.items) &&
      fnDescription.outputs.items.length === 1 &&
      typeof fnDescription.outputs.items[0] === 'object' &&
      '$ref' in fnDescription.outputs.items[0] &&
      fnDescription.outputs.items[0]['$ref'] === '#/definitions/address'
    ) {
      return makeEtherscanLink(result, dapp.network_id);
    }

    return result;
  }
}
