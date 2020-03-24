import React from "react";
import Router from 'next/router';
import { withAuthSync } from '../lib/auth'
import ExerciseScreen from "../src/screens/exercise"

function Exercise(props) {
  const showExercise = (exerciseId, planexerciseId) => {
    Router.push({
      pathname: '/exercise',
      query: {
        exercise: exerciseId,
        planexercise: planexerciseId
      }
    });
  }
  const goBack = () => Router.back()
  const {exerciseId, memberId, planexerciseId} = props
  return (
    <ExerciseScreen
      exerciseId={exerciseId}
      planexerciseId={planexerciseId}
      showExercise={showExercise}
      goBack={goBack}
    />
  );
}

Exercise.getInitialProps = context => {
  return ({
    exerciseId: context.query.exercise,
    planexerciseId: context.query.planexercise,
  })
};

export default Exercise;
