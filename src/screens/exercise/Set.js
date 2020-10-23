import * as React from "react";
import { useTranslate } from '../../hooks/Translation';
import Radio from '@material-ui/core/Radio';

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import Select from '@material-ui/core/Select';
import NumberInputField from './NumberInputField';

import IconButton from '@material-ui/core/IconButton';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';

const weightOtions = (currentValue = 0) => {
  const minValue = (currentValue - 50) < 0 ? 0 : (currentValue - 50);
  const maxValue = minValue + 100;

  const options = [];
  for(var i = minValue; i <= maxValue; i++) {
    options.push(i);
  }
  return options;
};

const trainingOtions = (currentValue = 0) => {
  const minValue = (currentValue - 25) < 0 ? 0 : (currentValue - 25);
  const maxValue = minValue + 50;

  const options = [];
  for(var i = minValue; i <= maxValue; i++) {
    options.push(i);
  }
  return options;
};


const ITEM_HEIGHT = 48;

export default ({set, createProtocoll, deleteProtocoll, onChangeSet, openChronometer}) => {

  const {t, locale} = useTranslate("exercise");

  // Weight management
  const [weightEditModuls, setWeightEditModus] = React.useState(false);
  const toggleWeightEditModus = () => {
    setWeightEditModus(!weightEditModuls);
  }
  const handleWeightChange = (value) => {
    onChangeSet({
      ...set,
      weight: value,
    });
  }

  // Training management
  const [trainingEditModus, setTrainingEditModus] = React.useState(false);
  const toggleTrainingEditModus = () => {
    setTrainingEditModus(!trainingEditModus);
  };
  const handleTrainingChange = (value) => {
    onChangeSet({
      ...set,
      training: value,
    });
  }

  const {index, id, unit, training, weight} = set;
  return (
    <div className={id > 0 ? "set-wrapper set-done" : "set-wrapper"}>
      <div className="set-frame">
        <div className="set-settings" >
          <div className="set-training">
            {!trainingEditModus &&
              <div  onClick={() => !trainingEditModus && toggleTrainingEditModus()}>
                {training} <span>{unit == 0 ? t("rep") : unit == 1 ? t("sec") : t("min")}</span>
              </div>
            }
            {unit > 0 && (
              <IconButton onClick={openChronometer}>
                <AccessAlarmsIcon fontSize="inherit" />
              </IconButton>
            )}
            {trainingEditModus &&
              <NumberInputField
                defaultValue={training}
                value={training}
                min={0}
                onChange={handleTrainingChange}
                onBlur={toggleTrainingEditModus}
                onPressEnter={toggleTrainingEditModus}
                autoFocus={true}
              />
            }
          </div>
          <div className="set-weight" onClick={() => !weightEditModuls && toggleWeightEditModus()}>
            {
              weightEditModuls &&
              <NumberInputField
                defaultValue={weight}
                value={weight}
                min={0}
                decimalSeparator={','}
                onChange={handleWeightChange}
                onBlur={toggleWeightEditModus}
                onPressEnter={toggleWeightEditModus}
                autoFocus={true}
              />
            }
            {
              !weightEditModuls && <>
                {weight} <span>{t("kg")}</span>
              </>
            }
          </div>
        </div>
        <div className="set-execution">
          {id > 0 &&
            <CheckCircleOutlineIcon fontSize="inherit" onClick={() => deleteProtocoll(id)}/>
          }
          {!(id > 0) &&
            <RadioButtonUncheckedIcon fontSize="inherit" onClick={() => {
              console.log("SET onClick");
              console.log(unit);
              createProtocoll(training, unit, weight)
            }}/>
          }
        </div>
      </div>
    </div>
  )
}
