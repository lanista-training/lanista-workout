import * as React from "react";
import moment from "moment";
import {Panel, StyledButton} from './styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
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
  const [loadingHasChange, setLoadingHasChange] = React.useState(0);
  React.useEffect(() => {
    setLoadingHasChange(loadingHasChange+1)
    if(loadingHasChange > 1) {
      onGoBack();
    }
  }, [deletePlanLoading])
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
        {!error && <div className="workout-name">{name}</div>}
        {showAssignButton &&
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={() => assignPlan(plan.id)}
          >
            <AddIcon />
          </IconButton>
        }
        {
          !showAssignButton &&
          <IconButton
            aria-label="delete"
            onClick={() => handleOpen()}
           >
            <DeleteIcon />
          </IconButton>
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
                <Tab label={split.name} {...a11yProps(index)} />
              ))
            }
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          {
            splits && splits.map((split, index) => (
              <TabPanel value={value} index={index} dir={theme.direction} className="exercise-list">
                {error && <div className="error">Das Trainingsplan könnte leider nicht gefunden werden.</div>}
                {!error && !loading && split.exercises.map(planExercise => (
                  <Card onClick={() => showExercise(planExercise.exercise.id, memberId, planExercise.id)}>
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
