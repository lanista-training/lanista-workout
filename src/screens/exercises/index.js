import * as React from "react";
import { withApollo } from '../../lib/apollo';
import { useTranslate } from '../../hooks/Translation';
import { useQuery } from '@apollo/react-hooks';
import Exercises from './Exercises';
import { EXERCISES } from "../../queries"

const Panel = ({goBack, hasNorch, showExercise, exercises, type, muscle, addition}) => {

  const {locale} = useTranslate("exercises");
  const { data, error, loading } = useQuery(EXERCISES, {
    variables: {
      exercises: exercises,
      type: parseInt(type),
      muscle: parseInt(muscle),
      addition: parseInt(addition),
      language: locale,
    }
  });

  return (
    <Exercises
      onGoBack={goBack}
      hasNorch={hasNorch}
      showExercise={showExercise}
      exercises={data ? data.exercises : []}
      type={type}
      muscle={muscle}
      addition={addition}
      loading={loading}
      error={error}
    />
  )
}

export default withApollo(Panel);
