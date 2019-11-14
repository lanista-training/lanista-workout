import * as React from "react";
import { withApollo } from '../../../lib/apollo'
import { useQuery } from '@apollo/react-hooks'
import Protocolls from './Protocolls'
import Router from 'next/router'
import _ from 'lodash'
import moment from "moment"
import { PROTOCOLLS } from "../../queries"

const Panel = ({client}) => {

  const goBack = () => Router.back()
  const showExercise = (exerciseId) => {
    Router.push({
      pathname: '/exercise',
      query: {
        exercise: exerciseId,
      }
    });
  }
  const { data, error, loading } = useQuery(PROTOCOLLS);
  console.log("RAW DATA")
  console.log(data)
  const workouts = data ? data.protocolls : []
  const curatedData = _.mapValues(_.groupBy(workouts, 'formated_date'), clist => clist.map(workout => _.omit(workout, 'formated_date')));

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
    />
  )
}
export default withApollo(Panel);
