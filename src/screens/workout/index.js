import * as React from "react";
import { withApollo } from '../../../lib/apollo'
import { useQuery } from '@apollo/react-hooks'
import Workout from './Workout';
import Router from 'next/router';
import _ from 'lodash';
import moment from "moment"
import { logout } from '../../../lib/auth';
import { ME } from "../../queries";

const Panel = ({workoutId}) => {
  const goBack = () => Router.back()

  const { data, error, loading } = useQuery(ME);
  const me = data ? data.me : {}
  const {plans} = me;
  const plan = plans && plans.find(p => p.id == workoutId)

  const showExercise = (exerciseId, memberId, planexerciseId) => {
    Router.push({
      pathname: '/exercise',
      query: {
        exercise: exerciseId,
        member: memberId,
        planexercise: planexerciseId
      }
    });
  }

  return (
    <Workout
      onGoBack={goBack}
      plan={plan}
      showExercise={showExercise}
      memberId={data && data.me.id}
    />
  )
}
export default withApollo(Panel);
