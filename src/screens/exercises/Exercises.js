import * as React from "react";
import { useTranslate } from '../../hooks/Translation';
import {Panel,StyledButton} from './styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import LinearProgress from '@material-ui/core/LinearProgress';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

export default ({
  onGoBack,
  hasNorch,
  showExercise,
  loading,
  exercises,
}) => {
  const {t} = useTranslate("exercises");
  return (
    <Panel >
      {
        loading &&
        <LinearProgress />
      }
      <div className="header" style={hasNorch ? {paddingTop: "30px"} : {}}>
        <div className="title">
          {t("exercises")}
        </div>
      </div>
      <div className="content-wrapper" style={{marginTop: hasNorch ? '7em' : ''}}>
        <div className="list-wrapper">
          { !loading && exercises && exercises.length == 0 &&
            <div className="empty-list-text">{t("empty_list")}</div>
          }
          <div>
          {
            !loading &&
            exercises.map( exercise => (
              <Card className="plan-exercise" key={'plan-exercise-' + exercise.id} onClick={() => showExercise(exercise.id)}>
                <CardActionArea>
                  <CardMedia
                    className="exercise-images"
                    title="Contemplative Reptile"
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
            ))
          }
          </div>
        </div>
      </div>
      <StyledButton color="primary" onClick={onGoBack}>
        <ArrowBackIosIcon style={{marginLeft: '0.4em'}}/>
      </StyledButton>
    </Panel>
  )
};
