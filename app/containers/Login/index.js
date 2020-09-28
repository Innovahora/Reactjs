/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { makeSelectIsLoadingLogin } from './selectors';
import reducer from './reducer';
import saga from './saga';
import LoginForm from '../../components/LoginForm';
import history from '../../utils/history';

import { loginUser } from './actions';

class Login extends React.Component {
  onLogin = data => {
    this.props.loginUser(data);
  };

  render() {
    return (
      <div style={{ height: 'calc(100vh - 80px)' }}>
        <LoginForm
          loading={this.props.isLoadingLogin}
          onSubmit={this.onLogin}
        />
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoadingLogin: makeSelectIsLoadingLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    loginUser: data => dispatch(loginUser(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Login);
