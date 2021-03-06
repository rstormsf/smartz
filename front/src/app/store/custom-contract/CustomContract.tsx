import * as React from 'react';

import { clickTypes } from '../../../constants/constants';
import { sendClickEvent } from '../../../helpers/statictics';

import './CustomContract.less';


export default class CustomContract extends React.PureComponent {
  public render() {
    return (
      <article
        className="custom-contract ctor-card"
        onClick={() => {
          // send click event
          sendClickEvent(clickTypes.CUSTOM_CONTRACT);

          window.location.href = 'mailto:hello@smartz.io';
        }}>
        <div className="ctor-card__link screen">
          <div className="ctor-card__img flex">
            <img
              src={require('../../../assets/img/common/dapp/custom-contract.png')}
              alt={`Custom contract`}
            />
          </div>
          <section className="ctor-card__description">
            <h2 className="ctor-card__header">Custom contract</h2>
            <p className="ctor-card__text">
              We can develop or customize any smart contract, or just provide a UI for managing your
              custom contract. If this follows the trend of Smartz Platform, we can do this pro
              bono.
            </p>
          </section>
          <section className="ctor-card__controls">
            <p className="ctor-card__buttons">
              <a href="mailto:hello@smartz.io" className="btn flex">
                MAIL US
              </a>
              <span className="ctor-card__email">hello@smartz.io</span>
            </p>
          </section>
        </div>
      </article>
    );
  }
}
