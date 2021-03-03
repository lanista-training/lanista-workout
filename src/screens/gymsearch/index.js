import * as React from "react";
import { withApollo } from '../../lib/apollo'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Gymsearch from './Gymsearch';
import Router from 'next/router';
import _ from 'lodash';
import moment from "moment";
import { GYMS, ME } from "../../queries";
import { LINK } from "../../mutations"

const Panel = ({client, goBack, hasNorch}) => {
  const[filter, setFilter] = React.useState('');
  const { data, error, loading, refetch } = useQuery(ME);
  const { data: gyms, error: gymsError, gymsLoading, refetch: refetchGyms } = useQuery(GYMS, {
    variables: {
      filter: filter
    },
    fetchPolicy: 'network-only'
  });
  const [link, { loading: linkLoading, error: linkError }] = useMutation(
    LINK,
    {
      update(cache,  { data: {link} }) {
        if(link.id.indexOf('0-') > -1 ) {
          refetch();
          refetchGyms();
          setConnectedDialogOpen(true);
        } else {
          refetch();
          refetchGyms();
          goBack();
        }
      }
    }
  );
  const onLinkGym = (gymId) => {
    link({
      variables: {
        buId: gymId
      }
    })
  }
  const [connectedDialogOpen, setConnectedDialogOpen] = React.useState(false);
  const handleConnectedDialogClose = () => {
    setConnectedDialogOpen(false);
    goBack();
  };
  return (
    <Gymsearch
      loading={gymsLoading || !gyms}
      gyms={gyms ? gyms.gyms : []}
      onGoBack={goBack}
      filter={filter}
      onFilterChange={e => setFilter(e.target.value)}
      onLinkGym={onLinkGym}
      hasNorch={hasNorch}
      connectedDialogOpen={connectedDialogOpen}
      handleConnectedDialogClose={handleConnectedDialogClose}
      primaryColor={data ? data.me.primaryColor : null}
      secondaryColor={data ? data.me.secondaryColor : null}
    />
  )
}
export default withApollo(Panel);
