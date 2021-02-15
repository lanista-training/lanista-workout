import React from "react";
import Router from 'next/router';
import { withAuthSync } from '../lib/auth'
import Screen from "../src/screens/contactrequest"

function ContactRequest(props) {

  const goBack = () => Router.back();

  const {reference, user_id} = props;

  return (
    <Screen
      reference={reference}
      user_id={user_id}
    />
  );
}

ContactRequest.getInitialProps = context => {
  return ({
    reference: context.query.reference,
    user_id: context.query.user_id,
  })
};

export default ContactRequest;
