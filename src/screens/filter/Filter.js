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

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AddIcon from '@material-ui/icons/Add';

import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';

import MuscleFilter from '../../components/BodyPartsSelector';

import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={0}>{children}</Box>
    </Typography>
  );
}

export default ({
  onGoBack,
  hasNorch,

  muscles,
  onMuscleSelection,

  types,
  onTypeSelection,

  additions,
  onAdditionSelection,

  showExercises,

  total,

  text,
  onTextChange,
  resetText,
}) => {

  const {t} = useTranslate("filter");

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const selectedMuscles = [];
  _.forOwn(muscles, function(value, key) {
    if(value == true) {
      selectedMuscles.push(<Chip
        label={t(key)}
        onDelete={() => onMuscleSelection(key)}
        color="secondary"
        variant="outlined"
      />)
    }
  })

  const typeFilters = [];
  const selectedTypes = [];
  _.forOwn(types, function(value, key) {
    if(key == '__typename') return;
    if(value == true) {
      selectedTypes.push(<Chip
        label={t(key)}
        onDelete={() => onTypeSelection(key)}
        color="secondary"
        variant="outlined"
      />)
    } else {
      typeFilters.push(<div className="filter" key={key}>
        {t(key)}
      </div>)
    }
  })

  const additionFilters = [];
  const selectedAdditions = [];
  _.forOwn(additions, function(value, key) {
    if(key == '__typename') return;
    if(value == true) {
      selectedAdditions.push(<Chip
        label={t(key)}
        onDelete={() => onAdditionSelection(key)}
        color="secondary"
        variant="outlined"
      />)
    } else {
      additionFilters.push(<div clasName="filter" key={key}>
        {t(key)}
      </div>)
    }
  })

  const selectedText = []
  if(text && text.length > 0) {
    selectedText.push(<Chip
      onDelete={() => resetText()}
      label={text}
      color="secondary"
      variant="outlined"
    />)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {  showExercises(); }, 1000);
  }

  return (
    <Panel >
      <div className="header" style={hasNorch ? {paddingTop: "30px"} : {}}>
        <div className="title">
          {t("exercises")}
          <Button
            variant="outlined"
            endIcon={<ChevronRightIcon />}
            size="small"
            onClick={showExercises}
          >
            {total}
          </Button>
        </div>
        <div className="current-filters">
          {selectedMuscles}
          {selectedTypes}
          {selectedAdditions}
          {selectedText}
        </div>
      </div>
      <div className="content-wrapper" style={{marginTop: hasNorch ? '7em' : ''}}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label={t("body_search")} {...a11yProps(0)} />
          <Tab label={t("type_search")} {...a11yProps(1)} />
          <Tab label={t("tools_search")} {...a11yProps(2)} />
          <Tab label={t("text_search")} {...a11yProps(3)} />
        </Tabs>
        <TabPanel key="tab-1" className="tab-panel" value={value} index={0} >
          <MuscleFilter
            filter={muscles}
            onSelection={onMuscleSelection}
          />
        </TabPanel>
        <TabPanel key="tab-2" className="tab-panel" value={value} index={1} >
          <div className="filters-list">
            {typeFilters.map((filter) =>
              <ListItem key={'filter-type-' + filter.key} button onClick={() => onTypeSelection(filter.key)}>
                <div className="filter-lable">{filter}</div>
                <AddIcon/>
              </ListItem>
            )}
          </div>
        </TabPanel>
        <TabPanel key="tab-3" className="tab-panel" value={value} index={2} >
          <div className="filters-list">
            {additionFilters.map((filter) =>
              <ListItem key={'filter-type-' + filter.key} button onClick={() => onAdditionSelection(filter.key)}>
                <div className="filter-lable">{filter}</div>
                <AddIcon/>
              </ListItem>
            )}
          </div>
        </TabPanel>
        <TabPanel key="tab-4" className="tab-panel" value={value} index={3} >
          <div class="search-field">
            <Paper component="form" onSubmit={onSubmit}>
              <InputBase
                placeholder={t("search_exercises")}
                inputProps={{ 'aria-label': 'searc lanista exercises' }}
                value={text}
                onChange={onTextChange}
              />
              <IconButton type="submit" aria-label="search" onClick={onSubmit}>
                <SearchIcon />
              </IconButton>
            </Paper>
            <div className="text-search-hints">
              {text.length < 3 && t("min_3_characters")}
              {text.length > 2 && total > 0 && t("search_results")} {text.length > 2 && total > 0 && <span>{total}</span>}
              {text.length > 2 && total === 0 && t("no_resuts")}
            </div>
          </div>
        </TabPanel>
      </div>
      <StyledButton color="primary" onClick={onGoBack}>
        <ArrowBackIosIcon style={{marginLeft: '0.4em'}}/>
      </StyledButton>
    </Panel>
  )
};
