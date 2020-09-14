import React from 'react';
import {ThemeProvider } from 'styled-components';
import defaultTheme from './themes/default';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import { isLogedIn, login, logout } from './lib/auth-web';
import DashboardScreen from './screens/dashboard';
import LoginPanel from './screens/login';
import RegistrationPanel from './screens/registration';
import WorkoutPanel from './screens/workout';
import ExercisePanel from './screens/exercise';
import ExercisesPanel from './screens/exercises';
import GymsearchPanel from './screens/gymsearch';
import MeasurementsPanel from './screens/measurements';
import ProtocollsPanel from './screens/protocolls';
import PublicplanPanel from './screens/publicplan';
import SetupPanel from './screens/setup';
import WorkoutsPanel from './screens/workouts';
import FilterPanel from './screens/filter';

const hasNorch = true;

const getMusclesNames = (filters) => {
  return filters.map((filter) => {
    switch (parseInt(filter)) {
      case 1:
        return 'chest';
      case 2:
        return 'upperback';
      case 3:
        return 'shoulder';
      case 4:
        return 'frontfemoral';
      case 5:
        return 'lowerback';
      case 6:
        return 'hip';
      case 7:
        return 'abs';
      case 8:
        return 'biceps';
      case 9:
        return 'triceps';
      case 10:
        return 'forearm';
      case 11:
        return 'lowerleg';
      case 14:
        return 'backfemoral';
    }
  })
}

const getTypesNames = (filters) => {
  return filters.map((filter) => {
    switch (parseInt(filter)) {
      case 1:
        return 'machine';
      case 2:
        return 'freeweights';
      case 3:
        return 'cable';
      case 4:
        return 'bodyweight';
      case 5:
        return 'stretch';
      case 6:
        return 'specials';
      case 7:
        return 'cardio';
    }
  })
}

const getToolsNames = (filters) => {
  return filters.map((filter) => {
    switch (parseInt(filter)) {
      case 1:
        return 'dumbbels';
      case 2:
        return 'kettlebells';
      case 3:
        return 'barbell';
      case 4:
        return 'bank';
      case 5:
        return 'others';
      case 6:
        return 'ball';
      case 7:
        return 'blast';
      case 8:
        return 'jumber';
      case 9:
        return 'foam';
      case 11:
        return 'miniband';
      default:
        return null;
    }
  })
}

const Login = () => {
  let history = useHistory();
  const doLogin = (token) => {
    login(token);
    history.push("/")
  }
  const goToRegistration = () => {
    console.log("goToRegistration")
    history.push("/registration")
  }
  return <LoginPanel
    hasNorch={hasNorch}
    doLogin={doLogin}
    goToRegistration={() => {
      console.log("goToRegistration")
      history.push("/registration")
    }}
  />
}

const Dashboard = () => {
  const history = useHistory();
  return <DashboardScreen
    hasNorch={hasNorch}
    doLogout={() => {
      logout();
    }}
    goToLogin = {() => history.push("/login")}
    goToSetup={() => history.push('/setup')}
    onGoToMeasurements={() => history.push('/measurements')}
    onGoToProtocolls={() => history.push('/protocolls')}
    openWorkouts={() => history.push("/workouts")}
    openPublicWorkout = {(workoutId) => history.push('/publicplan/' + workoutId)}
    openWorkout={(workoutId) => history.push('/workout/' + workoutId)}
    goToExercise={(exerciseId) => {
      history.push('/exercise/' + exerciseId );
    }}
    goToExercises={(params) => {
      console.log("goToExercises");
      console.log(params);
      history.push('/exercises/' + params );
    }}
    onGoToFilter={() => history.push('/filter')}
  />
}

const Registration = () => {
  let history = useHistory();
  return <RegistrationPanel
    hasNorch={hasNorch}
    goBack={() => history.push("/login")}
  />
}

const Filter = () => {
  let history = useHistory();
  return <FilterPanel
    hasNorch={hasNorch}
    goBack={() => history.goBack()}
    showExercise={(exerciseId) => {
      history.push('/exercise/' + exerciseId);
    }}
  />
}

const Workout = () => {
  let history = useHistory();
  let { workoutId } = useParams();
  return <WorkoutPanel
    hasNorch={hasNorch}
    workoutId={workoutId}
    goBack={() => {
      history.goBack()
    }}
    showExercise={(exerciseId, planexerciseId) => {
      history.push('/exercise/' + exerciseId + '/' + planexerciseId);
    }}
  />
}

