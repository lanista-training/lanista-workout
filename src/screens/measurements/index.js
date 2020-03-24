import * as React from "react";
import { withApollo } from '../../lib/apollo'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Measurements from './Measurements';
import Router from 'next/router';
import _ from 'lodash';
import moment from "moment"
import { MEASUREMENTS } from "../../queries";
import { SAVEWEIGHT, DELETEWEIGHT } from "../../mutations";

const Panel = ({client, goBack, hasNorch}) => {
  const { data, error, loading } = useQuery(MEASUREMENTS);
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
    console.log("DELETE WEIGHT")
    console.log(recordId)
    deleteWeight({
      variables: {
        weightId: recordId
      }
    })
  }
  const {weights, calipers, valumens, futrex} = data ? data.measurements : {}
  console.log("data")
  console.log(data)
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
    />
  )
}
export default withApollo(Panel);
