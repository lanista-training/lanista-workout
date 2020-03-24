import React from "react";
import Router from 'next/router';
import { withAuthSync } from '../lib/auth'
import WorkoutsScreen from "../src/screens/workouts"

function Workouts() {
  const goBack = () => {
    Router.back();
  }

  const openWorkout = (workoutId) => {
    Router.push({
      pathname: '/publicplan',
      query: {
        workout: workoutId
      }
    });
  }

  return (
    <WorkoutsScreen
      goBack={goBack}
      openWorkout={openWorkout}
    />
  );
}

export default withAuthSync(Workouts);