const Publicplan = () => {
  let history = useHistory();
  let { workoutId } = useParams();
  return <PublicplanPanel
    hasNorch={hasNorch}
    workoutId={workoutId}
    goBack={() => history.goBack()}
    goToDashboard={() => history.push('/')}
    showExercise={(exerciseId, planexerciseId) => {
      history.push('/exercise/' + exerciseId + '/' + planexerciseId);
    }}
  />
}

const Exercise = () => {
  let history = useHistory();
  let { exerciseId, planexerciseId } = useParams();
  return <ExercisePanel
    hasNorch={hasNorch}
    exerciseId={exerciseId}
    planexerciseId={planexerciseId}
    goBack={() => {
      history.goBack()
    }}
  />
}

const Exercises = () => {
  let history = useHistory();
  let { muscle, type, addition, exercises } = useParams();
    console.log("Exercises")

    console.log(muscle)
    console.log(type)
    console.log(addition)
    console.log(exercises)

    console.log((muscle + '').split(',').filter(i => i > 0))
    console.log((type + '').split(',').filter(i => i >0))
    console.log((addition+ '').split(',').filter(i => i >0))

    console.log(getMusclesNames((muscle + '').split(',').filter(i => i > 0)))
    console.log(getTypesNames((type + '').split(',').filter(i => i > 0)))
    console.log(getToolsNames((addition+ '').split(',').filter(i => i > 0)))

  return <ExercisesPanel
    hasNorch={hasNorch}
    exercises={exercises == "0" ? null : exercises}

    types={ getTypesNames((type + '').split(',').filter(i => i > 0)) }
    muscles={getMusclesNames((muscle + '').split(',').filter(i => i > 0))}
    additions={getToolsNames((addition + '').split(',').filter(i => i > 0))}

    showExercise={(exerciseId) => {
      history.push('/exercise/' + exerciseId);
    }}
    goBack={() => {
      history.goBack()
    }}
  />
}

const Setup = () => {
  let history = useHistory();
  const goBack = () => history.goBack()
  const goToGymsearch = () => history.push('/gymsearch')
  return <SetupPanel
    hasNorch={hasNorch}
    goBack={goBack}
    goToGymsearch={goToGymsearch}
  />
}

const Measurements = () => {
  let history = useHistory();
  return <MeasurementsPanel
    hasNorch={hasNorch}
    goBack={() => history.goBack()}
  />
}

const Protocolls = () => {
  let history = useHistory();
  return <ProtocollsPanel
    hasNorch={hasNorch}
    goBack={() => history.goBack()}
    showExercise={(exerciseId) => {
      history.push('/exercise/' + exerciseId);
    }}
  />
}

const Workouts = () => {
  let history = useHistory();
  return <WorkoutsPanel
    hasNorch={hasNorch}
    goBack={() => history.goBack()}
    openWorkout={(workoutId) => history.push('/publicplan/' + workoutId)}
  />
}

const Gymsearch = () => {
  let history = useHistory();
  return <GymsearchPanel
    hasNorch={hasNorch}
    goBack={() => history.goBack()}
  />
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/registration">
          <Registration />
        </Route>
        <Route path="/exercise/:exerciseId/:planexerciseId">
          <Exercise />
        </Route>
        <Route path="/exercise/:exerciseId">
          <Exercise />
        </Route>
        <Route path="/exercises/:muscle/:type/:addition/:exercises">
          <Exercises />
        </Route>
        <Route path="/publicplan/:workoutId">
          <Publicplan />
        </Route>
        <Route path="/filter">
          <Filter />
        </Route>
        <PrivateRoute exact path="/">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path="/setup">
          <Setup />
        </PrivateRoute>
        <PrivateRoute path="/workout/:workoutId">
          <Workout />
        </PrivateRoute>
        <PrivateRoute path="/publicplan/:workoutId">
          <Publicplan />
        </PrivateRoute>
        <PrivateRoute path="/protocolls">
          <Protocolls />
        </PrivateRoute>
        <PrivateRoute path="/measurements">
          <Measurements />
        </PrivateRoute>
        <PrivateRoute path="/gymsearch">
          <Gymsearch />
        </PrivateRoute>
        <PrivateRoute path="/workouts">
          <Workouts />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

function PrivateRoute({ children, ...rest }) {
  console.log("PrivateRoute")
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogedIn() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}



export default App;
