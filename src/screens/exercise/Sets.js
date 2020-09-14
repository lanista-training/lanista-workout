import * as React from "react";
import moment from "moment";
import _ from 'lodash';
import { useTranslate } from '../../hooks/Translation';
import Set from './Set';
import {Sets} from './styles';
import Fab from '@material-ui/core/Fab';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const units = (language) => {
  if( language == 'de' )
    return (
      [
        {
          value: 0,
          label: 'Wdh',
        },
        {
          value: 1,
          label: 'Sek',
        },
        {
          value: 2,
          label: 'Min',
        }
      ]
    )
  else if( language == 'es' )
    return (
      [
        {
          value: 0,
          label: 'Rep',
        },
        {
          value: 1,
          label: 'Seg',
        },
        {
          value: 2,
          label: 'Min',
        }
      ]
    )
  else if( language == 'fr' )
    return (
      [
        {
          value: 0,
          label: 'Rép',
        },
        {
          value: 1,
          label: 'Sec',
        },
        {
          value: 2,
          label: 'Min',
        }
      ]
    )
  else if( language == 'pt' )
    return (
      [
        {
          value: 0,
          label: 'Rep',
        },
        {
          value: 1,
          label: 'Seg',
        },
        {
          value: 2,
          label: 'Min',
        }
      ]
    )
  else if( language == 'ru' )
    return (
      [
        {
          value: 0,
          label: 'Повт',
        },
        {
          value: 1,
          label: 'Сек',
        },
        {
          value: 2,
          label: 'Мин',
        }
      ]
    )
  else
    return (
      [
        {
          value: 0,
          label: 'Rep',
        },
        {
          value: 1,
          label: 'Sec',
        },
        {
          value: 2,
          label: 'Min',
        }
      ]
    )
};

const Form = ({defaulValues, toggleShowForm, createProtocoll}) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  // WEIGHT MANAGEMENT
  const [weight, setWeight] = React.useState(defaulValues.weight);
  const handleWeightChange = event => {
    setWeight(event.target.value);
  };

  // TRAINING MANAGEMENT
  const [training, setTraining] = React.useState(defaulValues.training);
  const handleTrainingChange = event => {
    setTraining(event.target.value)
    const { target } = event;
    setTimeout(() => {
      target.focus();
    }, 10);
  }

  // UNIT MANAGEMENT
  const [unit, setUnit] = React.useState(defaulValues.unit);
  const handleUnitChange = event => {
    setUnit(event.target.value);
  };

  const {t, locale} = useTranslate("exercise");
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label={t("execution_day")}
          format="dd/MM/yyyy"
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          className="protocoll-date"
          style={{width: "100%"}}
        />
      </MuiPickersUtilsProvider>
      <div className="input-fields">
        <div className="fields-group">
          <TextField
            id="outlined-select-currency"
            select
            value={unit}
            onChange={handleUnitChange}
            margin="normal"
            variant="outlined"
            style={{marginRight: "2em"}}
          >
            {units(locale).map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="filled-start-adornment"
            type="number"
            variant="outlined"
            value={training}
            onChange={handleTrainingChange}
            style={{width: "100%", marginTop: "1em"}}
          />
        </div>
        <TextField
          id="filled-start-adornment"
          InputProps={{
            startAdornment: <InputAdornment position="start">{t("kg")}</InputAdornment>,
          }}
          variant="outlined"
          type="number"
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
          style={{width: "100%", marginTop: "1em"}}
        />
      </div>
      <div className="buttons">
      <Fab variant="extended" onClick={toggleShowForm}>{t("back")}</Fab>
        <Fab variant="extended" onClick={() => {
          createProtocoll(training, unit, weight, selectedDate);
          toggleShowForm();
        }}>{t("save")}</Fab>
      </div>

    </>
  )
}

