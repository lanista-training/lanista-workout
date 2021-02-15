import React from "react";
import Router from 'next/router';
import ExercisesScreen from "../src/screens/exercises";

function Exercises(props) {

  const goBack = () => {
    Router.back();
  }

  const showExercise = (exerciseId) => {
    Router.push({
      pathname: '/exercise',
      query: {
        exercise: exerciseId,
      }
    });
  }

  const {exercises, muscles, types, additions} = props;

  return (
    <ExercisesScreen
      exercises={exercises}
      muscles={muscles}
      types={types}
      additions={additions}
      goBack={goBack}
      showExercise={showExercise}
    />
  );
}

Exercises.getInitialProps = context => {
  return ({
    exercises: context.query.exercises,
    muscles: context.query.muscles,
    types: context.query.types,
    additions: context.query.additions,
  })
};

export default Exercises;
