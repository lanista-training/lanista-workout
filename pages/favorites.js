import React from "react";
import Router from 'next/router';
import FavoritesScreen from "../src/screens/favorites";

function Favorites(props) {

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

  return (
    <FavoritesScreen
      goBack={goBack}
      showExercise={showExercise}
    />
  );
}

export default Favorites;
