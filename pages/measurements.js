import React from "react";
import Router from 'next/router';
import { withAuthSync } from '../lib/auth'
import MeasurementsSceen from "../src/screens/measurements"

function Measurements() {
  return (
    <MeasurementsSceen
      goBack={ () => Router.back() }
    />
  );
}

export default withAuthSync(Measurements);
