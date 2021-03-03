import * as React from "react";
import { withApollo } from '../../lib/apollo';
import { useTranslate } from '../../hooks/Translation';
import { useQuery } from '@apollo/react-hooks';
import Exercises from './Exercises';
import { EXERCISES } from "../../queries"

const Panel = ({
  goBack,
  hasNorch,
  showExercise,
  exercises,
  types,
  muscles,
  text,
  additions,
  primaryColor,
  secondaryColor,
}) => {

  const {locale} = useTranslate("exercises");
  const { data, error, loading } = useQuery(EXERCISES, {
    variables: {
      exercises: exercises,
      types: types && types.length > 0 ? types : null,
      muscles: muscles && muscles.length > 0 ? muscles : null,
      additions: additions && additions.length > 0 ? additions : null,
      text: text,
      language: locale,
    },
    fetchPolicy: 'cache-and-network',
  });

  return (
    <Exercises
      onGoBack={goBack}
      hasNorch={hasNorch}
      showExercise={showExercise}
      exercises={data ? data.exercises.exercises : []}
      total={data ? data.exercises.total : 0}
      loading={loading}
      error={error}

      muscles={muscles}
      types={types}
      additions={additions}

      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
    />
  )
}

export default withApollo(Panel);
