import * as React from "react";
import MenuButton from './MenuButton';
import Router from 'next/router';
import { withApollo } from '../../lib/apollo';

const Button = ({
  client,
  preventLogout,
  editable,
  doLogout,
  goToSetup,
  onGoToProtocolls,
  onGoToMeasurements,
  language,
}) => {
  const onLogout = () => {
    if( doLogout() ) {
      client.resetStore();
    }
  }
  return (
    <MenuButton
      preventLogout={preventLogout}
      onLogout={onLogout}
      onGoToProtocolls={onGoToProtocolls}
      onGoToMeasurements={onGoToMeasurements}
      onGoToSetup={goToSetup}
      editable={editable}
      language={language}
    />
  )
}

export default withApollo(Button)
