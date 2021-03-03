import * as React from "react";
import { withApollo } from '../../lib/apollo'
import { useQuery } from '@apollo/react-hooks'
import Protocolls from './Protocolls'
import Router from 'next/router'
import _ from 'lodash'
import moment from "moment"
import { PROTOCOLLS, ME } from "../../queries"

const Panel = ({client, goBack, showExercise, hasNorch}) => {

  const { data, error, loading, refetch } = useQuery(PROTOCOLLS, {
    fetchPolicy: 'cache-and-network',
  });
  const workouts = data ? data.protocolls : []
  const curatedData = _.mapValues(_.groupBy(workouts, 'formated_date'), clist => clist.reverse().map(workout => _.omit(workout, 'formated_date')));

  const { data: meData } = useQuery(ME);
  const {primaryColor, secondaryColor} = meData ? meData.me : {};

  //
  // App resume event handling
  //
  React.useEffect(() => {
    document.removeEventListener("resume", onResume, false);
    document.addEventListener("resume", onResume, false);
  }, []);
  function onResume() {
    setTimeout(function() {
        refetch();
    }, 0);
  }
  //
  //
  //

  return (
    <Protocolls
      protocolls={_.map(curatedData, (protocolls, day) => ({
        day: day,
        protocolls: protocolls,
      }))}
      loading={loading}
      error={error}
      onGoBack={goBack}
      showExercise={showExercise}
      hasNorch={hasNorch}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
    />
  )
}
export default withApollo(Panel);
