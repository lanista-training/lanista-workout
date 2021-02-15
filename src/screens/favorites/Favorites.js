import * as React from "react";
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useTranslate } from '../../hooks/Translation';
import {Panel,StyledButton} from './styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import LinearProgress from '@material-ui/core/LinearProgress';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { FixedSizeList } from 'react-window';

import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';

import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { FixedSizeList as List } from 'react-window';
import {useWindowDimensions} from '../../hooks';

const Exercises = ({
  onGoBack,
  hasNorch,
  showExercise,
  loading,
  exercises,
  total,
}) => {

  const {t} = useTranslate("favorites");

  React.useEffect(() => window.scrollTo(0, 0), []);

  const renderRow = (props) => {
    const { index, style } = props;
    const exercise = exercises[index];
    return exercise ? (
      <div className="exercise-wrapper" style={{
        ...style,
        top: `${parseFloat(style.top) + PADDING_SIZE}px`
      }} >
        <Card className="plan-exercise" key={'plan-exercise-' + exercise.id} onClick={() => showExercise(exercise.id)} >
          <CardActionArea>
            <CardMedia
              className="exercise-images"
              title="Exercise"
            >
              <div
                className="start-image"
                style={{backgroundImage: "url(" + exercise.start_image + ")"}}
              />
              <div
                className="end-image"
                style={{backgroundImage: "url(" + exercise.end_image + ")"}}
              />
            </CardMedia>
            <CardContent>
              {exercise.name}
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    ) : null;
  }

  let marginTop = hasNorch ? 9 : 7;
  const { height, width } = useWindowDimensions();
  const PADDING_SIZE = marginTop * 16;
  const innerElementType = React.forwardRef(({ style, ...rest }, ref) => (
    <div
      ref={ref}
      style={{
        ...style,
        height: `${parseFloat(style.height) + PADDING_SIZE * 2}px`
      }}
      {...rest}
    />
  ));

  return (
    <Panel paddingTop={PADDING_SIZE} >
      {
        loading &&
        <LinearProgress />
      }
      <div className="header" style={hasNorch ? {paddingTop: "30px"} : {}}>
        <div className="title">
          {t("exercises")}
          <div className="total">
            {total}
          </div>
        </div>
      </div>
      {!loading && exercises && exercises.length == 0 &&
        <div className="content-wrapper" style={{marginTop: marginTop + "em"}}>
          <div >
            <div className="empty-list-text">{t("empty_list")}</div>
          </div>
        </div>
      }
      {!loading && exercises.length > 0 &&
        <FixedSizeList
          height={height - marginTop + 16}
          itemSize={270}
          itemCount={20000}
          innerElementType={innerElementType}
          className="virtual-list-wrapper"
        >
          {renderRow}
        </FixedSizeList>
      }

      <StyledButton color="primary" onClick={onGoBack}>
        <ArrowBackIosIcon style={{marginLeft: '0.4em'}}/>
      </StyledButton>
    </Panel>
  )
};

Exercises.propTypes = {
  /**
   * Function to translate content
  */
  onGoBack: PropTypes.func,

  /**
   * Function to translate content
  */
  hasNorch: PropTypes.bool,

  /**
   * Function to translate content
  */
  showExercise: PropTypes.func,

  /**
   * Function to translate content
  */
  loading: PropTypes.bool,

  /**
   * Function to translate content
  */
  exercises: PropTypes.array,

  /**
   * Function to translate content
  */
  total: PropTypes.number,

  /**
   * Function to translate content
  */
  muscles: PropTypes.array,

  /**
   * Function to translate content
  */
  types: PropTypes.array,

  /**
   * Function to translate content
  */
  additions: PropTypes.array,

  /**
   * Function to translate content
  */
  text: PropTypes.string,

  /**
   * Function to translate content
  */
  onMuscleSelection: PropTypes.func,

  /**
   * Function to translate content
  */
  onTypeSelection: PropTypes.func,

  /**
   * Function to translate content
  */
  onAdditionSelection: PropTypes.func,

  /**
   * Function to translate content
  */
  resetText: PropTypes.func,
}

export default Exercises;
