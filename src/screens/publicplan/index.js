import * as React from "react";
import { useTranslate } from '../../hooks/Translation';
import { withApollo } from '../../lib/apollo';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Workout from '../workout/Workout';
import Router from 'next/router';
import _ from 'lodash';
import moment from "moment";
import gql from "graphql-tag";
import { WORKOUT, ME } from "../../queries";
import { CLONEPLAN } from "../../mutations";

const CURRENTTAB = gql`
  {
    currentTab @client
  }
`;

const Panel = ({workoutId, goToDashboard, goBack, showExercise, hasNorch}) => {
  const { locale } = useTranslate("workout");
  const { data: currentTab, client } = useQuery(CURRENTTAB);
  const { data: me } = useQuery(ME, {
    fetchPolicy: 'cache-first'
  });
  const onGoBack = (pendingPlanId) => {
    if( pendingPlanId > 0 ) {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem("pp", pendingPlanId);
      }
      goToDashboard();
    } else {
      client.writeData({ data: { currentTab: 0 } })
      if( me ) {
        goBack();
      } else {
        goToDashboard();
      }
    }
  }
  const [clonePlan, { loading: clonePlanLoading, error: clonePlanError }] = useMutation(
    CLONEPLAN,
    {
      update(cache,  { data: {clonePlan} }) {
        console.log("updating cache...")
        let {me} = cache.readQuery({
          query: ME
        });
        me.plans.unshift(clonePlan)
        console.log("plans:")
        console.log(me.plans)
        cache.writeQuery({
          query: ME,
          data: { me: me},
        });
        setTimeout(function(){
          goBack();
          goBack();
        }, 1000);
      }
    }
  );
  const { data, error, loading } = useQuery(WORKOUT,
  {
    variables: {
      workoutId: workoutId,
      language: locale,
    }
  });
  const workout = data ? data.workout : []
  const assignPlan = (planId) => {
    console.log("Cloning plan...")
    clonePlan({variables: {
      planId: planId
    }})
  }

  return (
    <Workout
      onGoBack={onGoBack}
      signedIn={!(me === undefined)}
      plan={workout}
      showExercise={showExercise}
      error={error}
      loading={loading}
      showAssignButton={true}
      assignPlan={assignPlan}
      clonePlanLoding={clonePlanLoading}
      clonePlanError={clonePlanError}
      currentTab={currentTab ? currentTab.currentTab : 0}
      setCurrentTab={(tabIndex) => client.writeData({ data: { currentTab: tabIndex } })}
      hasNorch={hasNorch}
    />
  )
}
export default withApollo(Panel);
