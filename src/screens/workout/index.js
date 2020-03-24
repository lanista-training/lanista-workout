import * as React from "react";
import { withApollo } from '../../lib/apollo'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Workout from './Workout';
import Router from 'next/router';
import _ from 'lodash';
import moment from "moment";
import gql from "graphql-tag";
import { ME } from "../../queries";
import { DELETEPLAN } from "../../mutations";

const CURRENTTAB = gql`
  {
    currentTab @client
  }
`;

const Panel = ({workoutId, goBack, showExercise, hasNorch}) => {
  const onGoBack = () => {
    client.writeData({ data: { currentTab: 0 } })
    goBack()
  }
  const { data, error, loading, refetch } = useQuery(ME);
  const { data: currentTab, client } = useQuery(CURRENTTAB);
  const [deletePlan, { loading: deletePlanLoading, error: deletePlanError }] = useMutation(
    DELETEPLAN,
    {
      update(cache,  { data: {deletePlan} }) {
        let {me} = cache.readQuery({
          query: ME
        });
        // UPDATE WORKOUTS
        const planIndex = me.plans.findIndex((plan => plan.id == deletePlan.id))
        me.plans.splice(planIndex, 1)
        cache.writeQuery({
          query: ME,
          data: { me: {...me} },
        });
        setTimeout(function(){
          goBack();
        }, 1000);
      }
    }
  );
  const me = data ? data.me : {}
  const {plans} = me;

  console.log("Searching the plan locally....")
  const plan = plans && plans.find(p => p.id == workoutId)
  console.log("Found plan: ")
  console.log( plan )

  const onDeletePlan = (planId) => {
    deletePlan({
      variables:{
        planId: planId
      }
    })
  }

  return (
    <Workout
      onGoBack={onGoBack}
      plan={plan ? plan : {splits: []}}
      showExercise={showExercise}
      memberId={data && data.me.id}
      deletePlan={onDeletePlan}
      deletePlanLoading={deletePlanLoading}
      loading={loading}
      error={error}
      currentTab={currentTab ? currentTab.currentTab : 0}
      setCurrentTab={(tabIndex) => client.writeData({ data: { currentTab: tabIndex } })}
      hasNorch={hasNorch}
      refetch={refetch}
    />
  )
}
export default withApollo(Panel);
