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
  const { data: gyms, error: gymsError, gymsLoading } = useQuery(GYMS, {
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
          setConnectedDialogOpen(true);
        } else {
          let {me} = cache.readQuery({
            query: ME,
          });
          const {gyms} = me
          if( gyms instanceof Array ) {
            console.log("gmy is an Array")
          } else {
            gyms = []
          }
          gyms.push(link)
          cache.writeQuery({
            query: ME,
            data: { me: {
              ...me,
              gyms: gyms
            }},
          });
          refetch();
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
    />
  )
}
export default withApollo(Panel);
