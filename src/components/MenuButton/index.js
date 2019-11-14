import * as React from "react";
import MenuButton from './MenuButton';
import Router from 'next/router';
import { withApollo } from '../../../lib/apollo';
import { logout } from '../../../lib/auth';

const Button = ({client, preventLogout}) => {
  const onLogout = () => {
    logout()
    client.resetStore();
  }
  return (
    <MenuButton
      preventLogout={preventLogout}
      onLogout={onLogout}
      onGoToProtocolls={() => Router.push({
        pathname: '/protocolls',
      })}
    />
  )
}

export default withApollo(Button)
