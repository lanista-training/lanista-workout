import * as React from "react";
import { withApollo } from '../../lib/apollo'
import { useTranslate } from '../../hooks/Translation'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Exercise from './Exercise';
import Router from 'next/router';
import _ from 'lodash';
import moment from "moment"
import { EXERCISE, PROTOCOLLS } from "../../queries";
import { CREATEPROTOCOLL, CREATEPROTOCOLLS, DELETEPROTOCOLL } from "../../mutations"

const Panel = ({exerciseId, planexerciseId, memberId, goBack, hasNorch}) => {

  let {locale} = useTranslate("exercise");

  const { data, error, loading, refetch } = useQuery(EXERCISE, {variables: {
    exerciseId: exerciseId,
    planexerciseId: planexerciseId,
    language: locale ? locale.toUpperCase() : 'EN',
  }});

  const [createProtocolls, { loading: createProtocollsLoading, error: createProtocollsError }] = useMutation(
    CREATEPROTOCOLLS,
    {
      update(cache,  { data: {createProtocolls} }) {
        //
        // UPDATE EXERCISE QUERY
        //
        let {exercise} = cache.readQuery({
          query: EXERCISE,
          variables: {
            exerciseId: exerciseId,
            planexerciseId: planexerciseId,
            language: (locale ? locale.toUpperCase() : 'EN'),
          },
        });
        console.log("createProtocolls");
        console.log(createProtocolls);
        let workouts = exercise.workouts.map(item => item);
        createProtocolls.map(protocoll => workouts.push({
          execution_date: protocoll.execution_date,
          formated_date: moment(new Date(parseInt(protocoll.execution_date))).format("YYYY-MM-DD"),
          id: protocoll.id,
          repetitions: protocoll.repetitions,
          training: null,
          round: null,
          self_protocolled: true,
          training_unit: protocoll.training_unit,
          weight: protocoll.weight,
          __typename: "Workout",
        }));

        // Sort the result
        workouts = _.reverse(_.sortBy(workouts, ["execution_date", "id"]))
        cache.writeQuery({
          query: EXERCISE,
          variables: {
            exerciseId: exerciseId,
            memberId: memberId,
            planexerciseId: planexerciseId,
            language: (locale ? locale.toUpperCase() : 'EN'),
          },
          data: { exercise: {
            ...exercise,
            workouts: workouts,
          }},
        });
        //
        // UPDATE PROTOCOLLS QUERY
        //
        console.log("UPDATE PROTOCOLL QUERY")
        try {
          let protocollsQuery = cache.readQuery({
            query: PROTOCOLLS
          });
          console.log("PROTOCOLLS QUERY")
          console.log(protocollsQuery)
          if( protocollsQuery ) {
            const {protocolls} = protocollsQuery
            if( protocolls ) {
              // remove the protocoll
              createProtocolls.map((protocoll) => protocolls.unshift({
                execution_date: protocoll.execution_date,
                formated_date: moment(new Date(parseInt(protocoll.execution_date))).format("YYYY-MM-DD"),
                id: protocoll.id,
                repetitions: protocoll.repetitions,
                training: null,
                round: null,
                self_protocolled: true,
                training_unit: protocoll.training_unit,
                weight: protocoll.weight,
                start_image: data.exercise.start_image,
                end_image: data.exercise.end_image,
                exercise_id: data.exercise.id,
                __typename: "Workout",
              }));
              console.log("WRITING DOWN QUERY")
              cache.writeQuery({
                query: PROTOCOLLS,
                data: { protocolls: protocolls},
              });
            }
          }
        } catch(e){
          console.log("Protocolls query not existent for now")
        }
      }
    }
  );

  const [createProtocoll, { loading: createProtocollLoading, error: createProtocollError }] = useMutation(
    CREATEPROTOCOLL,
    {
      update(cache,  { data: {createProtocoll} }) {
        //
        // UPDATE EXERCISE QUERY
        //
        console.log("update");
        console.log({
          exerciseId: exerciseId,
          planexerciseId: planexerciseId,
          language: (locale ? locale.toUpperCase() : 'EN'),
        })
        let {exercise} = cache.readQuery({
          query: EXERCISE,
          variables: {
            exerciseId: exerciseId,
            planexerciseId: planexerciseId,
            language: (locale ? locale.toUpperCase() : 'EN'),
          },
        });
        console.log("update 2");
        let workouts = exercise.workouts.map(item => item)
        workouts.push({
          execution_date: createProtocoll.execution_date,
          formated_date: moment(new Date(parseInt(createProtocoll.execution_date))).format("YYYY-MM-DD"),
          id: createProtocoll.id,
          repetitions: createProtocoll.repetitions,
          training: null,
          round: null,
          self_protocolled: true,
          training_unit: createProtocoll.training_unit,
          weight: createProtocoll.weight,
          __typename: "Workout",
        })
        // Sort the result
        workouts = _.reverse(_.sortBy(workouts, ["execution_date", "id"]))
        cache.writeQuery({
          query: EXERCISE,
          variables: {
            exerciseId: exerciseId,
            memberId: memberId,
            planexerciseId: planexerciseId,
            language: (locale ? locale.toUpperCase() : 'EN'),
          },
          data: { exercise: {
            ...exercise,
            workouts: workouts,
          }},
        });
        //
        // UPDATE PROTOCOLLS QUERY
        //
        console.log("UPDATE PROTOCOLL QUERY")
        try {
          let protocollsQuery = cache.readQuery({
            query: PROTOCOLLS
          });
          console.log("PROTOCOLLS QUERY")
          console.log(protocollsQuery)
          if( protocollsQuery ) {
            const {protocolls} = protocollsQuery
            if( protocolls ) {
              // remove the protocoll
              protocolls.unshift({
                execution_date: createProtocoll.execution_date,
                formated_date: moment(new Date(parseInt(createProtocoll.execution_date))).format("YYYY-MM-DD"),
                id: createProtocoll.id,
                repetitions: createProtocoll.repetitions,
                training: null,
                round: null,
                self_protocolled: true,
                training_unit: createProtocoll.training_unit,
                weight: createProtocoll.weight,
                start_image: data.exercise.start_image,
                end_image: data.exercise.end_image,
                exercise_id: data.exercise.id,
                __typename: "Workout",
              })
              console.log("WRITING DOWN QUERY")
              cache.writeQuery({
                query: PROTOCOLLS,
                data: { protocolls: protocolls},
              });
            }
          }
        } catch(e){
          console.log("Protocolls query not existent for now")
        }
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
            planexerciseId: planexerciseId,
            language: (locale ? locale.toUpperCase() : 'EN'),
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
            planexerciseId: planexerciseId,
            language: (locale ? locale.toUpperCase() : 'EN'),
          },
          data: { exercise: {
            ...exercise,
            workouts: workouts,
          }},
        });
        //
        // UPDATE PROTOCOLLS QUERY
        //
        console.log("UPDATE PROTOCOLL QUERY")
        try {
          let protocollsQuery = cache.readQuery({
            query: PROTOCOLLS
          });
          if( protocollsQuery ) {
            const {protocolls} = protocollsQuery
            if( protocolls ) {
              // remove the protocoll
              const protocollIndex = protocolls.findIndex(item => item.id == deleteProtocoll.id)
              if( protocollIndex > -1 ) {
                protocolls.splice(protocollIndex, 1)
                cache.writeQuery({
                  query: PROTOCOLLS,
                  data: { protocolls: protocolls},
                });
              }
            }
          }
        } catch(e){
          console.log("Protocolls query not existent for now")
        }
      }
    }
  );
  const groupWorkouts = (workouts) => {
    var grouped = _.mapValues(_.groupBy(workouts, 'formated_date'), clist => clist.reverse().map(workout => _.omit(workout, 'formated_date')));
    return grouped
  }
  const onCreateProtocoll = (executionDate, training, weight, unit) => {
    createProtocoll({variables: {
      exerciseId: exerciseId,
      memberId: memberId,
      executionDate: executionDate,
      training: parseInt(training),
      unit: parseInt(unit),
      weight: parseFloat(weight),
    }})
  }

  const onCreateAllProtocolls = (sets) => {
    console.log("onCreateAllProtocolls");
    const executions = sets.map( (set) => ({...set, exerciseId: exerciseId }) );
    console.log(executions);
    createProtocolls({
      variables: {
        protocolls: JSON.stringify(executions)
      }
    })
  }

  const onDeleteProtocoll = (protocollId) => {
    deleteProtocoll({variables: {
      protocollId: protocollId,
    }})
  }
  console.log("rendering...")
  return (
    <Exercise
      onGoBack={goBack}
      exercise={data ? data.exercise : null}
      workouts={data ? groupWorkouts(data.exercise.workouts) : []}
      createProtocoll={onCreateProtocoll}
      createAllProtocolls={onCreateAllProtocolls}
      deleteProtocoll={onDeleteProtocoll}
      loading={deleteProtocollLoading || createProtocollLoading}
      hasNorch={hasNorch}
      refetch={refetch}
    />
  )
}
export default withApollo(Panel);