export default ({sets, workouts, day, loading, onCreateProtocoll, onDeleteProtocoll, onCreateAllProtocolls}) => {

  const {t} = useTranslate("exercise");

  const [daySets, setDaySets] = React.useState([]);

  const [showForm, setShowForm] = React.useState(false);
  const toggleShowForm = () => setShowForm(!showForm);

  const createProtocoll = (training, unit, weight, date) => {
    onCreateProtocoll(date ? date : day, training, weight, unit);
  }

  const createAllProtocolls = () => {
    onCreateAllProtocolls(daySets.filter(daySet => !(daySet.id > 0) ));
  }

  React.useEffect(() => {

    const selectedDay = moment(day).format("YYYY-MM-DD");
    const dayWorkouts = workouts[selectedDay] ? workouts[selectedDay] : [];
    let lastDayWorkouts = [];

    const collection = [];

    //console.log("workouts")
    //console.log(workouts)

    // use the last workout as a reference
    if( workouts && _.size(workouts) > 0 ) {
      lastDayWorkouts = _.find(workouts, (w, key) => {
        const {execution_day} = w;
        return (new Date(key)).getDate() !== day.getDate();
      });
    }

    //console.log("lastDayWorkouts")
    //console.log(lastDayWorkouts)

    //console.log("sets")
    //console.log(sets)

    //console.log("dayWorkouts")
    //console.log(dayWorkouts)

    if( lastDayWorkouts && lastDayWorkouts.length > 0 ) {
      lastDayWorkouts.map((set, index) => {
        if(dayWorkouts[index]) {
          const {id, weight, repetitions, training_unit} = dayWorkouts[index];
          collection.push({
            index: index,
            weight: weight,
            training: repetitions,
            unit: training_unit,
            id: id,
          });
        } else {
          const {weight, repetitions, training_unit} = set;
          collection.push({
            index: index,
            weight: weight,
            training: repetitions,
            unit: training_unit,
          });
        }
      });
    } else {
      sets.map((set, index) => {
        if(dayWorkouts[index]) {
          const {id, weight, repetitions, training_unit} = dayWorkouts[index];
          collection.push({
            index: index,
            weight: weight,
            training: repetitions,
            unit: training_unit,
            id: id,
          });
        } else {
          const {weight, training, unit} = set;
          collection.push({
            index: index,
            weight: weight,
            training: training,
            unit: unit,
            id: null,
          });
        }
      });
    }

    dayWorkouts.map((set, index) => {
      if(index > collection.length - 1) {
        const {id, weight, repetitions, training_unit} = dayWorkouts[index];
        collection.push({
          index: index,
          weight: weight,
          training: repetitions,
          unit: training_unit,
          id: id,
        });
      }
    });

    /*
    sets.map((set, index) => {
      if(dayWorkouts[index]) {
        const {id, weight, repetitions, training_unit} = dayWorkouts[index];
        collection.push({
          index: index,
          weight: id > 0 ? weight : lastWorkoutValues ? lastWorkoutValues.weight : weight,
          //weight: set.weight,
          training: repetitions,
          unit: training_unit,
          id: id,
        });
      } else {
        const {weight, training, unit} = set;
        collection.push({
          index: index,
          weight: lastWorkoutValues ? lastWorkoutValues.weight : weight,
          training: training,
          unit: unit,
          id: null,
        });
      }
    });
    dayWorkouts.map((set, index) => {
      if(index > collection.length - 1) {
        const {id, weight, repetitions, training_unit} = dayWorkouts[index];
        collection.push({
          index: index,
          weight: lastWorkoutValues ? lastWorkoutValues.weight : weight,
          training: repetitions,
          unit: training_unit,
          id: id,
        });
      }
    })
    */
    console.log("collection");
    console.log(collection);

    setDaySets(collection);

  }, [sets, workouts, day]);

  let defaultValues = {
    unit: 0,
    training: 12,
    weight: 0,
  }

  if( workouts && _.size(workouts) > 0 ) {
    const lastWorkoutDay = _.find(workouts, (w) => {console.log(w); return w.length > 0});
    const lastWorkout = lastWorkoutDay[lastWorkoutDay.length-1];
    defaultValues = {
      training: lastWorkout.repetitions,
      unit: lastWorkout.training_unit,
      weight: lastWorkout.weight,
    }
  }

  const onChangeSet = (set) => {
    daySets[set.index] = {...set};
    setDaySets([...daySets]);
  }

  return (
    <Sets>
      <div className="sets-title">
        {t("today")}
        {!showForm &&
          <Fab
            size="small"
            variant="extended"
            className="add-all-button"
            disabled={loading}
            onClick={createAllProtocolls}
          >
            <DoneAllIcon />
            {t("save_all")}
          </Fab>
        }
      </div>
      { loading &&
        <CircularProgress size={70} color="secondary"/>
      }
      { !loading && !showForm &&
        daySets.map(set => <Set
          set={set}
          createProtocoll={createProtocoll}
          deleteProtocoll={onDeleteProtocoll}
          onChangeSet={onChangeSet}
        />)
      }
      { showForm &&
        <Form
          toggleShowForm={toggleShowForm}
          defaulValues={defaultValues}
          createProtocoll={createProtocoll}
        />
      }
      {!loading &&
        <div className="create-protocoll-button">
          <IconButton aria-label={t("save")}  size="medium" onClick={() => {
            setShowForm(!showForm);
          }}>
            {!showForm && <AddCircleOutlineIcon fontSize="inherit" />}
          </IconButton>
        </div>
      }
    </Sets>
  )
}
