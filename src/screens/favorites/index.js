import * as React from "react";
import { withApollo } from '../../lib/apollo';
import { useTranslate } from '../../hooks/Translation';
import { useQuery } from '@apollo/react-hooks';
import Favorites from './Favorites';
import { FAVORITES } from "../../queries"

const Panel = ({goBack, hasNorch, showExercise}) => {

  const {locale} = useTranslate("favorites");
  const { data, error, loading } = useQuery(FAVORITES, {
    fetchPolicy: 'cache-and-network',
  });

  return (
    <Favorites
      onGoBack={goBack}
      hasNorch={hasNorch}
      showExercise={showExercise}
      total={data ? data.favorites.total : 0}
      exercises={data ? data.favorites.exercises : []}
      loading={loading}
      error={error}
    />
  )
}

export default withApollo(Panel);
