import * as React from "react";
import Login from './Login';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks'
import { withApollo } from '../../../lib/apollo'
import { LOGIN } from "../../mutations/authenticate";
import { ME } from "../../queries";
import { login } from '../../../lib/auth';

const LoginPanel = () => {
  let host = ''
  if (typeof document !== 'undefined') {
    console.log( document.location.host )
    host = document.location.host;
  }

  const [authenticateUser, { loading: loginLoading, error: loginError }] = useMutation(
    LOGIN,
    {
      update(cache,  {data}) {
        const { token, user } = data.login
        login({ token })
      }
    }
  );
  const onAuthenticate = (email, password) => {
    const domain = window.location.hostname
    console.log("onAuthentication")

    authenticateUser({
      variables: {
        email: email,
        password: password,
        bu: (host && host.indexOf('basefit')) > -1 ? 95 : null,
      }
    })
  }
  return (
    <Login
      authenticated={false}
      authenticating={loginLoading}
      loginError={loginError}
      onAuthenticate={onAuthenticate}
      bu={(host && host.indexOf('basefit')) > -1 ? 'basefit' : null }
    />
  )
}

export default withApollo(LoginPanel);
