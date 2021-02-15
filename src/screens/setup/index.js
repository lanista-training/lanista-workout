import * as React from "react";
import { useTranslate } from '../../hooks/Translation'
import { withApollo } from '../../lib/apollo'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Setup from './Setup';
import Router from 'next/router';
import _ from 'lodash';
import moment from "moment";
import { ME } from "../../queries";
import { UPDATEPROFILE, LINK, UNLINK, ACCEPTREQUEST, DECLINEREQUEST, DELETEACCOUNT } from "../../mutations"

const Panel = ({client, goBack, goToGymsearch, hasNorch, doLogout, goToLogin}) => {
  let {changeLanguage, languages, locale} = useTranslate("setup");
  const[filter, setFilter] = React.useState(true)
  const { data, error, loading, refetch } = useQuery(ME);
  const me = data ? data.me : {}
  const {
    first_name,
    last_name,
    photoUrl,
    email,
    birthday,
    gender,
    gyms,
    language,
    connectionRequests
  } = me;

  const [updateProfile, { loading: updateProfileLoading, error: updateProfileError }] = useMutation(
    UPDATEPROFILE,
    {
      update(cache,  { data: {updateProfile} }) {
        refetch();
      }
    }
  );

  const [unlink, { loading: unlinkLoading, error: unlinkError }] = useMutation(
    UNLINK,
    {
      update(cache,  { data: {unlink} }) {
        refetch();
      }
    }
  );

  const [acceptRequest, { loading: acceptRequestLoading, error: acceptRequestError }] = useMutation(
    ACCEPTREQUEST,
    {
      update(cache,  { data: {acceptRequest} }) {
        refetch();
      }
    }
  );

  const [declineRequest, { loading: declineRequestLoading, error: declineRequestError }] = useMutation(
    DECLINEREQUEST,
    {
      update(cache,  { data: {declineRequest} }) {
        refetch();
      }
    }
  );

  const [deleteAccount, { loading: deleteAccountLoading, error: deleteAccountError }] = useMutation(
    DELETEACCOUNT,
    {
      update(cache,  { data: {deleteAccount} }) {
        doLogout();
        console.log("RESETING THE STORE...")
        client.resetStore();
        window.localStorage.clear();
        goToLogin();
      }
    }
  );

  const onSaveData = (firstName, lastName, email, birthday, gender, language) => {
    updateProfile({variables: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      birthday: moment(birthday).format('YYYY-MM-DD'),
      gender: gender,
      language: language,
    }})
  }

  const unlinkGym = (id) => {
    unlink({variables: {
      buId: id
    }})
  }

  const onAcceptRequest = (id) => {
    console.log("acceptRequest");
    acceptRequest({
      variables: {
        requestId: id,
      }
    });
  }

  const onRejectRequest = (id) => {
    console.log("rejectRequest");
    declineRequest({
      variables: {
        requestId: id,
      }
    });
  }

  const checkForInvitations = () => {
    refetch();
  }

  React.useEffect(() => {
    refetch();
  }, []);

  return (
    <Setup
      firstName={first_name}
      lastName={last_name}
      email={email}
      birthday={birthday ? new Date(parseInt(birthday)) : null}
      gender={gender}
      photoUrl={photoUrl}
      language={language}
      loading={loading || !data}
      onGoBack={goBack}
      gyms={gyms}
      onSaveData={onSaveData}
      unlinkGym={unlinkGym}
      goToGymsearch={goToGymsearch}
      hasNorch={hasNorch}
      connectionRequests={connectionRequests}
      acceptRequest={onAcceptRequest}
      rejectRequest={onRejectRequest}
      checkForInvitations={checkForInvitations}
      version={3537}
      onDeleteAccount={deleteAccount}
    />
  )
}
export default withApollo(Panel);
