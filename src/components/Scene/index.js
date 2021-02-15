import React, { Component } from 'react';
import Scene from './Scene';
import Router from 'next/router';
import { Query } from "react-apollo";
import { ME } from "../../queries";
import { MESSAGEFEED } from "../../subscriptions";

class SceneWithData extends Component {

  constructor(props) {
    super(props);
    this.goToSetup = this.goToSetup.bind(this);
  }

  goToSetup() {
    Router.push('/configuration')
  }

  render() {
    const {alarms} = this.state;
    return(
      <Query query={ME} notifyOnNetworkStatusChange fetchPolicy="cache-and-network">
        {({ data, loading, error, fetchMore }) => {
          return(<Scene
            goToSetup={this.goToSetup}
            alarms={alarms}
            {...this.props}
            me={data && data.me}
          />)
        }}
      </Query>
    )
  }
}

export default SceneWithData;
