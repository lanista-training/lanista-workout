import React from "react";
import Router from 'next/router';
import { withAuthSync } from '../lib/auth'
import GymsearchScreen from "../src/screens/gymsearch"

function Gymsearch() {
  return (
    <GymsearchScreen
      goBack={ () => Router.back() }
    />
  );
}

export default withAuthSync(Gymsearch);
