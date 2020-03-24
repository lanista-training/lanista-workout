import * as React from "react";
import {GroupedButtons} from './styles';
import Fab from '@material-ui/core/Fab';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import TapAndPlayIcon from '@material-ui/icons/TapAndPlay';
import WifiTetheringIcon from '@material-ui/icons/WifiTethering';

export default ({
  onScannQr,
  onScannNfc,
  onScannBeacon,
  scannNfcDisable,
  scannQrDisable,
  scannBeaconDisable
}) => {
  return (
    <GroupedButtons>
      <div className="group-section">
        <Fab onClick={onScannQr} disabled={scannQrDisable}>
          <PhotoCameraIcon />
        </Fab>
        <Fab onClick={onScannNfc} disabled={scannNfcDisable}>
          <TapAndPlayIcon />
        </Fab>
        <Fab onClick={onScannBeacon} disabled={scannBeaconDisable}>
          <WifiTetheringIcon />
        </Fab>
      </div>
      <div className="group-border"/>
    </GroupedButtons>
  )
};
