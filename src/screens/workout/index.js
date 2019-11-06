import * as React from "react";
import { withApollo } from '../../../lib/apollo'
import { useQuery } from '@apollo/react-hooks'
import { useMutation } from '@apollo/react-hooks'
import Workout from './Workout';
import Router from 'next/router';
import _ from 'lodash';
import moment from "moment"
import { logout } from '../../../lib/auth';
import { ME, WORKOUTS } from "../../queries";
import { DELETEPLAN } from "../../mutations";

const Panel = ({workoutId}) => {
  const goBack = () => Router.back()
  const { data, error, loading } = useQuery(ME);
  const [deletePlan, { loading: deletePlanLoading, error: deletePlanError }] = useMutation(
    DELETEPLAN,
    {
      update(cache,  { data: {deletePlan} }) {
        let {me} = cache.readQuery({
          query: ME
        });
        console.log("SEARCHING FOR PLAN ID")
        console.log(deletePlan.id)
        console.log(me.plans)
        // UPDATE WORKOUTS
        const planIndex = me.plans.findIndex((plan => plan.id == deletePlan.id))
        console.log("INDEX:")
        console.log(planIndex)
        me.plans.splice(planIndex, 1)
        cache.writeQuery({
          query: ME,
          data: { me: {...me} },
        });
      }
    }
  );
  const me = data ? data.me : {}
  const {plans} = me;
  console.log("PLANS ON ME")
  console.log(plans)
  const plan = plans && plans.find(p => p.id == workoutId)
  const onDeletePlan = (planId) => {
    deletePlan({
      variables:{
        planId: planId
      }
    })
  }
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
      deletePlan={onDeletePlan}
      deletePlanLoading={deletePlanLoading}
    />
  )
}
export default withApollo(Panel);
