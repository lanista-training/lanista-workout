import React from "react";
import Router from 'next/router';
import { withAuthSync } from '../lib/auth';
import FilterScreen from "../src/screens/filter";

function Filter(props) {

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

  const showExercises = ({muscles, types, additions}) => {
    Router.push({
      pathname: '/exercises',
      query: {
        muscles: muscles,
        types: types,
        additions: additions,
      }
    });
  }

  return (
    <FilterScreen
      goBack={goBack}
      showExercises={showExercises}
      showExercise={showExercise}
    />
  );
}

export default withAuthSync(Filter);
