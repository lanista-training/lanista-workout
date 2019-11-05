import * as React from "react";
import { withApollo } from '../../../lib/apollo'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Exercise from './Exercise';
import Router from 'next/router';
import _ from 'lodash';
import moment from "moment"
import { EXERCISE } from "../../queries";
import { CREATEPROTOCOLL, DELETEPROTOCOLL } from "../../mutations"

const Panel = ({exerciseId, planexerciseId, memberId}) => {

  const goBack = () => Router.back()
  const { data, error, loading } = useQuery(EXERCISE, {variables: {
    exerciseId: exerciseId,
    memberId: memberId,
    planexerciseId: planexerciseId,
  }});
  const [createProtocoll, { loading: createProtocollLoading, error: createProtocollError }] = useMutation(
    CREATEPROTOCOLL,
    {
      update(cache,  { data: {createProtocoll} }) {
        let {exercise} = cache.readQuery({
          query: EXERCISE,
          variables: {
            exerciseId: exerciseId,
            memberId: memberId,
            planexerciseId: planexerciseId,
          },
        });
        let workouts = exercise.workouts.map(item => item)
        workouts.push({
          execution_date: createProtocoll.execution_date,
          formated_date: moment(new Date(parseInt(createProtocoll.execution_date))).format("YYYY-MM-DD"),
          id: createProtocoll.id,
          repetitions: createProtocoll.repetitions,
          round: null,
          self_protocolled: false,
          training_unit: createProtocoll.training_unit,
          weight: createProtocoll.weight,
          __typename: "Workout",
        })
        // Sort the result
        workouts = _.reverse(_.sortBy(workouts, ["execution_date"]))
        cache.writeQuery({
          query: EXERCISE,
          variables: {
            exerciseId: exerciseId,
            memberId: memberId,
            planexerciseId: planexerciseId,
          },
          data: { exercise: {
            ...exercise,
            workouts: workouts,
          }},
        });
      }
    }
  );
  const [deleteProtocoll, { loading: deleteProtocollLoading, error: deleteProtocollError }] = useMutation(
    DELETEPROTOCOLL,
    {
      update(cache,  { data: {deleteProtocoll} }) {
        let {exercise} = cache.readQuery({
          query: EXERCISE,
          variables: {
            exerciseId: exerciseId,
            memberId: memberId,
            planexerciseId: planexerciseId,
          },
        });
        let workouts = []
        exercise.workouts.map(item => {
          if(item.id != deleteProtocoll.id) {
            workouts.push(item)
          }
        })
        cache.writeQuery({
          query: EXERCISE,
          variables: {
            exerciseId: exerciseId,
            memberId: memberId,
            planexerciseId: planexerciseId,
          },
          data: { exercise: {
            ...exercise,
            workouts: workouts,
          }},
        });
      }
    }
  );
  const groupWorkouts = (workouts) => {
    var grouped = _.mapValues(_.groupBy(workouts, 'formated_date'), clist => clist.map(workout => _.omit(workout, 'formated_date')));
    return grouped
  }
  const onCreateProtocoll = (executionDate, training, weight, unit) => {
    createProtocoll({variables: {
      exerciseId: exerciseId,
      memberId: memberId,
      executionDate: executionDate,
      training: training,
      unit: unit,
      weight: weight,
    }})
  }
  const onDeleteProtocoll = (protocollId) => {
    deleteProtocoll({variables: {
      protocollId: protocollId,
    }})
  }
  return (
    <Exercise
      onGoBack={goBack}
      exercise={data ? data.exercise : null}
      workouts={data ? groupWorkouts(data.exercise.workouts) : []}
      createProtocoll={onCreateProtocoll}
      deleteProtocoll={onDeleteProtocoll}
      loading={deleteProtocollLoading || createProtocollLoading}
    />
  )
}
export default withApollo(Panel);
