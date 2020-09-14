import * as React from "react";
import moment from "moment";
import { useTranslate } from '../../hooks/Translation';
import {Panel, StyledButton} from './styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
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
import Pullable from 'react-pullable';

import { useTheme } from '@material-ui/core/styles';

const getProgress = (protocolls, sets) => {
  console.log("getProgress")
  console.log(protocolls)
  console.log(sets)
  return protocolls && protocolls.length > 0 && <LinearProgress variant="determinate" value={protocolls.length > sets ? 100 : protocolls.length / sets * 100} color="secondary" />;
}

export default ({
    onGoBack,
    signedIn,
    plan,
    showExercise,
    memberId,
    loading,
    error,
    showAssignButton,
    assignPlan,
    deletePlan,
    deletePlanLoading,
    currentTab,
    setCurrentTab,
    hasNorch,
    refetch,
    todayExecutions,
  }) => {
    console.log("todayExecutions")
    console.log(todayExecutions)
  const {t} = useTranslate("workout");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
     setOpen(true);
   };
   const handleClose = () => {
     setOpen(false);
   };
  const theme = useTheme();
  const handleChange = (event, newValue) => {
    setCurrentTab(newValue)
  };
  const handleChangeIndex = index => {
    setCurrentTab(index)
  };
  const a11yProps = (index) => {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  const onRefresh = () => {
    console.log("ON REFRESH");
    refetch();
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
      <div className="header" style={hasNorch ? {paddingTop: "40px"} : {}}>
        {error && <div>Sorry   :-(</div>}
        {!error &&
          <ExpansionPanel defaultExpanded={assignPlan !== undefined}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              {!loading && name}
              {loading && <Skeleton variant="rect" width={"100%"} height={"2em"} />}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {plan && plan.description && plan.description.split('||').map( (line, index) => (<div key={"description-line" + index}>{line.charAt(0).toUpperCase() + line.slice(1)}</div>)) }
              {(plan && plan.duration > 0) && (<div className="plan-duration">{t("plan_duration")}: <span>{plan.duration} {plan.duration > 1 ? t("weeks") : t("week")}</span></div>)}
              {plan && !showAssignButton &&
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={() => handleOpen()}
                  startIcon={<DeleteIcon />}
                >
                  {t("delete_plan")}
                </Button>
              }
              {plan && showAssignButton &&
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={() => signedIn ? assignPlan(plan.id) : onGoBack(plan.id)}
                >
                  {signedIn ? t("add_plan") : t("login_to_keep_going")}
                </Button>
              }
            </ExpansionPanelDetails>
          </ExpansionPanel>
        }
      </div>
      <div className="content">
        <AppBar position="static" color="default">
          <Tabs
            value={currentTab}
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
          <div>
            {
              splits && splits.map((split, index) => (
                <TabPanel key={"split-panel-" + index} value={currentTab} index={index} dir={theme.direction} className="exercise-list">
                  <Pullable onRefresh={onRefresh}>
                    {error && <div className="error">{t("plan_not_found")}</div>}
                    {!error && !loading && split.exercises.map(planExercise => (
                      <Card className="plan-exercise" key={'plan-exercise-' + planExercise.exercise.id} onClick={() => showExercise(planExercise.exercise.id, planExercise.id)}>
                        <CardActionArea>
                          <CardMedia
                            className={todayExecutions && todayExecutions.filter(e => e.exercise_id == planExercise.exercise.id).length >= planExercise.rounds ? "exercise-images done" : "exercise-images"}
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
                          {getProgress(todayExecutions && todayExecutions.filter(e => e.exercise_id == planExercise.exercise.id), planExercise.rounds)}
                          <CardContent>
                            {planExercise.exercise.name}
                          </CardContent>
                          <CardActions>
                            <div><span>{planExercise.rounds}</span> {t("sets")}</div>
                            <div><span>{planExercise.weight}</span> {t("kg")} / <span>{planExercise.repetitions}</span> {planExercise.training_unit == 0 ? t("rep") : planExercise.training_unit == 1 ? t("sec") : t("min")}</div>
                          </CardActions>
                        </CardActionArea>
                      </Card>
                    ))}
                  </Pullable>
                </TabPanel>
              ))
            }
          </div>
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
            {t("delete_plan_question")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t("back")}
          </Button>
          <Button onClick={() => {
            deletePlan(plan.id)
            handleClose()
          }} color="primary" autoFocus>
            {t("delete_plan")}
          </Button>
        </DialogActions>
        </DialogActions>
      </Dialog>
    </Panel>
  )
};
