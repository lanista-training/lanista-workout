import * as React from "react";
import { withApollo } from '../../../lib/apollo'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Workout from '../workout/Workout';
import Router from 'next/router';
import _ from 'lodash';
import moment from "moment"
import { logout } from '../../../lib/auth';
import { WORKOUT, ME } from "../../queries";
import { CLONEPLAN } from "../../mutations";

const Panel = ({workoutId}) => {
  const goBack = () => Router.back()
  const [clonePlan, { loading: clonePlanLoading, error: clonePlanError }] = useMutation(
    CLONEPLAN,
    {
      update(cache,  { data: {clonePlan} }) {
        let {me} = cache.readQuery({
          query: ME
        });
        me.plans.unshift(clonePlan)
        cache.writeQuery({
          query: ME,
          data: { me: me},
        });
        goBack();
        goBack();
      }
    }
  );
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
    clonePlan({variables: {
      planId: planId
    }})
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
      clonePlanLoding={clonePlanLoading}
      clonePlanError={clonePlanError}
    />
  )
}
export default withApollo(Panel);
