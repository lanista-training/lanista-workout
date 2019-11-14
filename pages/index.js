import React from "react";
import { withAuthSync } from '../lib/auth'
import DashboardScreen from "../src/screens/dashboard"
import { logout } from '../lib/auth';

function Index(props) {
  let {cctoken} = props
  if(typeof window !== 'undefined' && window.document && window.document.createElement) {
    if( cctoken ) {
      localStorage.setItem('cctoken', cctoken);
      logout()
    }
  }
  return (
    <DashboardScreen/>
  );
}

Index.getInitialProps = context => {
  return ({
    cctoken: context.query.cctoken,
    bu: context.query.bu,
  })
};

export default withAuthSync(Index);
