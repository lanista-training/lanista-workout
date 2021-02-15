import React from "react";
import Router from 'next/router';
import { withAuthSync } from '../lib/auth';
import DashboardScreen from "../src/screens/dashboard";
import { logout } from '../lib/auth';

function Index(props) {
  let {cctoken} = props
  if(typeof window !== 'undefined' && window.document && window.document.createElement) {
    if( cctoken ) {
      localStorage.setItem('cctoken', cctoken);
      logout()
    }
  }
  const openWorkout = (workoutId) => {
    Router.push({
      pathname: '/workout',
      query: { workout: workoutId }
    });
  }
  const openPublicWorkout = (workoutId) => {
    Router.push({
      pathname: '/publicplan',
      query: { workout: workoutId }
    });
  }
  const openWorkouts = () => {
    Router.push({
      pathname: '/workouts',
    });
  }
  const goToSetup = () => {
      Router.push({
      pathname: '/setup',
    });
  }
  const goToLogin = () => {
      Router.push({
      pathname: '/login',
    });
  }
  const onGoToProtocolls = () => {
      Router.push({
      pathname: '/protocolls',
    });
  }
  const onGoToMeasurements = () => {
      Router.push({
      pathname: '/measurements',
    });
  }
  const onGoToFilter = () => {
      Router.push({
      pathname: '/filter',
    });
  }

  const onShowFavorites = () => {
    Router.push({
      pathname: '/favorites',
    });
  }
  return (
    <DashboardScreen
      doLogout={logout}
      goToLogin={goToLogin}
      openWorkout={openWorkout}
      openPublicWorkout={openWorkout}
      openWorkouts={openWorkouts}
      openPublicWorkout={openPublicWorkout}
      goToSetup={goToSetup}
      onGoToProtocolls={onGoToProtocolls}
      onGoToMeasurements={onGoToMeasurements}
      onGoToFilter={onGoToFilter}
      onShowFavorites={onShowFavorites}
    />
  );
}

Index.getInitialProps = context => {
  return ({
    cctoken: context.query.cctoken,
    bu: context.query.bu,
  })
};

export default withAuthSync(Index);
