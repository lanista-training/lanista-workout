import * as React from "react";
import { withApollo } from '../../../lib/apollo'
import { useQuery } from '@apollo/react-hooks'
import Workout from '../workout/Workout';
import Router from 'next/router';
import _ from 'lodash';
import moment from "moment"
import { logout } from '../../../lib/auth';
import { WORKOUT } from "../../queries";

const Panel = ({workoutId}) => {
  const goBack = () => Router.back()
  const { data, error, loading } = useQuery(WORKOUT,
  {
    variables: {
      workoutId: workoutId,
    }
  });
  const workout = data ? data.workout : []
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
  const assignPlan = (planId) => {
    console.log("ASSIGN PLAN")
    console.log(planId)
  }
  return (
    <Workout
      onGoBack={goBack}
      plan={workout}
      showExercise={showExercise}
      error={error}
      loading={loading}
      showAssignButton={true}
      assignPlan={assignPlan}
    />
  )
}
export default withApollo(Panel);
