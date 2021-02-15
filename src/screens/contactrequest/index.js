import React, { useState } from "react";
import { withApollo } from '../../lib/apollo'
import { useTranslate } from '../../hooks/Translation'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Contactrequest from './Contactrequest';
import _ from 'lodash';
import moment from "moment"
import { GETBYREF } from "../../queries";
import { CONTACTREQUEST } from "../../mutations";

const Panel = ({
  reference,
  user_id,
}) => {

  const { data, error, loading, refetch } = useQuery(GETBYREF, {
    variables: {
      ref: reference,
      userId: user_id,
    },
    fetchPolicy: 'network-only'
  });

  const [contactrequest, { loading: contactrequestLoading, error: contactrequestError }] = useMutation(
    CONTACTREQUEST,
    {
      update(cache,  {data}) {
        const { success, error } = data.contactRequest
        if(success) {
          setMessageSent(true);
        } else {
          console.log("ERROR");
          console.log(error);
        }
      }
    }
  );

  const [messageSent, setMessageSent] = useState(false);
  const [errorOnSend, setErrorOnSend] = useState(null);

  const user = data ? data.getByRef : {}
  const {
    id,
    first_name,
    last_name,
    photoUrl,
    gyms,
  } = user;


  const onContactRequest = (date, phoneNr, comment) => {
    var formatter= 'YYYY-MM-DD[T]HH:mm:ss';
    var time = moment(date).format(formatter);
    contactrequest({
      variables: {
        memberId: id,
        reference: reference,
        date: time,
        phoneNr: phoneNr,
        comment: comment,
      }
    })
  }

  return (
    <Contactrequest
      loading={loading}

      firstName={first_name}
      lastName={last_name}
      photoUrl={photoUrl}

      logoUrl={gyms && gyms.length > 0 ? gyms[0].imageUrl : ''}

      onContactRequest={onContactRequest}
      sending={contactrequestLoading}
      messageSent={messageSent}
      errorOnSend={errorOnSend}
    />
  )
}
export default withApollo(Panel);
