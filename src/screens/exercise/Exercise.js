import * as React from "react";
import PropTypes from 'prop-types';
import moment from "moment";
import { useTranslate } from '../../hooks/Translation';
import _ from 'lodash';
import {Panel,StyledButton, StyledDialog} from './styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DeleteIcon from '@material-ui/icons/Delete';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
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
import ReactPlayer from 'react-player';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
import Slider from "react-slick";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useTheme } from '@material-ui/core/styles';
import Set from './Set';
import Sets from './Sets';
import Pullable from 'react-pullable';

const sliderSettings = {
  arrows: true,
  dots: false,
  infinite: false,
  fade: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  nextArrow: <ArrowForwardIosIcon/>,
  prevArrow: <ArrowBackIosIcon/>
};

const CustomizedLabel = ({x, y, stroke, value}) => {
  return <text x={x} y={y-10} dy={-4} fill="white" fontSize={15} textAnchor="middle">{value}</text>;
}

const renderTotalVolumenGraph = (records, t) => {
  const available = records && records.length > 0
  let sumWeights = 0
  records.map(record => sumWeights += record.totalWeight)
  const sortedRecords = records.slice(0).reverse();
  return(
    <>
      {available && sumWeights > 0 ?
        <ResponsiveContainer>
          <LineChart
            data={(sortedRecords.length > 7 ? sortedRecords.slice(sortedRecords.length-7, sortedRecords.length) : sortedRecords).map(record => ({
              name: record.day,
              value: record.totalWeight,
            }))}
            margin={{
              top: 50, right: 20, left: 0, bottom: 50,
            }}
          >
            <YAxis domain={['dataMin', 'dataMax']} hide={true}/>
            <Line type="monotone" dataKey="value" stroke="white" strokeWidth={2} connectNulls label={<CustomizedLabel />}/>
          </LineChart>
        </ResponsiveContainer>
        :
        (<div className="no-data">{t("missing_data")}</div>)}
    </>
  )
}

const renderOneRepetitionGraph = (records, t) => {
  const available = records && records.length > 0
  let sumWeights = 0
  records.map(record => sumWeights += record.oneRM)
  const sortedRecords = records.slice(0).reverse();
  return(
    <>
      {available && sumWeights > 0 ?
        <ResponsiveContainer>
          <LineChart
            data={(sortedRecords.length > 7 ? sortedRecords.slice(sortedRecords.length-7, sortedRecords.length) : sortedRecords).map(record => ({
              name: record.day,
              value: record.oneRM,
            }))}
            margin={{
              top: 50, right: 20, left: 0, bottom: 50,
            }}
          >
            <YAxis domain={['dataMin', 'dataMax']} hide={true}/>
            <Line type="monotone" dataKey="value" stroke="white" strokeWidth={2} connectNulls label={<CustomizedLabel />}/>
          </LineChart>
        </ResponsiveContainer>
        :
        (<div className="no-data">{t("missing_data")}</div>)}
    </>
  )
}

