import React from "react";
import Router from 'next/router';
import { withAuthSync } from '../lib/auth'
import ExercisesScreen from "../src/screens/exercises"

function Exercises(props) {
  console.log("pages.exercises")
  const goBack = () => {
    Router.back();
  }

  const showExercise = (exerciseId) => {
    Router.push({
      pathname: '/exercise',
      query: {
        exercise: exerciseId
      }
    });
  }

  const {exercises} = props
  return (
    <ExercisesScreen
      exercises={exercises}
      goBack={goBack}
      showExercise={showExercise}
    />
  );
}

Exercises.getInitialProps = context => {
  return ({
    exercises: context.query.exercises
  })
};

export default withAuthSync(Exercises);
