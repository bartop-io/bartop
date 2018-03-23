import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import auth from '../../singletons/authentication';
import LoginForm from './LoginForm/LoginForm';
import VerifyForm from './VerifyForm/VerifyForm';
import Callback from './Callback/Callback';
import Failure from './Failure/Failure';
import { actions } from '../../ducks/authentication/authentication';
import NotFound from '../NotFound/NotFound';

export class Auth extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      sendCodeError: null,
      verificationCode: '',
      verifyCodeError: null
    };
    this.setEmail = this.setEmail.bind(this);
    this.setCode = this.setCode.bind(this);
    this.sendCode = this.sendCode.bind(this);
    this.verifyCode = this.verifyCode.bind(this);
  }

  setEmail(email) {
    this.setState({
      email
    });
  }

  setCode(verificationCode) {
    this.setState({
      verificationCode
    });
  }

  sendCode() {
    const { history } = this.props;
    const { email } = this.state;
    auth.passwordlessStart(
      {
        connection: 'email',
        send: 'code',
        email: this.state.email
      },
      (err, res) => {
        if (err) {
          console.error(err);
          this.setState({
            sendCodeError: err
          });
        } else {
          history.replace({
            pathname: '/auth/verify',
            state: {
              email
            }
          });
        }
      }
    );
  }

  verifyCode() {
    auth.passwordlessLogin(
      {
        connection: 'email',
        email: this.state.email,
        verificationCode: this.state.verificationCode
      },
      (err, res) => {
        if (err) {
          this.setState({
            verifyCodeError: err
          });
        } else {
          console.log('res is', res);
        }
      }
    );
  }

  render() {
    const { match, handleAuthentication } = this.props;
    const {
      email,
      sendCodeError,
      verificationCode,
      verifyCodeError
    } = this.state;

    return (
      <Switch>
        <Route
          exact
          path={`${match.url}/login`}
          render={() => (
            <LoginForm
              email={email}
              setEmail={this.setEmail}
              sendCode={this.sendCode}
              sendCodeError={sendCodeError}
            />
          )}
        />
        <Route
          exact
          path={`${match.url}/verify`}
          render={({ location }) => (
            <VerifyForm
              email={email}
              verificationCode={verificationCode}
              setCode={this.setCode}
              verifyCode={this.verifyCode}
              verifyCodeError={verifyCodeError}
            />
          )}
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
    );
  }
}

Auth.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  handleAuthentication: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  handleAuthentication: actions.handleAuthentication
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
