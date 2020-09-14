import * as React from "react";
import _ from 'lodash';
import { useTranslate } from '../../hooks/Translation';
import { withApollo } from '../../lib/apollo';
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import Filter from './Filter';
import Exercises from '../exercises/Exercises';
import { EXERCISES } from "../../queries";

const musclesDefault = {
  shoulder: false,
  biceps: false,
  triceps: false,
  forearm: false,
  chest: false,
  upperback: false,
  lowerback: false,
  abs: false,
  hip: false,
  frontfemoral: false,
  backfemoral: false,
  lowerleg: false,
}

const typesDefault = {
  bodyweight: false,
  machine: false,
  freeweights: false,
  cable: false,
  stretch: false,
  cardio: false,
  specials: false,
  unilateral: false,
}

const additionsDefault = {
  dumbbels: false,
  barbell: false,
  kettlebells: false,
  bank: false,
  others: false,
  ball: false,
  blast: false,
  jumber: false,
  foam: false,
  miniband: false,
}

const curateResult = (filter) => {
  const result = [];
  _.forOwn(filter, function(value, key) {
    if(value && key != '__typename') result.push(key);
  });
  return result;
}

const GET_CURRENT_SCREEN = gql`
  {
    currentScreen @client
  }
`;

const GET_MUSCLES = gql`
  {
    muscles @client {
      shoulder
      biceps
      triceps
      forearm
      chest
      upperback
      lowerback
      abs
      hip
      frontfemoral
      backfemoral
      lowerleg
    }
  }
`;

const GET_TYPES = gql`
  {
    types @client {
      bodyweight
      machine
      freeweights
      cable
      stretch
      cardio
      specials
      unilateral
    }
  }
`;

const GET_ADDITIONS = gql`
  {
    additions @client {
      dumbbels
      barbell
      kettlebells
      bank
      others
      ball
      blast
      jumber
      foam
      miniband
    }
  }
`;

const Panel = ({goBack, hasNorch, showExercise}) => {

  const {locale} = useTranslate("exercises");

  const { data: musclesData, client: muscleClient } = useQuery(GET_MUSCLES);
  const { data: typesData, client: typeClient } = useQuery(GET_TYPES);
  const { data: additionsData, client: additionClient } = useQuery(GET_ADDITIONS);
  const [searchText, setSearchText] = React.useState('');

  const { data: currentScreenData, client: currentScreenClient } = useQuery(GET_CURRENT_SCREEN);
  const {currentScreen} = currentScreenData ? currentScreenData : {currentScreen: true};
  const toggleCurrentScreen = () => {
    currentScreenClient.writeData({ data: {currentScreen: !currentScreen} });
  }


  const muscles = musclesData ? musclesData.muscles : musclesDefault;
  const types = typesData ? typesData.types : typesDefault;
  const additions = additionsData ? additionsData.additions : additionsDefault;

  const { data, error, loading } = useQuery(EXERCISES, {
    variables: {
      types: curateResult(types),
      muscles: curateResult(muscles),
      additions: curateResult(additions),
      text: searchText,
      language: locale,
    }
  });

  const onMuscleSelection = (selection, preventNavigation = false) => {
    const newFilter = {...muscles};
    newFilter[selection] = !muscles[selection];
    newFilter.__typename = 'muscles';
    muscleClient.writeData({ data: {muscles: newFilter} });
    preventNavigation != true &&
    showExercises();
  }

  const onTypeSelection = (selection, preventNavigation = false) => {
    const newFilter = {...types};
    newFilter[selection] = !types[selection];
    newFilter.__typename = 'types';
    typeClient.writeData({ data: {types: newFilter} });
    preventNavigation != true &&
    showExercises();
  }

  const onAdditionSelection = (selection, preventNavigation = false) => {
    const newFilter = {...additions};
    newFilter[selection] = !additions[selection];
    newFilter.__typename = 'additions';
    additionClient.writeData({ data: {additions: newFilter} });
    preventNavigation != true &&
    showExercises();
  }

  const showExercises = () => toggleCurrentScreen();

  const [text, setText] = React.useState('');
  const onTextChange = (event) => setText(event.target.value);
  const resetText = () => setText('');

  React.useEffect(() => {
    if(text && text.length > 2) {
      console.log("trigger text search");
      setSearchText(text);
    } else {
      setSearchText("");
    }
  }, [text]);

  return currentScreen ? (
    <Filter
      onGoBack={goBack}
      hasNorch={hasNorch}
      showExercises={showExercises}

      muscles={muscles ? muscles : musclesDefault}
      onMuscleSelection={onMuscleSelection}

      types={types ? types : typesDefault}
      onTypeSelection={onTypeSelection}

      additions={additions ? additions : additionsDefault}
      onAdditionSelection={onAdditionSelection}

      total={data ? data.exercises.total : 0}

      text={text}
      onTextChange={onTextChange}
      resetText={resetText}
    />
  )
  :
  (
    <Exercises
      onGoBack={toggleCurrentScreen}
      hasNorch={true}
      showExercise={showExercise}
      exercises={data ? data.exercises.exercises : []}
      total={data ? data.exercises.total : 0}
      loading={loading}
      error={error}

      muscles={curateResult(muscles)}
      types={curateResult(types)}
      additions={curateResult(additions)}
      text={searchText}
      resetText={resetText}

      onMuscleSelection={onMuscleSelection}
      onTypeSelection={onTypeSelection}
      onAdditionSelection={onAdditionSelection}
    />
  )
}

export default withApollo(Panel);
