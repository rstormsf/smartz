import * as React from 'react';
import { Link } from 'react-router-dom';

import * as api from '../../api/apiRequests';
import { blockchains } from '../../constants/constants';
import { getFuncType } from '../../helpers/common';
import { processControlForm, processResult } from '../../helpers/eth';
import Alert from '../common/Alert';
import ColumnFunc from './column-func/ColumnFunc';
import FunctionButton from './function-button/FunctionButton';
import MinimalFooter from './minimal-footer/MinimalFooter';
import ViewFunc from './view-func/ViewFunc';

import './Dapp.less';


declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    Intercom: any;
  }
}

interface IDappProps {
  match: any;
  dapp: any;
  metamaskStatus: any;
  viewFuncResult: any;
}

interface IDappState {
  updateCycleActive: any;
  funcActive: any;
}

class Dapp extends React.Component<IDappProps, IDappState> {
  constructor(props) {
    super(props);

    this.state = {
      updateCycleActive: false,
      funcActive: null,
    };

    this.getConstants = this.getConstants.bind(this);
  }

  public componentWillMount() {
    api.getDapp(this.props.match.params.id);
  }

  public componentDidMount() {
    window.Intercom('update');
  }

  public componentDidUpdate() {
    // TODO: refactor this shit
    const { dapp, metamaskStatus } = this.props;

    if (dapp && dapp.blockchain === blockchains.ethereum && !this.state.updateCycleActive) {
      if (metamaskStatus === 'noMetamask' || metamaskStatus === 'unlockMetamask') {
        return null;
      }
      this.getConstants();
    }
  }

  public getConstants() {
    const { dapp, viewFuncResult } = this.props;
    if (!dapp) {
      return;
    }

    dapp.functions.forEach((func) => {
      if (func.constant && func.inputs.minItems === 0) {
        processControlForm(dapp.abi, func, [], dapp.address, (error, result) => {
          if (error) {
            console.error(error);
          } else {
            viewFuncResult(dapp.id, func.name, processResult(result));
          }
        });
      }
    });
  }

  public render() {
    const { metamaskStatus, dapp } = this.props;

    if (!dapp) {
      return null;
    }

    if (dapp.blockchain === blockchains.ethereum && metamaskStatus !== 'okMetamask') {
      return (
        <div className="container">
          <Alert standardAlert={metamaskStatus} />
        </div>
      );
    }

    return (
      <main className="dapp">
        <ColumnFunc dapp={dapp} />

        <section className="dapp-body">
          <div className="content">
            <ViewFunc dapp={dapp} />
          </div>
          <MinimalFooter ctorId={dapp.constructor_id} />
        </section>
      </main>
    );
  }
}

export default Dapp;
