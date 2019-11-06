import * as React from "react";
import { withApollo } from '../../../lib/apollo'
import { useQuery } from '@apollo/react-hooks'
import Workouts from './Workouts';
import Router from 'next/router';
import _ from 'lodash';
import moment from "moment"
import { WORKOUTS } from "../../queries";

const Panel = ({client}) => {
  const goBack = () => Router.back()
  const openWorkout = (workoutId) => {
    console.log("openWorkout")
    console.log(workoutId)
    Router.push({
      pathname: '/publicplan',
      query: { workout: workoutId }
    });
  }

  const { data, error, loading } = useQuery(WORKOUTS);
  const workouts = data ? data.workouts : []
  const assignPlan = (planId) => {
    console.log("ASSIGN PLAN")
    console.log(planId)
  }
  return (
    <Workouts
      plans={workouts}
      loading={loading}
      openWorkout={openWorkout}
      onGoBack={goBack}
      error={error}
      assignPlan={assignPlan}
    />
  )
}
export default withApollo(Panel);