export default ({
  onGoBack,
  exercise,
  workouts,
  createProtocoll,
  createAllProtocolls,
  deleteProtocoll,
  loading,
  hasNorch,
  refetch,
}) => {
  const {t, locale} = useTranslate("exercise");
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

  let days = [];

  _.each(workouts, (day, key) => {
    let executions = []
    let totalWeight = 0
    let oneRM = 0
    if( key !== moment(new Date()).format("YYYY-MM-DD") ){
      _.each(day, execution => {
        totalWeight += (execution.weight * execution.repetitions)
        oneRM += (execution.weight * execution.repetitions * 0.033) + execution.weight
        executions.push(execution)
      })
      days.push({
        day: key,
        executions: executions,
        totalWeight: totalWeight,
        oneRM: parseInt(parseFloat(oneRM/day.length).toFixed(2)),
      })
    }

  })

  React.useEffect(() => {
    if(workouts && _.size(workouts) > 0) {
      setValue(1);
    }
  }, [workouts]);
  const [value, setValue] = React.useState(days.length > 0 ? 1 : 0);
  const [currentImage, setCurrentImage] = React.useState(0);
  const [selectedExecution, setSelectedExecution] = React.useState(0);
  const {settings} = exercise ? exercise : {};
  const {sets} = settings ? settings : [];
  const [savingAll, setSavingAll] = React.useState(false);

  return (
    <Panel>
      <AppBar className="exercise-header" position="static" style={hasNorch ? {paddingTop: "30px"} : {}}>
        <div className="exercise-name">{!video && exercise && exercise.name}</div>
        <IconButton aria-label="show 4 new mails" color="inherit" onClick={playVideo}>
          {video && <Icon>videocam_off</Icon>}
          {!video && <Icon>videocam</Icon>}
        </IconButton>
      </AppBar>
      <div className="exercise-images">
        {
          video && <ReactPlayer url={exercise.videoUrl} width="100%" height="100%" playing controls/>
        }
        <Slider
          {...sliderSettings}
          afterChange={(current, next) => {
            setCurrentImage(current)
          }}
          className={currentImage == 0 ? 'start-position' : 'end-position'}
        >
          <div key='exercise-image-start' className="exercise-image-wrapper">
            <div className="exercise-image start-position" style={{backgroundImage: "url(" + (exercise && exercise.start_image) + ")"}}/>
          </div>
          <div key='exercise-end-end' className="exercise-image-wrapper">
            <div className="exercise-image start-position" style={{backgroundImage: "url(" + (exercise && exercise.end_image) + ")"}}/>
          </div>
        </Slider>
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
            <Tab label={t("info")} {...a11yProps(0)} />
            <Tab label={t("protocolls")} {...a11yProps(1)} />
            <Tab label={t("statistics")} {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <div>
          <TabPanel key="tab-1" className="tab-panel" value={value} index={0} dir={theme.direction}>
          {
            exercise && exercise.settings && exercise.settings.indications && exercise.settings.indications.length > 0 && (
              <>
                <div className="exercise-title">{t("from_trainer")}</div>
                <div className="exercise-content">
                  {exercise.settings.indications.split("||").map( (note, index) => (<div key={"trainer-note" + index}>{note.charAt(0).toUpperCase() + note.slice(1)}</div>) )}
                </div>
              </>
            )
          }
          <div className="exercise-title">{t("execution")}</div>
            <div className="exercise-content">
              {exercise && exercise.coaching_notes.map((coachingNote, index) => (
                <div key={"coaching-note" + index}>{coachingNote}</div>
              ))}
            </div>
            <div className="exercise-title">{t("errors")}</div>
            <div className="exercise-content">
              {exercise && exercise.mistakes.map((coachingNote, index) => (
                <div key={"mistake-" + index}>{coachingNote}</div>
              ))}
            </div>
          </TabPanel>
          <TabPanel key="tab-2" className="tab-panel protocolls" value={value} index={1} dir={theme.direction}>
            <Pullable onRefresh={refetch}>



              <Sets
                sets={sets ? sets : []}
                workouts={workouts}
                day={new Date()}
                loading={loading}
                onCreateProtocoll={createProtocoll}
                onDeleteProtocoll={deleteProtocoll}
                onCreateAllProtocolls={createAllProtocolls}
              />




              <List subheader={<li />}>
                { loading &&
                  <CircularProgress size={70} color="secondary"/>
                }
                { !loading &&
                  days.map( workout => {
                    return (
                      <li key={`section-${workout.day}`}>
                        <ul style={{ padding: 0 }}>
                          <ListSubheader>{moment(new Date(workout.day)).format('dd, D. MMMM YYYY')}</ListSubheader>
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
                              <ListItemText primary={t("set") + " " + (index+1) + ": " + (execution.repetitions ? execution.repetitions : 0) + (execution.training_unit == 0 ? (' ' + t("rep")) : execution.training_unit == 1 ? (' ' + t("sec")) : (' ' + t("min"))) + " x " + execution.weight + " Kg"} />
                            </ListItem>
                          ))}
                        </ul>
                      </li>
                    )
                })
              }
              </List>

            </Pullable>
          </TabPanel>
          <TabPanel key="tab-3" className="tab-panel" value={value} index={2} dir={theme.direction}>
            <div className="graphic graphic-total-weight" onClick={() => {
              console.log("MARK 3")
            }}>
              <div className="graphic-header">
                <div className="text-section">
                  <div className="last-value">{days && days.length > 0 ? days[0].totalWeight : 0} Kg</div>
                  <div className="graphic-title">{t("weight_day_total")}</div>
                </div>
                <Icon></Icon>
              </div>
              {renderTotalVolumenGraph(days, t)}
            </div>
            <div className="graphic graphic-one-repetition" onClick={() => {
              console.log("MARK 3")
            }}>
              <div className="graphic-header">
                <div className="text-section">
                  <div className="last-value">{days && days.length > 0 ? days[0].oneRM : 0} Kg</div>
                  <div className="graphic-title">{t("1rm")}</div>
                </div>
                <Icon></Icon>
              </div>
              {renderOneRepetitionGraph(days, t)}
            </div>
          </TabPanel>
        </div>
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
        <DialogTitle id="alert-dialog-title">{t("play_problems")}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("no_video")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            {t("ok")}
          </Button>
        </DialogActions>
      </Dialog>

    </Panel>
  )
};
