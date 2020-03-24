import React from "react";
import Router from 'next/router';
import { withAuthSync } from '../lib/auth'
import WorkoutScreen from "../src/screens/publicplan"

function Workout({workoutId}) {
  console.log("page.publicplan")
  console.log(workoutId)
  const showExercise = (exerciseId, planexerciseId) => {
    Router.push({
      pathname: '/exercise',
      query: {
        exercise: exerciseId,
        planexerciseId: planexerciseId
      }
    });
  }

  return (
    <WorkoutScreen
      workoutId={workoutId}
      goBack={() => Router.back()}
      showExercise={showExercise}
    />
  );
}

Workout.getInitialProps = context => {
  return ({
    workoutId: context.query.workout
  })
};

export default Workout;
