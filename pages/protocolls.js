import React from "react";
import { withAuthSync } from '../lib/auth'
import ProtocollsScreen from "../src/screens/protocolls"

function Protocolls(props) {
  return (
    <ProtocollsScreen/>
  );
}

export default withAuthSync(Protocolls);
