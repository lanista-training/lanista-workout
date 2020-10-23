import React, { useState } from 'react';
import {Chronometer} from './styles';
import Draggable from 'react-draggable';
import LanistaButton from '../LanistaButton';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { useStopwatch } from "../../hooks/useStopwatch";

// Hook
function useWindowSize() {
  const [windowSize, setWindowSize] = React.useState({
    width: undefined,
    height: undefined,
  });
  React.useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

const leftPad = (width, n) => {
  if ((n + '').length > width) {
	  return n;
  }
  const padding = new Array(width).join('0');
  return (padding + n).slice(-width);
};

const TimeElapsed = ({timeElapsed}) => {

  const getUnits = () => {
    const seconds = timeElapsed;
    return {
      min: Math.floor(seconds / 60).toString(),
      sec: Math.floor(seconds % 60).toString(),
      msec: (seconds % 10).toFixed(2).substring(2)
    };
  };

  const units = getUnits();

  return (
    <div className={"display-numbers"}>
      <span>{leftPad(2, units.min)}:</span>
      <span>{leftPad(2, units.sec)}:</span>
      <span>{units.msec}</span>
    </div>
  );

}

export default ({onClose}) => {

  const size = useWindowSize();

  const {
    laps,
    addLap,
    isRunning,
    elapsedTime,
    startTimer,
    stopTimer,
    resetTimer,
    defaultPosition,
  } = useStopwatch();

  return (
    <Draggable
      handle=".dragable-area"
      defaultPosition={{x: 20, y: 116}}
      bounds={{left: 0, top: 0, right: size.width-322, bottom: 500}}
    >
      <Chronometer>
        <div className="panel-wrapper">
          <IconButton aria-label="close" size="large" onClick={onClose}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
          <div className="dragable-area">
            <TimeElapsed timeElapsed={elapsedTime}/>
          </div>
          <div className="buttons">
            {!isRunning && <LanistaButton onClick={startTimer}>START</LanistaButton>}
            {isRunning && <LanistaButton onClick={stopTimer}>STOP</LanistaButton>}
            <LanistaButton onClick={resetTimer}>RESET</LanistaButton>
          </div>
        </div>
      </Chronometer>
    </Draggable>
  )

}
