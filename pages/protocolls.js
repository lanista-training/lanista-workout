import React from "react";
import Router from 'next/router';
import { withAuthSync } from '../lib/auth'
import ProtocollsScreen from "../src/screens/protocolls"

function Protocolls(props) {
  return (
    <ProtocollsScreen
      goBack={ () => Router.back() }
      showExercise={ (exerciseId) =>
        Router.push({
          pathname: '/exercise',
          query: {
            exercise: exerciseId,
          }
        })
      }
    />
  );
}

export default withAuthSync(Protocolls);
