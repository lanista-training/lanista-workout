import * as React from "react";
import PropTypes from 'prop-types';
import moment from "moment";
import { useTranslate } from '../../hooks/Translation';
import {Panel, UserAvatar, StyledButton, StyledCard} from './styles';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import TimerOffIcon from '@material-ui/icons/TimerOff';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

import Pullable from 'react-pullable';
//
// Theming imports
//
import {ThemeProvider } from 'styled-components';
import defaultTheme from '../../themes/default';
//
//
//
const getSplits = (plan) => {
  if(plan.splits) {
    return plan.splits.length;
  } else {
    return plan.days;
  }
}

const Workouts = ({
  firstName,
  lastName,
  photoUrl,
  plans,
  onLogout,
  openWorkout,
  onGoBack,
  assignPlan,
  onSetFilter,
  filter,
  hasNorch,
  refetch,
  primaryColor,
  secondaryColor,
}) => {
  const [openFilter, setOpenFilter] = React.useState(true);
  const handleClickOpenFilter = () => {
    setOpenFilter(true);
  };
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  let {t} = useTranslate("workouts");
  //
  // Theming variables
  //
  const colors = {
    primary: primaryColor ? primaryColor : "#d20027",
    secondary: secondaryColor ? secondaryColor : "#f4f2f2",
  };
  //
  //
  //
  return (
    <ThemeProvider theme={{...defaultTheme, colors: colors}}>
      <Panel>
        <div className="header" style={hasNorch ? {paddingTop: "30px"} : {}}>
          <div className="header-inner-frame">
            <div className="header-title">
              {t('plans')}
            </div>
            <Button
              variant="outlined"
              startIcon={<Icon>filter_list</Icon>}
              size="small"
              onClick={handleClickOpenFilter}
            >
              {filter}
            </Button>
          </div>
        </div>
        <div className="content-wrapper" style={hasNorch ? {marginTop: "110px"} : {}}>
          <div className="content">
            <Pullable onRefresh={refetch}>
              {
                plans && plans.map(plan => (
                  <StyledCard
                    key={plan.id}
                    onClick={(event) => {
                      if( event.target.parentElement.classList.contains('assign-workout-button') || event.target.classList.contains('assign-workout-button')) {
                        assignPlan(plan.id)
                      } else {
                        openWorkout(plan.id)
                      }
                    }
                  }
                  >
                  <CardActionArea>
                    <Card elevation={0}>
                      <div className="header-section">
                        <CardHeader
                          title={plan.name}
                          subheader={
                            getSplits(plan) ? getSplits(plan) + ' ' + (getSplits(plan) > 1 ? t('days_in_the_week') : t('day_in_the_week')) : t('no_duration')
                          }
                        />
                        <div className="plan-image" style={{backgroundImage: 'url(' + plan.imageUrl + ')'}}/>
                      </div>
                      <CardContent>
                        {plan.description}
                      </CardContent>
                      <CardActions>
                        <Button
                          fullWidth
                          variant="outlined"
                          color="primary" className="assign-workout-button"
                        >
                          {t('add_to_my_list')}
                        </Button>
                      </CardActions>
                    </Card>
                  </CardActionArea>
                </StyledCard>
              ))}
            </Pullable>
          </div>
        </div>
        <StyledButton color="primary" onClick={onGoBack}>
          <ArrowBackIosIcon style={{marginLeft: "0.4em"}}/>
        </StyledButton>
        <Dialog onClose={handleCloseFilter} aria-labelledby="simple-dialog-title" open={openFilter}>
          <DialogTitle id="simple-dialog-title">{t('select_category')}</DialogTitle>

          <List style={{paddingBottom: "2em"}}>
            <ListItem autoFocus button onClick={() => {
              onSetFilter("shaping")
              handleCloseFilter()
            }}>
              <ListItemAvatar>
                <Avatar>
                  <Icon>panorama_vertical</Icon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={t("shaping")} />
            </ListItem>
            <ListItem autoFocus button onClick={() => {
              onSetFilter("gain")
              handleCloseFilter()
            }}>
              <ListItemAvatar>
                <Avatar>
                  <Icon>fitness_center</Icon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={t("gain")} />
            </ListItem>
            <ListItem autoFocus button onClick={() => {
              onSetFilter("functional")
              handleCloseFilter()
            }}>
              <ListItemAvatar>
                <Avatar>
                  <Icon>directions_run</Icon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={t("functional")} />
            </ListItem>
            <ListItem autoFocus button onClick={() => {
              onSetFilter("mobilisation")
              handleCloseFilter()
            }}>
              <ListItemAvatar>
                <Avatar>
                  <Icon>accessibility_new</Icon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={t("mobilization")} />
            </ListItem>
            <ListItem autoFocus button onClick={() => {
              onSetFilter("*")
              handleCloseFilter()
            }}>
              <ListItemAvatar>
                <Avatar>
                  <Icon>filter_list</Icon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={t("all_plans")} />
            </ListItem>
          </List>
        </Dialog>
      </Panel>
    </ThemeProvider>
  )
};

