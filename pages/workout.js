import React from "react";
import Router from 'next/router';
import { withAuthSync } from '../lib/auth'
import WorkoutScreen from "../src/screens/workout"

function Workout({workoutId}) {
  console.log("pages.workout")
  const goBack = () => {
    Router.back();
  }

  const showExercise = (exerciseId, planexerciseId) => {
    Router.push({
      pathname: '/exercise',
      query: {
        exercise: exerciseId,
        planexercise: planexerciseId
      }
    });
  }

  return (
    <WorkoutScreen
      workoutId={workoutId}
      goBack={goBack}
      showExercise={showExercise}
    />
  );
}

Workout.getInitialProps = context => {
  return ({
    workoutId: context.query.workout
  })
};

export default withAuthSync(Workout);
