import * as React from "react";
import { withApollo } from '../../../lib/apollo'
import { useQuery } from '@apollo/react-hooks'
import Workout from './Workout';
import Router from 'next/router';
import _ from 'lodash';
import moment from "moment"
import { logout } from '../../../lib/auth';
import { ME } from "../../queries";

const Panel = ({client}) => {

  const { data, error, loading } = useQuery(ME);
  const onLogout = () => {
    logout()
    client.resetStore();
  }
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
    />
  )
}
export default withApollo(Panel);
