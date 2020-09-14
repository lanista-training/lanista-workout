import * as React from "react";
import PropTypes from 'prop-types';
import moment from "moment";
import { useTranslate } from '../../hooks/Translation';
import {StyledPanel, UserAvatar, StyledButton, StyledCard} from './styles';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import TimerOffIcon from '@material-ui/icons/TimerOff';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Skeleton from '@material-ui/lab/Skeleton';
import MenuButton from '../../components/MenuButton';
import Slider from "react-slick";
import ScannerButtons from "../../components/ScannerButtons";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pullable from 'react-pullable';

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Panel(props) {
  const {modal, scanning} = props
  return (
    <StyledPanel>
      { scanning && <LinearProgress /> }
      { modal && <div className="modal-blocker"/> }
      {props.children}
    </StyledPanel>
  )
}

const Dashboard = ({
  firstName,
  lastName,
  language,
  photoUrl,
  plans,
  doLogout,
  openWorkout,
  openWorkouts,
  goToSetup,
  onGoToProtocolls,
  onGoToMeasurements,
  showBanners,
  banners,
  preventLogout,
  filter,
  toggleFilter,
  loading,
  editable,
  hasNorch,

  onScannQr,
  onScannNfc,
  onScannBeacon,
  onSearchExercises,

  scannNfcDisable,
  scannQrDisable,
  scannBeaconDisable,

  snackbar,
  handleCloseSnackbar,
  snackbarMessage,
  modal,
  scanning,
  showScannButtons,
  openBeaconSearch,
  setOpenBeaconSearch,

  beaconScanning,
  nfcScanning,

  refetch,
}) => {
  const {t} = useTranslate("dashboard");
  const onRefresh = () => {
    refetch();
  }

  return (
    <Panel modal={modal} scanning={scanning}>
      <div className="user-info header" style={hasNorch ? {top: "30px"} : {}}>
        <div className="header-inner-frame">
          <div className="user-name">
            <div className="first">{loading ? <Skeleton width="60%" /> : firstName}</div>
            <div className="last">{loading ? <Skeleton width="50%" /> : lastName}</div>
          </div>
          <Button
            variant="outlined"
            startIcon={<AddCircleIcon />}
            size="small"
            onClick={openWorkouts}
          >
            {t('plans')}
          </Button>
        </div>
        {
          (loading || showBanners) && <div className="banners">
            {loading && <Skeleton variant="rect" />}
            {!loading &&
              <Slider {...settings}>
              {
                banners.fallback.map((banner, i) => (
                  <div key={'banner-' + banner.id} className={ banners && banners.banners.length == 1 ? "one-banner banner-wrapper" : "banner-wrapper" }>
                    <div className="banner" onClick={() => {
                      if( typeof window.cordova !== 'undefined' ) {
                        let win = window.cordova.InAppBrowser.open(banners.banners[i].link ? banners.banners[i].link : banner.link, '_blank', 'location=yes');
                        win.focus();
                      } else {
                        let win = window.open(banners.banners[i].link ? banners.banners[i].link : banner.link, '_blank');
                        win.focus();
                      }
                    }}>
                      <div className="banner-image" style={{
                        backgroundImage: 'url(' + banner.imageUrl + ')'
                      }}/>
                      <div className="banner-image banner-fallback" style={{
                        backgroundImage: 'url(' + banners.banners[i].imageUrl + ')'
                      }}/>
                    </div>
                  </div>
                ))
              }
              </Slider>
            }
          </div>
        }
      </div>
      <div className="content-wrapper" style={{marginTop: (loading || showBanners) ? (hasNorch ? "calc(45vw + 135px)" : "calc(45vw + 115px)"): "110px"}}>
        <div className="content">
          <FormControlLabel
            value="active"
            control={
              <Switch
                checked={filter}
                onChange={toggleFilter}
                value={filter}
              />
            }
            label={filter ? t('active_plans') : t('all_plans')}
            labelPlacement="start"
          />
          {loading && <Skeleton variant="rect" />}
          {!loading && plans && plans.length == 0 &&
            <div className="empty-list-text">{t("plan_list_empty_text")}</div>
          }
          <Pullable onRefresh={onRefresh}>
            {!loading && plans && plans.map(plan => (
              <StyledCard
                key={plan.id}
                className={moment(parseInt(plan.expiration_date)).isAfter() || plan.duration == 0 ? 'active' : 'expired'}
                onClick={() => openWorkout(plan.id)}
              >
                <CardActionArea>
                  <Card>
                    <CardHeader
                      title={plan.name}
                      subheader={
                        plan.days ? plan.days + (plan.days > 1 ? (' ' + t('days_in_the_week')) : (' ' + t('day_in_the_week'))): t('no_duration')
                      }
                      avatar={
                        <Avatar>
                          {!moment(new Date(parseInt(plan.expiration_date))).isAfter() && plan.duration > 0 && <TimerOffIcon />}
                          {(moment(new Date(parseInt(plan.expiration_date))).isAfter() || !(plan.duration > 0)) && <PlayCircleOutlineIcon />}
                        </Avatar>
                      }
                    >
                    </CardHeader>
                    <CardContent>
                      {plan.description}
                    </CardContent>
                  </Card>
                </CardActionArea>
              </StyledCard>
            ))}
          </Pullable>
        </div>
      </div>
      <MenuButton
        preventLogout={preventLogout}
        editable={editable}
        doLogout={doLogout}
        goToSetup={goToSetup}
        onGoToProtocolls={onGoToProtocolls}
        onGoToMeasurements={onGoToMeasurements}
        language={language}
      />
      <Backdrop open={openBeaconSearch} onClick={setOpenBeaconSearch} style={{zIndex: 2}}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ScannerButtons
        onScannQr={onScannQr}
        onScannNfc={onScannNfc}
        onScannBeacon={onScannBeacon}
        onSearchExercises={onSearchExercises}
        scannNfcDisablen={scannNfcDisable}
        scannQrDisablen={scannQrDisable}
        scannBeaconDisablen={scannBeaconDisable}
        showScannButtons={showScannButtons}

        beaconScanning={beaconScanning}
        nfcScanning={nfcScanning}
      />
      <Snackbar open={snackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Panel>
  )
};

Dashboard.propTypes = {
  /**
   * Function to translate content
  */
  t: PropTypes.func,

  /**
   * Function to translate content
  */
  feeds: PropTypes.array,

  /**
   * Function to translate content
  */
  type: PropTypes.number,

  /**
   * Function to translate content
  */
  currentScrollPosition: PropTypes.number,

  /**
   * Function to translate content
  */
  jumpToNow: PropTypes.func,

  /**
   * Function to translate content
  */
  jumpToDay: PropTypes.func,

  /**
   * Function to translate content
  */
  onRequestPage: PropTypes.func,

  /**
   * Function to translate content
  */
  loading: PropTypes.bool,

  /**
   * Function to translate content
  */
  error: PropTypes.object,

  /**
   * Function to translate content
  */
  hasMore: PropTypes.bool,

  /**
   * Function to translate content
  */
  hasMoreUp: PropTypes.bool,

  /**
   * Function to translate content
  */
  initialLoading: PropTypes.bool,

  /**
   * Function to translate content
  */
  setPageSize: PropTypes.func,

  /**
   * Function to translate content
  */
  congratulateMember: PropTypes.func,

  /**
   * Function to translate content
  */
  openMember: PropTypes.func,

  /**
   * Function to translate content
  */
  openPlan: PropTypes.func,

  /**
   * Function to translate content
  */
  showModal: PropTypes.func,

  /**
   * Function to translate content
  */
  modalPanel: PropTypes.object,

  /**
   * Function to translate content
  */
  eventsQuery: PropTypes.string,

  /**
   * Function to translate content
  */
  accesslevel: PropTypes.number,

  /**
   * Function to translate content
  */
  bu: PropTypes.number,

  /**
   * Function to translate content
  */
  hasInterface: PropTypes.bool,

  /**
   * Function to translate content
  */
  setFilter: PropTypes.func,
}

export default Dashboard;
