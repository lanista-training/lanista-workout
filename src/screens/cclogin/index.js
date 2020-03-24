import * as React from "react";
import Login from './Login';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks'
import { withApollo } from '../../lib/apollo'
import { CCLOGIN } from "../../mutations";
import { ME } from "../../queries";

const LoginPanel = ({doLogin}) => {
  const [authenticateUser, { loading: loginLoading, error: loginError }] = useMutation(
    CCLOGIN,
    {
      update(cache,  {data}) {
        console.log("update")
        console.log("doLogin")
        console.log(doLogin)
        const { token, user } = data.cclogin
        doLogin({ token })
      }
    }
  );
  React.useEffect(() => {
    if(typeof window !== 'undefined' && window.document && window.document.createElement && !loginLoading) {
      console.log("CLIENT SIDE RENDERING")
      const cctoken = localStorage.getItem('cctoken')
      console.log("AUTHENTICATING...")
      console.log(cctoken)
      onAuthenticate(cctoken)
    }
  }, [])
  const onAuthenticate = () => {
    const cctoken = localStorage.getItem("cctoken")
    console.log("cctoken")
    console.log(cctoken)
    authenticateUser({
      variables: {
        token: cctoken,
      }
    })
  }

  return (
    <Login
      authenticated={false}
      loading={loginLoading}
      loginError={loginError}
    />
  )
}

export default withApollo(LoginPanel);
