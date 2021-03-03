import * as React from "react";
import { useTranslate } from '../../hooks/Translation';
import { withApollo } from '../../lib/apollo'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Workouts from './Workouts';
import Router from 'next/router';
import _ from 'lodash';
import moment from "moment"
import { WORKOUTS, ME } from "../../queries";
import { CLONEPLAN } from "../../mutations";

const Panel = ({client, goBack, openWorkout, hasNorch}) => {
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
        setTimeout(function(){
          goBack();
        }, 1000);
      }
    }
  );
  const {locale} = useTranslate("workouts");
  const { data, error, loading, refetch } = useQuery(WORKOUTS,
  {
    variables: {
      language: locale,
    }
  });
  const workouts = data ? data.workouts : []
  const assignPlan = (planId) => {
    clonePlan({variables: {
      planId: planId
    }})
  }
  const [filter, setFilter] = React.useState('*');
  const onSetFilter = (text) => {
    setFilter(text == filter ? '*' : text)
  }
  const applyFilter = (plans) => {
    return plans.filter( plan => plan.categories && plan.categories.indexOf(filter) > -1 )
  }

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
  const { data: meData } = useQuery(ME);
  const {primaryColor, secondaryColor} = meData ? meData.me : {};

  return (
    <Workouts
      plans={filter == '*' ? workouts : applyFilter(workouts)}
      loading={loading}
      openWorkout={openWorkout}
      onGoBack={goBack}
      error={error}
      assignPlan={assignPlan}
      assignPlan={assignPlan}
      clonePlanLoding={clonePlanLoading}
      clonePlanError={clonePlanError}
      onSetFilter={onSetFilter}
      filter={filter == '*' ? 'FILTER' : filter}
      hasNorch={hasNorch}
      refetch={refetch}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
    />
  )
}
export default withApollo(Panel);
