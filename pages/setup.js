import React from "react";
import Router from 'next/router';
import { withAuthSync } from '../lib/auth'
import SetupScreen from "../src/screens/setup"

function Setup(props) {

  const goToGymsearch = () => {
    Router.push({
      pathname: '/gymsearch',
    });
  }

  return (
    <SetupScreen
      goToGymsearch={goToGymsearch}
      goBack={() => Router.back()}
    />
  );
}

export default withAuthSync(Setup);
