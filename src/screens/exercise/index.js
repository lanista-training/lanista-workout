import React, { useEffect, useCallback, useRef, useState } from 'react';
import { withApollo } from '../../lib/apollo'
import { useTranslate } from '../../hooks/Translation'
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks'
import Exercise from './Exercise';
import Router from 'next/router';
import _ from 'lodash';
import moment from "moment"
import { EXERCISE, PROTOCOLLS, ME, EXERCISECHATUPDATE } from "../../queries";
import { CREATEPROTOCOLL, CREATEPROTOCOLLS, DELETEPROTOCOLL, ADDTOFAVORITES, DELETEFROMFAVORITES, CREATECHATMESSAGE, MARKCHATMESSAGES } from "../../mutations";
import { MESSAGEFEED } from "../../subscriptions";
import Chronometer from '../../components/Chronometer';

const Panel = ({exerciseId, planexerciseId, memberId, goBack, hasNorch}) => {

  let {locale} = useTranslate("exercise");
  const { data:meData } = useQuery(ME);
  const { data, error, loading, refetch } = useQuery(EXERCISE, {
    variables: {
      exerciseId: exerciseId,
      planexerciseId: planexerciseId,
      language: locale ? locale.toUpperCase() : 'EN',
    },
    fetchPolicy: 'cache-and-network',
  });

  const { refetch: refetchChat } = useQuery(EXERCISECHATUPDATE, {
    variables: {
      exerciseId: exerciseId,
      language: locale ? locale.toUpperCase() : 'EN',
    },
    fetchPolicy: 'cache-and-network',
  });

  const [createChatMessage] = useMutation(CREATECHATMESSAGE,
  {
    update(cache,  { data: { createChatMessage } }) {
      refetchChat();
    }
  });

  const [addToFavorites] = useMutation(ADDTOFAVORITES,
  {
    update(cache,  { data: { addToFavorites } }) {
      if( addToFavorites.success ) {
        refetch();
      }
    }
  });

  const [deleteFromFavorites] = useMutation(
    DELETEFROMFAVORITES,
    {
      update(cache,  { data: { deleteFromFavorites } }) {
        if( deleteFromFavorites.success ) {
          refetch();
        }
      }
    }
  );

  const [markChatMessages] = useMutation(
    MARKCHATMESSAGES,
    {
      update(cache,  { data: { markChatMessages } }) {
        if( markChatMessages.success ) {
          refetchChat();
        }
      }
    }
  );

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
        try {
          let protocollsQuery = cache.readQuery({
            query: PROTOCOLLS
          });
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
        //
        // UPDATE ME QUERY
        //
        console.log("UPDATE ME QUERY")
        try {
          let meQuery = cache.readQuery({
            query: ME
          });
          console.log("ME QUERY")
          console.log(meQuery)
          if( meQuery ) {
            const {me} = meQuery;
            const {todayExecutions} = me;
            const newTodayExecutions = [...todayExecutions];
            if( todayExecutions ) {
              // add the protocoll
              createProtocolls.map(protocoll => newTodayExecutions.push({
                exercise_id: protocoll.exercise_id,
                repetitions: protocoll.repetitions,
                __typename: "Workout",
              }));
              console.log("WRITING DOWN QUERY")
              console.log( "newTodayExecutions" )
              console.log( newTodayExecutions )
              cache.writeQuery({
                query: ME,
                data: { me: {...me, todayExecutions: newTodayExecutions}},
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
        let {exercise} = cache.readQuery({
          query: EXERCISE,
          variables: {
            exerciseId: exerciseId,
            planexerciseId: planexerciseId,
            language: (locale ? locale.toUpperCase() : 'EN'),
          },
        });
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
        try {
          let protocollsQuery = cache.readQuery({
            query: PROTOCOLLS
          });
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
              cache.writeQuery({
                query: PROTOCOLLS,
                data: { protocolls: protocolls},
              });
            }
          }
        } catch(e){
          console.log("Protocolls query not existent for now")
        }
        //
        // UPDATE ME QUERY
        //
        try {
          let meQuery = cache.readQuery({
            query: ME
          });
          if( meQuery ) {
            const {me} = meQuery;
            const {todayExecutions} = me;
            const newTodayExecutions = [...todayExecutions];
            if( todayExecutions ) {
              // add the protocoll
              newTodayExecutions.push({
                exercise_id: createProtocoll.exercise_id,
                repetitions: createProtocoll.repetitions,
                __typename: "Workout",
              });
              cache.writeQuery({
                query: ME,
                data: { me: {...me, todayExecutions: newTodayExecutions}},
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
        //
        // UPDATE ME QUERY
        //
        try {
          let meQuery = cache.readQuery({
            query: ME
          });
          if( meQuery ) {
            const {me} = meQuery;
            const {todayExecutions} = me;
            const newTodayExecutions = [...todayExecutions];
            if( todayExecutions ) {
              // remove the protocoll
              const protocollIndex = todayExecutions.findIndex(item => item.id == deleteProtocoll.id)
              console.log("protocollIndex")
              console.log(protocollIndex)
              if( protocollIndex > -1 ) {
                newTodayExecutions.splice(protocollIndex, 1);
                console.log("newTodayExecutions")
                console.log(newTodayExecutions)
                cache.writeQuery({
                  query: ME,
                  data: { me: {...me, todayExecutions: newTodayExecutions}},
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
    const executions = sets.map( (set) => ({...set, exerciseId: exerciseId }) );
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

  const onAddToFavorites = () => {
    addToFavorites({
      variables: {
        exerciseId: exerciseId,
      }
    })
  }

  const onDeleteFromFavorites = () => {
    deleteFromFavorites({
      variables: {
        exerciseId: exerciseId,
      }
    })
  }

  const onSubscriptionData = useCallback(
    (result) => {
      refetchChat();
    },
    [],
  );

  const onSendMessage = (message) => {
    createChatMessage({
      variables: {
        text: message,
        exerciseId: exerciseId,
      }
    })
  }

  const onMarkChatMessages = () => {
    markChatMessages({
      variables: {
        exerciseId: exerciseId,
      }
    })
  }

  useSubscription(MESSAGEFEED, { onSubscriptionData });

  const {me} = meData ? meData : {};
  console.log("me", me);

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
      showFavoriteButton={data && data.exercise.member ? true : false}
      onToggleFavorites={data && data.exercise.favorite ? onDeleteFromFavorites : onAddToFavorites}
      chatSupport={me && me.chatSupport}

      onSendMessage={onSendMessage}
      onMarkChatMessages={onMarkChatMessages}

    />
  )
}
export default withApollo(Panel);
