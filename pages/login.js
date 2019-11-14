import React, { Component } from 'react'
import LoginScreen from "../src/screens/login"
import CCLoginScreen from "../src/screens/cclogin"

function Login(props) {
  let {cctoken, bu} = props
  if(typeof window !== 'undefined' && window.document && window.document.createElement) {
    if( cctoken ) {
      localStorage.setItem('cctoken', cctoken);
    } else {
      cctoken = localStorage.getItem('cctoken');
    }
    if( bu ) {
      localStorage.setItem('bu', bu);
    }
    bu = localStorage.getItem('bu');
  }
  if(cctoken) {
    return (
      <CCLoginScreen/>
    )
  } else {
    return (
      <LoginScreen studio={bu}/>
    );
  }
}

Login.getInitialProps = context => {
  return ({
    cctoken: context.query.cctoken,
    bu: context.query.bu,
  })
};

export default Login