Workouts.propTypes = {
  /**
   * Function to translate content
  */
  firstName: PropTypes.string,

  /**
   * Function to translate content
  */
  lastName: PropTypes.string,

  /**
   * Function to translate content
  */
  language: PropTypes.string,

  /**
   * Function to translate content
  */
  photoUrl: PropTypes.string,

  /**
   * Function to translate content
  */
  plans: PropTypes.array,

  /**
   * Function to translate content
  */
  doLogout: PropTypes.func,

  /**
   * Function to translate content
  */
  openWorkout: PropTypes.func,

  /**
   * Function to translate content
  */
  openWorkouts: PropTypes.func,

  /**
   * Function to translate content
  */
  goToSetup: PropTypes.func,

  /**
   * Function to translate content
  */
  onGoToProtocolls: PropTypes.func,

  /**
   * Function to translate content
  */
  onGoToMeasurements: PropTypes.func,

  /**
   * Function to translate content
  */
  showBanners: PropTypes.func,

  /**
   * Function to translate content
  */
  banners: PropTypes.array,

  /**
   * Function to translate content
  */
  preventLogout: PropTypes.bool,

  /**
   * Function to translate content
  */
  filter: PropTypes.string,

  /**
   * Function to translate content
  */
  toggleFilter: PropTypes.func,

  /**
   * Function to translate content
  */
  loading: PropTypes.bool,

  /**
   * Function to translate content
  */
  editable: PropTypes.bool,

  /**
   * Function to translate content
  */
  hasNorch: PropTypes.bool,

  /**
   * Function to translate content
  */

  onScannQr: PropTypes.func,

  /**
   * Function to translate content
  */
  onScannNfc: PropTypes.func,

  /**
   * Function to translate content
  */
  onScannBeacon: PropTypes.func,

  /**
   * Function to translate content
  */
  onSearchExercises: PropTypes.func,

  /**
   * Function to translate content
  */
  scannNfcDisable: PropTypes.bool,

  /**
   * Function to translate content
  */
  scannQrDisable: PropTypes.bool,

  /**
   * Function to translate content
  */
  scannBeaconDisable: PropTypes.bool,

  /**
   * Function to translate content
  */
  snackbar: PropTypes.bool,

  /**
   * Function to translate content
  */
  handleCloseSnackbar: PropTypes.func,

  /**
   * Function to translate content
  */
  snackbarMessage: PropTypes.string,

  /**
   * Function to translate content
  */
  modal: PropTypes.bool,

  /**
   * Function to translate content
  */
  scanning: PropTypes.bool,

  /**
   * Function to translate content
  */
  showScannButtons: PropTypes.bool,

  /**
   * Function to translate content
  */
  openBeaconSearch: PropTypes.func,

  /**
   * Function to translate content
  */
  setOpenBeaconSearch: PropTypes.func,

  /**
   * Function to translate content
  */
  beaconScanning: PropTypes.bool,

  /**
   * Function to translate content
  */
  nfcScanning: PropTypes.bool,

  /**
   * Function to translate content
  */
  refetch: PropTypes.func,
}

export default Workouts;
