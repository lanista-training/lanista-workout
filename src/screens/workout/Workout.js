import * as React from "react";
import moment from "moment";
import {Panel, StyledButton} from './styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Skeleton from '@material-ui/lab/Skeleton';
import LinearProgress from '@material-ui/core/LinearProgress';

import { useTheme } from '@material-ui/core/styles';

export default ({
    onGoBack,
    plan,
    showExercise,
    memberId,
    loading,
    error,
    showAssignButton,
    assignPlan,
    deletePlan,
    deletePlanLoading,
  }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
     setOpen(true);
   };
   const handleClose = () => {
     setOpen(false);
   };
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = index => {
    setValue(index);
  };
  const a11yProps = (index) => {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
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
        <Box p={plan.splits.length}>{children}</Box>
      </Typography>
    );
  }
  const {name, splits} = (plan ? plan : {})
  return (
    <Panel>
      <div className="header">
        {error && <div>Sorry   :-(</div>}
        {!error &&
          <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            {!loading && name}
            {loading && <Skeleton variant="rect" width={"100%"} height={"2em"} />}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {plan && plan.description}
            {plan && plan.creator_name && <div className="plan-author">Ersteller: <span>{plan.creator_name}</span></div>}
            {(plan && plan.duration > 0) && (<div className="plan-duration">Plandauer: <span>{plan.duration} {plan.duration > 1 ? 'Wochen' : 'Woche'}</span></div>)}
            {plan && !showAssignButton &&
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={() => handleOpen()}
                startIcon={<DeleteIcon />}
              >
                Plan löschen
              </Button>
            }
          </ExpansionPanelDetails>
        </ExpansionPanel>
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
            {
              splits && splits.map((split, index) => (
                <Tab key={"plan-split-" + index} label={split.name} {...a11yProps(index)} />
              ))
            }
          </Tabs>
        </AppBar>
        {loading &&
          <LinearProgress style={{top: "-1em"}}/>
        }
        {
          !loading && splits && splits.length > 0 &&
          <SwipeableViews
            axis={'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            {
              splits && splits.map((split, index) => (
                <TabPanel key={"split-panel-" + index} value={value} index={index} dir={theme.direction} className="exercise-list">
                  {error && <div className="error">Das Trainingsplan könnte leider nicht gefunden werden.</div>}
                  {!error && !loading && split.exercises.map(planExercise => (
                    <Card key={'plan-exercise-' + planExercise.exercise.id} onClick={() => showExercise(planExercise.exercise.id, memberId, planExercise.id)}>
                      <CardActionArea>
                        <CardMedia
                          className="exercise-images"
                          title="Contemplative Reptile"
                        >
                          <div
                            className="start-image"
                            style={{backgroundImage: "url(" + planExercise.exercise.start_image + ")"}}
                          />
                          <div
                            className="end-image"
                            style={{backgroundImage: "url(" + planExercise.exercise.end_image + ")"}}
                          />
                        </CardMedia>
                        <CardContent>
                          {planExercise.exercise.name}
                        </CardContent>
                        <CardActions>
                          <div><span>{planExercise.rounds}</span> Sätze</div>
                          <div><span>{planExercise.weight}</span> Kg / <span>{planExercise.repetitions}</span> {planExercise.training_unit == 0 ? "Wdh" : planExercise.training_unit == 0 ? 'Min' : 'Sek'}</div>
                        </CardActions>
                      </CardActionArea>
                    </Card>
                  ))}
                </TabPanel>
              ))
            }
          </SwipeableViews>
        }
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
        <DialogTitle id="alert-dialog-title">{"PLAN LÖSCHEN"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Möchtest du dieser Trainingsplan löschen?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Zurück
          </Button>
          <Button onClick={() => {
            deletePlan(plan.id)
            handleClose()
          }} color="primary" autoFocus>
            Plan löschen
          </Button>
        </DialogActions>
        </DialogActions>
      </Dialog>
    </Panel>
  )
};
