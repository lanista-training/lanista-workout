import * as React from "react";
import {GroupedButtons} from './styles';
import Fab from '@material-ui/core/Fab';

import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import TapAndPlayIcon from '@material-ui/icons/TapAndPlay';
import WifiTetheringIcon from '@material-ui/icons/WifiTethering';
import SearchIcon from '@material-ui/icons/Search';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import { motion } from "framer-motion";

export default ({
  showScannButtons,
  onScannQr,
  onScannNfc,
  onScannBeacon,
  onSearchExercises,
  scannNfcDisable,
  scannQrDisable,
  scannBeaconDisable,

  beaconScanning,
  nfcScanning,
}) => {

  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => setOpen(!open);

  return (
    <GroupedButtons>
      <div className="group-section">
        {open && showScannButtons &&
          <motion.div animate={{ width: 56 }} initial={{ width: 0 }} >
            <Fab onClick={onScannQr} disabled={scannQrDisable}>
              <PhotoCameraIcon />
            </Fab>
          </motion.div>
        }
        {open && showScannButtons && nfcScanning &&
          <motion.div animate={{ width: 56 }} initial={{ width: 0 }} >
            <Fab onClick={onScannNfc} disabled={scannNfcDisable}>
              <TapAndPlayIcon />
            </Fab>
          </motion.div>
        }
        {open && showScannButtons && beaconScanning &&
          <motion.div animate={{ width: 56 }} initial={{ width: 0 }} >
            <Fab onClick={onScannBeacon} disabled={scannBeaconDisable}>
              <WifiTetheringIcon />
            </Fab>
          </motion.div>
        }
        {open &&
          <motion.div animate={{ width: 56 }} initial={{ width: 0 }} >
            <Fab onClick={onSearchExercises}>
              <AccessibilityNewIcon />
            </Fab>
          </motion.div>
        }
        <Fab onClick={showScannButtons ? toggleOpen : onSearchExercises}>
          {!open && <SearchIcon />}
          {open && <HighlightOffIcon />}
        </Fab>
      </div>
      <div className="group-border"/>
    </GroupedButtons>
  )
};
