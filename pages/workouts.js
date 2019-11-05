import React from "react";
import { withAuthSync } from '../lib/auth'
import Workouts from "../src/screens/workouts"

function Index() {
  return (
    <Workouts/>
  );
}

export default withAuthSync(Workouts);
