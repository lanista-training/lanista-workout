import * as React from "react";
import PropTypes from 'prop-types';
import moment from "moment";
import _ from 'lodash';
import { useTranslate } from '../../hooks/Translation';
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
//
// Theming imports
//
import {ThemeProvider } from 'styled-components';
import defaultTheme from '../../themes/default';
//
//
//
const ProtocollDay = ({executionDay, showExercise, t}) => {
  const [expanded, setExpanded] = React.useState(false);

  const renderProtocolls = (protocolls, t) => {
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
              <div className="training">{protocoll.round} <span>{protocoll.training_unit == 0 ? t("rep") : protocoll.training_unit == 1 ? t("sec") : t("min")}</span></div>
              <div className="weight">{protocoll.weight} <span>{t("kg")}</span></div>
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
        {moment(executionDay.day).format('dd, D. MMMM YYYY')}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {expanded &&
          renderProtocolls(executionDay.protocolls, t)
        }
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

const Protocolls = ({
  protocolls,
  loading,
  error,
  onGoBack,
  showExercise,
  hasNorch,
  primaryColor,
  secondaryColor,
}) => {
  const {t} = useTranslate("protocolls");
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
      <Panel >
        {
          loading &&
          <LinearProgress />
        }
        <div className="header" style={hasNorch ? {paddingTop: "30px"} : {}}>
          <div className="title">
            {t("protocolls")}
          </div>
        </div>
        <div className="content-wrapper" style={{marginTop: hasNorch ? '7em' : ''}}>
          <div className="list-wrapper">
            { !loading && protocolls && protocolls.length == 0 &&
              <div className="empty-list-text">{t("empty_list")}</div>
            }
            <div>
            {
              !loading &&
              protocolls.map( executionDay => (
                <ProtocollDay
                  key={'protocoll-day-' + executionDay.day}
                  executionDay={executionDay}
                  showExercise={showExercise}
                  t={t}
                />
              ))
            }
            </div>
          </div>
        </div>
        <StyledButton color="primary" onClick={onGoBack}>
          <ArrowBackIosIcon style={{marginLeft: '0.4em'}}/>
        </StyledButton>
      </Panel>
    </ThemeProvider>
  )
};

Protocolls.propTypes = {
  /**
   * Function to translate content
  */
  protocolls: PropTypes.array,

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
  onGoBack: PropTypes.func,

  /**
   * Function to translate content
  */
  showExercise: PropTypes.func,

  /**
   * Function to translate content
  */
  hasNorch: PropTypes.bool,
}

export default Protocolls;
