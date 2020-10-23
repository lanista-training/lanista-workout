import React from "react";
import Router from 'next/router';
import { withAuthSync } from '../lib/auth'
import SetupScreen from "../src/screens/setup"
import { logout } from '../lib/auth';

function Setup(props) {

  const goToGymsearch = () => {
    Router.push({
      pathname: '/gymsearch',
    });
  }

  const goToLogin = () => {
      Router.push({
      pathname: '/login',
    });
  }

  return (
    <SetupScreen
      goToGymsearch={goToGymsearch}
      goBack={() => Router.back()}
      doLogout={logout}
      goToLogin={goToLogin}
    />
  );
}

export default withAuthSync(Setup);
