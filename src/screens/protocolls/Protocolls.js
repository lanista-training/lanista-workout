import * as React from "react";
import moment from "moment";
import { Panel, StyledButton } from './styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinearProgress from '@material-ui/core/LinearProgress';

const ProtocollDay = ({executionDay, showExercise}) => {
  const [expanded, setExpanded] = React.useState(false);

  const renderProtocolls = (protocolls) => {
    const curatedProtocolls = _.mapValues(_.groupBy(protocolls, 'exercise_id'), clist => clist.map(workout => _.omit(workout, 'exercise_id')))
    const protocollsArray = _.map(curatedProtocolls, (protocolls, exerciseId) => ({
      exerciseId: exerciseId,
      protocolls: protocolls,
    }))
    console.log(protocollsArray)
    const result = _.map(curatedProtocolls, (protocolls, exerciseId) => (
      <div className="protocoll-exercise" key={"protocoll-day-" + exerciseId} onClick={() => showExercise(exerciseId)}>
        <div className="protocolls">
          {protocolls.map(protocoll => (
            <div className="protocoll" key={"protocoll-" + protocoll.id}>
              <div className="training">{protocoll.training} <span>{protocoll.training_unit == 0 ? 'Wdh' : protocoll.training_unit == 1 ? 'min' : 'sek'}</span></div>
              <div className="weight">{protocoll.weight} <span>Kg</span></div>
            </div>
          ))}
        </div>
        <div className="images">
          <div className="start-image" style={{backgroundImage: 'url(' + protocolls[0].start_image + ')'}}/>
          <div className="end-image" style={{backgroundImage: 'url(' + protocolls[0].end_image + ')'}}/>
        </div>
      </div>
    ))
    return result
  }


  return (
    <ExpansionPanel onChange={() => {
      setExpanded(!expanded)
    }}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        {moment(executionDay.day).format('D. MMMM YYYY')}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {expanded &&
          renderProtocolls(executionDay.protocolls)
        }
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default ({protocolls, loading, error, onGoBack, showExercise}) => {
  return (
    <Panel>
      <div className="header">
        <div className="title">
          Übungstagebuch
        </div>
        {
          loading &&
          <LinearProgress />
        }
      </div>
      <div className="list-wrapper">
        { !loading && protocolls && protocolls.length == 0 &&
          <div className="empty-list-text">Keine Übungsprotokolle bis jetzt erstellt.</div>
        }
        <div>
        {
          !loading &&
          protocolls.map( executionDay => (
            <ProtocollDay key={'protocoll-day-' + executionDay.day} executionDay={executionDay} showExercise={showExercise}/>
          ))
        }
        </div>
      </div>
      <StyledButton color="primary" onClick={onGoBack}>
        <ArrowBackIosIcon style={{marginLeft: '0.4em'}}/>
      </StyledButton>
    </Panel>
  )
};
