import * as React from "react";
import { withApollo } from '../../lib/apollo'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Measurements from './Measurements';
import Router from 'next/router';
import _ from 'lodash';
import moment from "moment"
import { MEASUREMENTS, ME } from "../../queries";
import { SAVEWEIGHT, DELETEWEIGHT } from "../../mutations";

const Panel = ({client, goBack, hasNorch}) => {
  const { data, error, loading, refetch } = useQuery(MEASUREMENTS, {
    fetchPolicy: 'cache-and-network',
  });
  const [saveWeight, { loading: saveWeightLoading, error: saveWeightError }] = useMutation(
    SAVEWEIGHT,
    {
      update(cache,  { data: {saveWeight} }) {
        let {measurements} = cache.readQuery({
          query: MEASUREMENTS
        });
        console.log(measurements.weights)
        console.log(saveWeight)
        const recordIndex = measurements.weights.findIndex( record => record.id == saveWeight.id)
        console.log(recordIndex)
        if( recordIndex > -1 ) {
          measurements.weights[recordIndex].value = saveWeight.value
        } else {
          measurements.weights.push(saveWeight)
        }
        cache.writeQuery({
          query: MEASUREMENTS,
          data: { measurements: measurements},
        });
      }
    }
  );
  const [deleteWeight, { loading: deleteWeightLoading, error: deleteWeightError }] = useMutation(
    DELETEWEIGHT,
    {
      update(cache,  { data: {deleteWeight} }) {
        let {measurements} = cache.readQuery({
          query: MEASUREMENTS
        });
        const recordIndex = measurements.weights.findIndex( record => record.id == deleteWeight.id)
        measurements.weights.splice(recordIndex, 1);
        cache.writeQuery({
          query: MEASUREMENTS,
          data: { measurements: measurements},
        });
      }
    }
  );
  const onSaveWeight = (weight, recordDate) => {
    saveWeight({
      variables: {
        weight: parseFloat(weight),
        recordDate: moment(recordDate).format("YYYY-MM-DD")
      }
    })
  }
  const onDeleteWeight = (recordId) => {
    deleteWeight({
      variables: {
        weightId: recordId
      }
    })
  }
  const {weights, calipers, valumens, futrex} = data ? data.measurements : {}

  //
  // App resume event handling
  //
  React.useEffect(() => {
    document.removeEventListener("resume", onResume, false);
    document.addEventListener("resume", onResume, false);
  }, []);
  function onResume() {
    setTimeout(function() {
        refetch();
    }, 0);
  }
  //
  //
  //
  const { data: meData } = useQuery(ME);
  const {primaryColor, secondaryColor} = meData ? meData.me : {};

  return (
    <Measurements
      loading={loading}
      error={error}
      onGoBack={goBack}
      weights={data ? weights : []}
      calipers={data ? calipers : []}
      valumens={data ? valumens : []}
      futrex={data ? futrex : []}
      saveWeight={onSaveWeight}
      saveWeightLoading={saveWeightLoading}
      saveWeightError={saveWeightError}
      deleteWeight={onDeleteWeight}
      deleteWeightLoading={deleteWeightLoading}
      deleteWeightError={deleteWeightError}
      hasNorch={hasNorch}

      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
    />
  )
}
export default withApollo(Panel);
