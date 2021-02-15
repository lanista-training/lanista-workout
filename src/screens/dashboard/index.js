import * as React from "react";
import { withApollo } from '../../lib/apollo'
import { useTranslate } from '../../hooks/Translation'
import { useQuery } from '@apollo/react-hooks'
import Dashboard from './Dashboard';
import _ from 'lodash';
import moment from "moment"
import { ME, BEACON } from "../../queries";

const Panel = ({
  client,
  doLogout,
  goToSetup,
  onGoToMeasurements,
  onGoToProtocolls,
  onGoToFilter,
  openWorkouts,
  openPublicWorkout,
  goToLogin,
  hasNorch,
  openWorkout,
  goToExercise,
  goToExercises,
  onShowFavorites,
}) => {
  React.useEffect(() => {
    if( typeof cordova !== 'undefined' ) {
      setTimeout(function() {
        console.log("Abount to initialize BluetoothStatus Plugin...")
        try {
          if( !window.cordova.plugins.BluetoothStatus.hasBTLE && !window.cordova.plugins.BluetoothStatus.BTenabled ) {
            console.log("initializing BluetoothStatus Plugin...")
            window.cordova.plugins.BluetoothStatus.initPlugin();
          }
        } catch (error) {
          console.log("ERROR INITIALIZING BLUETOOTH PLUGIN")
          console.log(error)
        }
      }, 5000);
    }
  }, []);
  // To start online one scanner at the time
  const [activeScanner, setActiveScanner] = React.useState('')

  const [openBeaconSearch, setOpenBeaconSearch] = React.useState(false);
  const handleCloseBeaconSearch = () => {
    setOpenBeaconSearch(false);
  };
  const handleToggleBeaconSearch = () => {
    setOpenBeaconSearch(!openBeaconSearch);
  };

  const[snackbar, setSnackbar] = React.useState(false)
  const handleCloseSnackbar = () => {
    setModal(false)
    setSnackbar(false)
  }
  const handleOpenSnackbar = () => {
    setModal(true)
    setSnackbar(true)
  }

  const [snackbarMessage, setSnackbarMesssage] = React.useState('')
  const [isBeaconReceiverOn, setIsBeaconReceiverOn] = React.useState(false)
  const [modal, setModal] = React.useState(false)
  const [scanning, setScanning] = React.useState(false)
  const [filter, setFilter] = React.useState(false)

  const onLogout = () => {
    doLogout()
    console.log("RESETING THE STORE...")
    client.resetStore();
    window.localStorage.clear();
    goToLogin();
  }

  const { data, error, loading, refetch } = useQuery(ME);
  const me = data ? data.me : {}
  const {
    first_name,
    last_name,
    photoUrl,
    plans,
    banners,
    email,
    editable,
    language,
    beaconScanning,
    nfcScanning,
  } = me;

  const[beaconId, setBeaconId] = React.useState(undefined)
  const {
    data: beaconLink,
    error: beaconLinkError,
    loading: beaconLinkLoading
  } = useQuery(BEACON, {
    variables: {
      beaconId: beaconId
    }
  });

  const curateBanners = () => {
    if( banners ) {
      if(banners.banners[0].imageUrl == '') {
        return banners;
      } else {
        const returnBanners = [];
        const returnFallback = [];
        banners.banners.map((banner, index) => {
          if( index == 0 || banner.imageUrl != '' ) {
            returnBanners.push(banner);
            returnFallback.push(banners.fallback[index]);
          }
        });
        return {
          ...banners,
          banners: returnBanners,
          fallback: returnFallback,
        }
      }
    } else {
      return {
        showBanners: true,
        banners: [],
        fallback: [],
      };
    }
  }

  React.useEffect(() => {
    if( beaconLink && beaconLink !== '' ) {
      const {beacon} = beaconLink
      processScannerMessage(beacon.link)
    }
  }, [beaconLink]);

  // LANGUAGE HANDLING
  let {locale, changeLanguage, languages} = useTranslate("dashboard");
  if( language && language.length > 0 ) {
    if( language.toLowerCase() !== locale && languages.indexOf(language.toLowerCase()) > -1) {
      changeLanguage(language.toLowerCase())
    }
  }
  React.useEffect(() => {
    language && changeLanguage(language.toLowerCase());
  }, [language]);

  const filterPlans = () => {
    if(plans) {
      if(!filter) {
        return plans
      }
      return plans.filter( plan => plan.duration == 0 || moment(parseInt(plan.expiration_date)).isAfter() )
    }
    return []
  }


  if (typeof localStorage !== 'undefined') {
    const pendingPlan = localStorage.getItem('pp')
    if( pendingPlan && pendingPlan > 0 ) {
      localStorage.removeItem('pp')
      openPublicWorkout(pendingPlan)
    }
  }

  const processScannerMessage = (message) => {
    var link = "";
    if (message.indexOf("workout") > -1) {
      link = "showPlan/" + message.substring(message.lastIndexOf("/") + 1);
    } else if (message.indexOf('#') != -1) {
      link = message.substring(message.indexOf('#') + 1);
    } else {
      link = message;
    }

    if( link.indexOf("showPlan") > -1 ) {
      const planId = link.substring(link.indexOf("showPlan") + 9);
      openPublicWorkout(planId);
    } else if ( link.indexOf("openExercises") > -1 || link.indexOf("onSearchExercises") > -1 ) {
      var params = link.substring(link.indexOf("Exercises/") + 10);
      goToExercises(params)
    } else if (link.indexOf("https://") > -1) {
        window.open(link, '_blank', 'location=yes');
    } else {
      setSnackbarMesssage('Übung ist zurzeit nicht verfügbar')
      handleOpenSnackbar()
    }
  }

  const onScannQr =  () => {
    if (typeof cordova === 'undefined') {
      setSnackbarMesssage('Scanner einschalten ! Oder lade die Lanista-APP mit integriertem Scanner')
      handleOpenSnackbar()
      setActiveScanner('')
    } else {
      setModal(true)
      setScanning(true)
      setActiveScanner('qr')

      window.cordova.plugins.barcodeScanner.scan(function(result) {
        if(!result.cancelled) {
          processScannerMessage(result.text)
        }
        setModal(false)
        setScanning(false)
        setActiveScanner('')
      }, function(error) {
        setSnackbarMesssage('Scanner einschalten ! Oder lade die Lanista-APP mit integriertem Scanner')
        handleOpenSnackbar()
        setActiveScanner('')
      });
    }
  }

  const onScannNfc =  () => {
    console.log("onScannNfc")
    if (typeof cordova === 'undefined') {
      setSnackbarMesssage('Scanner einschalten ! Oder lade die Lanista-APP mit integriertem Scanner')
      handleOpenSnackbar()
    } else {
      setModal(true)
      setScanning(true)
      setActiveScanner('nfc')
      window.nfc.beginSession(() => {
        window.nfc.addNdefListener((nfcEvent) => {
          const {tag} = nfcEvent
          const {ndefMessage} = tag
          const message = window.nfc.bytesToString(ndefMessage[0].payload);
          processScannerMessage(message)
          setModal(false)
          setScanning(false)
          setActiveScanner('')
        }, () => {
          setModal(false)
          setScanning(false)
          setActiveScanner('')
        }, (error) => {
          console.log("onFailure")
          console.log(error)
          setModal(false)
          setScanning(false)
          setActiveScanner('')
        })
      }, (error) => {
        console.log("Error creating a session")
        console.log(error)
        setModal(false)
        setScanning(false)
        setActiveScanner('')
      });
    }
  }

  const onScannBeacon = () => {
    console.log("onScannBeacon")
    if( typeof cordova !== 'undefined' ) {
      if( isBeaconReceiverOn ) {
        stopBluetoothScanning();
        handleToggleBeaconSearch();
        setActiveScanner('')
      } else {
        console.log("Check bluetooth status")
        if (window.cordova.plugins.BluetoothStatus.hasBTLE && window.cordova.plugins.BluetoothStatus.BTenabled) {
          initBeacon();
          handleToggleBeaconSearch()
          setActiveScanner('beacon')
          setTimeout(function () {
            stopBluetoothScanning();
            setOpenBeaconSearch(false);
            setActiveScanner('')
          }, 5000);
        } else {
          if (window.device.platform == 'iOS') {
            setSnackbarMesssage('BLUETOOTH_OFF_1');
            handleOpenSnackbar();
            setActiveScanner('')
          } else {
            window.cordova.plugins.BluetoothStatus.enableBT();
          }
          window.addEventListener('BluetoothStatus.enabled', function() {
            initBeacon();
            setActiveScanner('beacon')
          });
        }
      }
    }
  }

  const onSearchExercises = () => {
    onGoToFilter();
  }

  const initBeacon = () => {
    window.estimote.beacons.startRangingBeaconsInRegion({}, onBeaconsReceived, function(error) {
      if (error !== undefined && typeof error == 'string' && error.indexOf("Insufficient Location Services authorization") > -1) {
        setSnackbarMesssage('LOCATION_NOT_ALLOWED_ERROR');
        handleOpenSnackbar();
      } else {
        setSnackbarMesssage('MSG_REF_UNEXPECTED_ERROR_1');
        handleOpenSnackbar();
      }
      setIsBeaconReceiverOn(false);
      stopBluetoothScanning();
    });
    setIsBeaconReceiverOn(true);
  }

  const stopBluetoothScanning = () => {
    window.estimote.beacons.stopRangingBeaconsInRegion({});
    setIsBeaconReceiverOn(false);
  }

  const onBeaconsReceived = (result) => {
    setIsBeaconReceiverOn(true);
    stopBluetoothScanning();
    const {beacon} = result;
    const index = 0;
    console.log(JSON.stringify(beacon));
    setBeaconId(beacon.major + '' + beacon.minor)
  }

  return (
    <Dashboard
      doLogout={onLogout}
      firstName={first_name}
      lastName={last_name}
      language={language}
      preventLogout={email && email.indexOf('___') > -1}
      photoUrl={photoUrl}
      plans={filterPlans(plans)}
      loading={loading || !data}
      openWorkout={openWorkout}
      openWorkouts={openWorkouts}
      goToSetup={goToSetup}
      onGoToMeasurements={onGoToMeasurements}
      onGoToProtocolls={onGoToProtocolls}
      showBanners={banners ? banners.showBanners : false}
      banners={curateBanners()}
      toggleFilter={() => setFilter(!filter)}
      filter={filter}
      editable={editable}
      hasNorch={hasNorch}

      onScannNfc={onScannNfc}
      onScannQr={onScannQr}
      onScannBeacon={onScannBeacon}
      onSearchExercises={onSearchExercises}

      scannNfcDisable={activeScanner !== '' && activeScanner !== 'nfc'}
      scannQrDisable={activeScanner !== '' && activeScanner !== 'qr'}
      scannBeaconDisable={activeScanner !== '' && activeScanner !== 'beacon'}

      beaconScanning={beaconScanning}
      nfcScanning={nfcScanning}

      snackbar={snackbar}
      snackbarMessage={snackbarMessage}
      handleCloseSnackbar={handleCloseSnackbar}
      modal={modal}
      scanning={scanning}
      showScannButtons={typeof cordova !== 'undefined'}
      openBeaconSearch={openBeaconSearch}
      setOpenBeaconSearch={setOpenBeaconSearch}
      onShowFavorites={onShowFavorites}

      refetch={refetch}
    />
  )
}
export default withApollo(Panel);
