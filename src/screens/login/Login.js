import React, { useState } from 'react'
import styled from 'styled-components'
import ChatBot from 'react-simple-chatbot'

 const Root = styled.div`
   background-size: cover;
   background-position: center center;
   background-repeat: no-repeat;
 `;

class Login extends React.Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { show: false };
  }

  componentDidMount() {
    const _this = this
    setTimeout(function(){
      _this.setState({
        show: true
      });
    }, 2000);
  }

  componentWillUnmount() {
    this.setState({
      show: false
    });
  }

  render() {
    const {show} = this.state;

    return (
      <ChatBot
        steps={[
          {
            id: '1',
            message: 'What is your name?',
            trigger: '2',
          },
          {
            id: '2',
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            message: 'Hi {previousValue}, nice to meet you!',
            end: true,
          },
        ]}
      />
    )
  }
};

export default Login;
