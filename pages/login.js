import React, { Component } from 'react'
import Router from 'next/router';
import LoginScreen from "../src/screens/login"
import CCLoginScreen from "../src/screens/cclogin"
import { login } from '../lib/auth';

function Login(props) {
  let {cctoken, bu} = props
  const goToRegistration = () => {
    Router.push({
      pathname: '/registration',
    });
  }
  if(typeof window !== 'undefined' && window.document && window.document.createElement) {
    console.log("rendering locally")
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

  console.log("cctocken")
  console.log(cctoken)

  if(cctoken) {
    console.log("Doing cc login")
    return (
      <CCLoginScreen doLogin={login}/>
    )
  } else {
    console.log("Doing default login")
    return (
      <LoginScreen studio={bu} doLogin={login} goToRegistration={goToRegistration}/>
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
