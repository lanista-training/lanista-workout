import * as React from "react";
import moment from "moment";
import _ from 'lodash';
import {Panel,StyledButton} from './styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DeleteIcon from '@material-ui/icons/Delete';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ReactPlayer from 'react-player'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateFnsUtils from '@date-io/date-fns';
import CircularProgress from '@material-ui/core/CircularProgress';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useTheme } from '@material-ui/core/styles';

export default ({onGoBack, exercise, workouts, createProtocoll, deleteProtocoll, loading}) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = index => {
    setValue(index);
  };

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
     setOpen(true);
   };
   const handleClose = () => {
     setOpen(false);
   };

  const theme = useTheme();
  const a11yProps = (index) => {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  const [video, setVideo] = React.useState(false);
  const playVideo = () => {
    console.log(video)
    const {videoUrl} = exercise
    if(videoUrl) {
      setVideo(!video)
    } else {
      setOpen(true)
    }
  }
  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
  }
  const [protocollForm, setProtocollForm] = React.useState(false);

  let days = []
  _.each(workouts, (day, key) => {
    let executions = []
    _.each(day, execution => {
      executions.push(execution)
    })
    days.push({
      day: key,
      executions: executions
    })
  })

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [weight, setWeight] = React.useState(0.0);
  const [training, setTraining] = React.useState(0);
  const handleWeightChange = event => {
    setWeight(event.target.value);
  };
  const [selectedExecution, setSelectedExecution] = React.useState(0);
  return (
    <Panel>
      <AppBar className="exercise-header" position="static">
        <div className="exercise-name">{exercise && exercise.name}</div>
        <IconButton aria-label="show 4 new mails" color="inherit" onClick={playVideo}>
          {video && <VideocamOffIcon/>}
          {!video && <VideocamIcon/>}
        </IconButton>
      </AppBar>
        <div
          className="exercise-images"
          style={{
            backgroundImage: "url(" + (exercise && exercise.start_image) + "), url(" + (exercise && exercise.end_image) + ")"
          }}
        >
          {
            video && <ReactPlayer url={exercise.videoUrl} width="100%" height="100%" playing controls/>
          }
        </div>
      <div className="content">
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Info" {...a11yProps(0)} />
            <Tab label="Protokolle" {...a11yProps(1)} />
            <Tab label="Statistik" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel key="tab-1" value={value} index={0} dir={theme.direction}>
            <div className="exercise-title">Ausführung</div>
            <div className="exercise-content">
              {exercise && exercise.coaching_notes.map((coachingNote, index) => (
                <div key={"coaching-note" + index}>{coachingNote}</div>
              ))}
            </div>
            <div className="exercise-title">Mögliche Fehler</div>
            <div className="exercise-content">
              {exercise && exercise.mistakes.map((coachingNote, index) => (
                <div key={"mistake-" + index}>{coachingNote}>{coachingNote}</div>
              ))}
            </div>
          </TabPanel>
          <TabPanel key="tab-2" value={value} index={1} dir={theme.direction}>
            <div className="create-protocoll-button">
              <IconButton aria-label="create protocoll"  size="large" onClick={() => {
                setWeight((exercise && exercise.workouts && exercise.workouts.length > 0) ? exercise.workouts[0].weight : 0.0)
                setTraining((exercise && exercise.workouts && exercise.workouts.length > 0) ? exercise.workouts[0].repetitions : 8)
                setProtocollForm(!protocollForm)}
              }>
                {!protocollForm && <AddCircleOutlineIcon fontSize="inherit" />}
                {protocollForm && <AddCircleIcon fontSize="inherit" />}
              </IconButton>
            </div>
            <List subheader={<li />}>
              { loading &&
                <CircularProgress size={70} color="secondary"/>
              }
              { !loading &&
                days.map( workout => {
                  return (
                    <li key={`section-${workout.day}`}>
                      <ul style={{ padding: 0 }}>
                        <ListSubheader>{workout.day}</ListSubheader>
                        {workout.executions.map((execution, index) => (
                          <ListItem
                            className={selectedExecution==execution.id ? 'selected' : ''}
                            key={`item-${workout.day}-${execution.id}`}
                              onClick={() => {
                              setSelectedExecution(execution.id == selectedExecution ? 0 : execution.id)
                            }}
                          >
                            { selectedExecution==execution.id &&
                              <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<DeleteIcon />}
                                onClick={() => deleteProtocoll(execution.id)}
                              >
                                Delete
                              </Button>
                            }
                            <ListItemText primary={"Satz " + (index+1) + ": " + execution.repetitions + (execution.training_unit == 0 ? ' Wdh' : execution.training_unit == 1 ? ' Min' : ' Sek') + " x " + execution.weight + " Kg"} />
                          </ListItem>
                        ))}
                      </ul>
                    </li>
                  )
              })
            }
            </List>
          </TabPanel>
          <TabPanel key="tab-3" value={value} index={2} dir={theme.direction}>
            Statistik
          </TabPanel>
        </SwipeableViews>
      </div>
      <StyledButton color="primary" onClick={onGoBack}>
        <ArrowBackIosIcon style={{marginLeft: '0.4em'}}/>
      </StyledButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-dialog-title">{"Wiedergabeproblem"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Es gibt kein Video zu dieser Übung.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={protocollForm}
        onClose={protocollForm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-protocoll-title">{"Protokollieren"}</DialogTitle>
        <DialogContent>
          <>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Ausführungstag"
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
              <TextField
                id="filled-start-adornment"
                InputProps={{
                  startAdornment: <InputAdornment position="start">{(exercise && exercise.settings) ? (exercise.settings.training_unit == 0 ? "Wdh" : ((exercise.settings.training_unit == 1) ? "Min" : "Sek")) : "Wdh"}</InputAdornment>,
                }}
                variant="outlined"
                value={training}
                onChange={(event) => {
                  setRepetitions(event.target.value)
                  const { target } = event;
                  setTimeout(() => {
                    target.focus();
                  }, 10);
                }}
                style={{width: "100%", marginTop: "1em"}}
              />
              <TextField
                id="filled-start-adornment"
                InputProps={{
                  startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                }}
                variant="outlined"
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
                style={{width: "100%", marginTop: "1em"}}
              />
            </div>
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProtocollForm(false)} color="primary" autoFocus>
            Zurück
          </Button>
          <Button onClick={() => {
            createProtocoll(selectedDate, training, weight, exercise.settings.training_unit)
            setProtocollForm(false)
          }} color="primary" autoFocus>
            Speichern
          </Button>
        </DialogActions>
      </Dialog>
    </Panel>
  )
};
