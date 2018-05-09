import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import PageWithHeader from '../Layouts/PageWithHeader/PageWithHeader';
import LoginForm from './LoginForm/LoginForm';
import VerifyForm from './VerifyForm/VerifyForm';
import Callback from './Callback/Callback';
import Failure from './Failure/Failure';
import { actions } from '../../ducks/authentication/authentication';
import NotFound from '../NotFound/NotFound';

export class Auth extends Component {
  constructor() {
    super();
    this.sendCode = this.sendCode.bind(this);
    this.verifyCode = this.verifyCode.bind(this);
  }

  async sendCode(email) {
    return new Promise((resolve, reject) => {
      this.props.auth.passwordlessStart(
        {
          connection: 'email',
          send: 'code',
          email
        },
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  }

  async verifyCode(email, verificationCode) {
    return new Promise((resolve, reject) => {
      this.props.auth.passwordlessLogin(
        {
          connection: 'email',
          email,
          verificationCode
        },
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  }

  render() {
    const { match, handleAuthentication } = this.props;

    return (
      <PageWithHeader showAuthButton={false}>
        <Switch>
          <Route
            exact
            path={`${match.url}/login`}
            render={({ history, location }) => {
              // if the user came back from verify, we will have their email in location state so we can prefill
              const email =
                location.state && location.state.email
                  ? location.state.email
                  : undefined;
              return (
                <LoginForm
                  history={history}
                  sendCode={this.sendCode}
                  prefillEmail={email}
                />
              );
            }}
          />
          <Route
            exact
            path={`${match.url}/verify`}
            render={({ history, location }) =>
              location.state && location.state.email ? (
                <VerifyForm
                  history={history}
                  email={location.state.email}
                  verifyCode={this.verifyCode}
                />
              ) : (
                <NotFound />
              )
            }
          />
          <Route
            exact
            path={`${match.url}/callback`}
            render={() => {
              handleAuthentication();
              return <Callback />;
            }}
          />
          <Route exact path={`${match.url}/failure`} component={Failure} />
          <Route component={NotFound} />
        </Switch>
      </PageWithHeader>
    );
  }
}

Auth.propTypes = {
  match: PropTypes.object.isRequired,
  auth: PropTypes.shape({
    passwordlessStart: PropTypes.func.isRequired,
    passwordlessLogin: PropTypes.func.isRequired
  }).isRequired,
  handleAuthentication: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  handleAuthentication: actions.handleAuthentication
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
