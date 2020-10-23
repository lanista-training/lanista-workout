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
        let {me} = cache.readQuery({
          query: ME,
        });
        me.first_name = updateProfile.first_name
        me.last_name = updateProfile.last_name
        me.email = updateProfile.email
        me.birthday = updateProfile.birthday
        me.gender = updateProfile.gender
        me.language = updateProfile.language
        cache.writeQuery({
          query: ME,
          data: { me: me},
        });
        if( me.language && me.language.length > 0 ) {
          if( me.language.toLowerCase() !== locale && languages.indexOf(me.language.toLowerCase()) > -1) {
            changeLanguage(me.language.toLowerCase())
          }
        }
        refetch();
      }
    }
  );

  const [unlink, { loading: unlinkLoading, error: unlinkError }] = useMutation(
    UNLINK,
    {
      update(cache,  { data: {unlink} }) {
        let {me} = cache.readQuery({
          query: ME,
        });
        const {gyms} = me
        const gymIndex = me.gyms.findIndex(i => i.id == unlink.id)
        gyms.splice(gymIndex, 1)
        cache.writeQuery({
          query: ME,
          data: { me: {
            ...me,
            gyms: gyms
          }},
        });
        refetch();
      }
    }
  );

  const [acceptRequest, { loading: acceptRequestLoading, error: acceptRequestError }] = useMutation(
    ACCEPTREQUEST,
    {
      update(cache,  { data: {acceptRequest} }) {
        let {me} = cache.readQuery({
          query: ME,
        });
        const {connectionRequests} = me
        const requestIndex = connectionRequests.findIndex(i => i.id == acceptRequest.id)
        connectionRequests.splice(requestIndex, 1)
        cache.writeQuery({
          query: ME,
          data: { me: {
            ...me,
            connectionRequests: connectionRequests
          }},
        });
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
