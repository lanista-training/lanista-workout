import React from "react";
import Router from 'next/router';
import RegistrationScreen from "../src/screens/registration";

function Registration(props) {
  return (
    <RegistrationScreen goBack={() => Router.back()} />
  );
}

export default Registration;
