import * as React from "react";
import { withApollo } from '../../../lib/apollo'
import { useQuery } from '@apollo/react-hooks'
import Dashboard from './Dashboard';
import Router from 'next/router';
import _ from 'lodash';
import moment from "moment"
import { logout } from '../../../lib/auth';
import { ME } from "../../queries";

const Panel = ({client}) => {

  const onLogout = () => {
    logout()
    client.resetStore();
  }
  const openWorkout = (workoutId) => {
    Router.push({
      pathname: '/workout',
      query: { workout: workoutId }
    });
  }

  const openWorkouts = () => {
    Router.push({
      pathname: '/workouts',
    });
  }

  const { data, error, loading } = useQuery(ME);
  const me = data ? data.me : {}
  const {first_name, last_name, photoUrl, plans} = me;

  return (
    <Dashboard
      onLogout={onLogout}
      firstName={first_name}
      lastName={last_name}
      photoUrl={photoUrl}
      plans={plans}
      loading={loading}
      openWorkout={openWorkout}
      openWorkouts={openWorkouts}
    />
  )
}
export default withApollo(Panel);
