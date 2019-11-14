import * as React from "react";
import { withApollo } from '../../../lib/apollo'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Workouts from './Workouts';
import Router from 'next/router';
import _ from 'lodash';
import moment from "moment"
import { WORKOUTS, ME } from "../../queries";
import { CLONEPLAN } from "../../mutations";

const Panel = ({client}) => {
  const goBack = () => Router.back()
  const openWorkout = (workoutId) => {
    Router.push({
      pathname: '/publicplan',
      query: { workout: workoutId }
    });
  }
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
      }
    }
  );


  const { data, error, loading } = useQuery(WORKOUTS);
  const workouts = data ? data.workouts : []
  const assignPlan = (planId) => {
    clonePlan({variables: {
      planId: planId
    }})
  }
  return (
    <Workouts
      plans={workouts}
      loading={loading}
      openWorkout={openWorkout}
      onGoBack={goBack}
      error={error}
      assignPlan={assignPlan}
      assignPlan={assignPlan}
      clonePlanLoding={clonePlanLoading}
      clonePlanError={clonePlanError}
    />
  )
}
export default withApollo(Panel);
