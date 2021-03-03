import * as React from "react";
import PropTypes from 'prop-types';
import moment from "moment";
import { useTranslate } from '../../hooks/Translation';
import {Panel, StyledButton, StyledCaliper, StyledSwipeableDrawer} from './styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SquareFootIcon from '@material-ui/icons/SquareFoot';
import StraightenIcon from '@material-ui/icons/Straighten';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Slider from "react-slick";
import {LineChart, Line, YAxis, ResponsiveContainer} from 'recharts';
//
// Theming imports
//
import {ThemeProvider } from 'styled-components';
import defaultTheme from '../../themes/default';
//
//
//
const settings = {
  dots: false,
  arrows: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true
};

const CustomizedLabel = ({x, y, stroke, value}) => {
  return <text x={x} y={y-10} dy={-4} fill="white" fontSize={15} textAnchor="middle">{value}</text>;
}

const renderCaliper = (record, t) => {
  console.log("renderCaliper", record);
  const { abs, auxiliar, chest, quads, scapula, sprailium, trizeps, body_fat, record_date} = record ? record : {};
  return (
    <StyledCaliper>
      <div className="header-section">{t("day_of_measure")} {moment(new Date(record_date)).format('DD MMMM YYYY')}</div>
      <div className="records-section">
        <div className="record-entry">{t("abs")}<div></div>{abs} mm</div>
        <div className="record-entry">{t("auxiliar")}<div></div>{auxiliar} mm</div>
        <div className="record-entry">{t("chest")}<div></div>{chest} mm</div>
        <div className="record-entry">{t("quads")}<div></div>{quads} mm</div>
        <div className="record-entry">{t("scapula")}<div></div>{scapula} mm</div>
        <div className="record-entry">{t("sprailium")}<div></div>{sprailium} mm</div>
        <div className="record-entry">{t("triceps")}<div></div>{trizeps} mm</div>
      </div>
      <div className="caliper-total">
        <div className="record-entry">{t("caliper")}<div></div>{body_fat}%</div>
      </div>
    </StyledCaliper>
  )
}

const renderWeightGraph = (records, t) => {
  const available = records && records.length > 0
  return(
    <>
      {available ?
        <ResponsiveContainer>
          <LineChart
            data={(records.length > 7 ? records.slice(records.length-7, records.length) :records).map(record => ({
              name: record.record_date,
              weight: record.value,
            }))}
            margin={{
              top: 50, right: 20, left: 0, bottom: 50,
            }}
          >
            <YAxis domain={['dataMin', 'dataMax']} hide={true}/>
            <Line type="monotone" dataKey="weight" stroke="white" strokeWidth={2} connectNulls label={<CustomizedLabel />}/>
          </LineChart>
        </ResponsiveContainer>
        :
        (<div className="no-data">{t("no_data_available")}</div>)}
    </>
  )
}

const renderCalipersGraph = (records, t) => {
  const available = records && records.length > 0
  return(
    <>
      {available ?
        <ResponsiveContainer>
          <LineChart
            data={(records.length > 7 ? records.slice(records.length-7, records.length) : records).map(record => ({
              name: record.record_date,
              body_fat: record.body_fat,
            }))}
            margin={{
              top: 50, right: 20, left: 0, bottom: 50,
            }}
          >
            <YAxis domain={['dataMin', 'dataMax']} hide={true}/>
            <Line type="monotone" dataKey="body_fat" stroke="white" strokeWidth={2} connectNulls label={<CustomizedLabel />}/>
          </LineChart>
        </ResponsiveContainer>
        :
        (<div className="no-data">{t("no_data_available")}</div>)}
    </>
  )
}

const renderVolumensGraph = (records, t) => {
  const available = records && records.length > 0
  return(
    <>
      {available ?
        <ResponsiveContainer>
          <LineChart
            data={(records.length > 7 ? records.slice(records.length-7, records.length) : records).map(record => ({
              name: record.record_date,
              sum: record.sum,
            }))}
            margin={{
              top: 50, right: 20, left: 0, bottom: 50,
            }}
          >
            <YAxis domain={['dataMin', 'dataMax']} hide={true}/>
            <Line type="monotone" dataKey="sum" stroke="white" strokeWidth={2} connectNulls label={<CustomizedLabel />}/>
          </LineChart>
        </ResponsiveContainer>
        :
        (<div className="no-data">{t("no_data_available")}</div>)}
    </>
  )
}

const renderVolume = (record, t) => {
  console.log("renderCaliper", record);
  const { arm_left, arm_right, chest, quads_left, quads_right, spina_ilica_ant, umbilical, waist, wide_hips, sum, record_date} = record ? record : {};
  return (
    <StyledCaliper>
      <div className="header-section">{t("day_of_measure")} {moment(new Date(record_date)).format('DD MMMM YYYY')}</div>
      <div className="records-section">
        <div className="record-entry">{t("arm_left")}<div></div>{arm_left} mm</div>
        <div className="record-entry">{t("arm_right")}<div></div>{arm_right} mm</div>
        <div className="record-entry">{t("chest")}<div></div>{chest} mm</div>
        <div className="record-entry">{t("quads_left")}<div></div>{quads_left} mm</div>
        <div className="record-entry">{t("quads_right")}<div></div>{quads_right} mm</div>
        <div className="record-entry">{t("spina_ilica_ant")}<div></div>{spina_ilica_ant} mm</div>
        <div className="record-entry">{t("umbilical")}<div></div>{umbilical} mm</div>
        <div className="record-entry">{t("waist")}<div></div>{waist} mm</div>
        <div className="record-entry">{t("wide_hips")}<div></div>{wide_hips} mm</div>
      </div>
      <div className="caliper-total">
        <div className="record-entry">{t("sum")}<div></div>{sum}%</div>
      </div>
    </StyledCaliper>
  )
}

const renderFutrexGraph = (records, t) => {
  const available = records && records.length > 0
  return(
    <>
      {available ?
        <ResponsiveContainer>
          <LineChart
            data={(records.length > 7 ? records.slice(records.length-7, records.length) : records).map(record => ({
              name: record.record_date,
              value: record.value,
            }))}
            margin={{
              top: 50, right: 20, left: 0, bottom: 50,
            }}
          >
            <YAxis domain={['dataMin', 'dataMax']} hide={true}/>
            <Line type="monotone" dataKey="value" stroke="white" strokeWidth={2} connectNulls label={<CustomizedLabel />} />
          </LineChart>
        </ResponsiveContainer>
        :
        (<div className="no-data">{t("no_data_available")}</div>)}
    </>
  )
}


const renderWeightList = (records, showForm, onSelection, selectedRecordId, deleteWeight, t) => {
  const sortedRecords = records.slice(0);
  return(
    <>
      <div className="create-protocoll-button">
        <IconButton aria-label="create weight entry"  size="medium" onClick={showForm}>
          <AddCircleOutlineIcon fontSize="inherit" />
        </IconButton>
      </div>
      {sortedRecords.reverse().map(record => (
        <div
          key={'records-' + record.id}
          onClick={() => {
            onSelection(record)
          }}
          className={selectedRecordId === record.id ? 'list-record selected' : 'list-record'}
        >
          { selectedRecordId==record.id &&
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={() => deleteWeight(record.id)}
            >
              {t("delete")}
            </Button>
          }
          <div className="record-date">{moment(record.record_date).format("DD/MM/YYYY")}</div>
          <div className="record-value">{record.value} {t("kg")}</div>
        </div>
      ))}
      {
        records.length == 0 &&
        <div className="no-records">{t("no_data_available")}</div>
      }
    </>
  )
}

const renderCaliperList = (records, t, onCaliperClick) => {
  const sortedRecords = records.slice(0);
  return(
    <>
      {sortedRecords.reverse().map(record => (
        <div className="list-record" onClick={() => onCaliperClick(record)}>
          <div className="record-date">{moment(record.record_date).format("DD/MM/YYYY")}</div>
          <div className="record-value">{record.body_fat} %</div>
        </div>
      ))}
      {
        records.length == 0 &&
        <div className="no-records">{t("no_data_available")}</div>
      }
    </>
  )
}

const renderVolumensList = (records, t, onVolumeClick) => {
  const sortedRecords = records.slice(0);
  return(
    <>
      {sortedRecords.reverse().map(record => (
        <div className="list-record" onClick={() => onVolumeClick(record)}>
          <div className="record-date">{moment(record.record_date).format("DD/MM/YYYY")}</div>
          <div className="record-value">{record.sum} mm</div>
        </div>
      ))}
      {
        records.length == 0 &&
        <div className="no-records">{t("no_measures_available")}</div>
      }
    </>
  )
}

const renderFutrexList = (records, t) => {
  const sortedRecords = records.slice(0);
  return(
    <>
      {sortedRecords.reverse().map(record => (
        <div className="list-record">
          <div className="record-date">{moment(record.record_date).format("DD/MM/YYYY")}</div>
          <div className="record-value">{record.value} %</div>
        </div>
      ))}
      {
        records.length == 0 &&
        <div className="no-records">{t("no_measures_available")}</div>
      }
    </>
  )
}

const Measurements = ({
  weights,
  calipers,
  valumens,
  futrex,
  loading,
  error,
  onGoBack,
  saveWeight,
  saveWeightLoading,
  saveWeightError,
  deleteWeight,
  deleteWeightLoading,
  deleteWeightError,
  hasNorch,

  primaryColor,
  secondaryColor,
}) => {

  const {t} = useTranslate("measures");
  const[currentSlide, setCurrentSlide] = React.useState(0)
  const[showForm, setShowForm] = React.useState(0)
  const[message, setMessage] = React.useState(null)
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [weight, setWeight] = React.useState(0.0);
  const [selectedWeight, setSelectedWeight] = React.useState(0);

  const [drawlerOpen, setDrawlerOpen] = React.useState(false);
  const toggleDrawer = () => {console.log("mark"); setDrawlerOpen(!drawlerOpen);};
  React.useEffect(() => {
    if( !drawlerOpen ) {
      setSelectedVolume(null);
      setSelectedCaliper(null);
    }
  }, [drawlerOpen])

  React.useEffect(() => {
    console.log("ERROR")
    if( saveWeightError && saveWeightError.message.indexOf("ACCESSDENIED") > -1 ) {
      setMessage(t("change_access_denied"))
    }
    if( deleteWeightError && deleteWeightError.message.indexOf("ACCESSDENIED") > -1 ) {
      setMessage(t("delete_access_denied"))
    }
  }, [saveWeightError, deleteWeightError]);

  const showMessage = (message) => {
    setMessage(message)
  }
  const onCloseMessage = () => {
    setMessage(null)
  }


  const [selectedCaliper, setSelectedCaliper] = React.useState(null);
  const onCaliperClick = (caliper) => {
    setSelectedCaliper(caliper);
    toggleDrawer();
  }

  const [selectedVolume, setSelectedVolume] = React.useState(null);
  const onVolumeClick = (volume) => {
    setSelectedVolume(volume);
    toggleDrawer();
  }

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
      <Panel>
        <div className="user-info header" style={{paddingTop: hasNorch ? '30px' : ''}}>
          <div className="header-inner-frame">
            <div className="title">
              {t("measures")}
            </div>
          </div>
        </div>
        <div className="graphics-section">
          <Slider {...settings}
            beforeChange={(current, next) => {
              setCurrentSlide(next)
            }}
          >
            <div key={'graphic-weight'} className="graphic-wrapper">
              <div className="graphic graphic-weight" onClick={() => {
                console.log("MARK 1")
              }}>
                <div className="graphic-header">
                  <div className="text-section">
                    <div className="last-value">{weights && weights.length > 0 ? weights[weights.length-1].value : 0} {t("kg")}</div>
                    <div className="graphic-title">{t("weight")}</div>
                  </div>
                  <div className="icon-section"/>
                </div>
                {renderWeightGraph(weights, t)}
              </div>
            </div>
            <div key={'graphic-caliper'} className="graphic-wrapper">
              <div className="graphic graphic-caliper" onClick={() => {
                console.log("MARK 2")
              }}>
                <div className="graphic-header">
                  <div className="text-section">
                    <div className="last-value">{calipers && calipers.length > 0 ? calipers[calipers.length-1].body_fat : 0} %</div>
                    <div className="graphic-title">{t("caliper")}</div>
                  </div>
                  <SquareFootIcon/>
                </div>
                {renderCalipersGraph(calipers, t)}
              </div>
            </div>
            <div key={'graphic-volume'} className="graphic-wrapper">
              <div className="graphic graphic-volume" onClick={() => {
                console.log("MARK 3")
              }}>
                <div className="graphic-header">
                  <div className="text-section">
                    <div className="last-value">{valumens && valumens.length > 0 ? [valumens.length-1].sum : 0} mm</div>
                    <div className="graphic-title">{t("volumens")}</div>
                  </div>
                  <StraightenIcon/>
                </div>
                {renderVolumensGraph(valumens, t)}
              </div>
            </div>
            <div key={'graphic-futrex'} className="graphic-wrapper">
              <div className="graphic graphic-futrex" onClick={() => {
                console.log("MARK 4")
              }}>
                <div className="graphic-header">
                  <div className="text-section">
                    <div className="last-value">{futrex && futrex.length > 0 ? futrex[futrex.length-1].value : 0} %</div>
                    <div className="graphic-title">{t("body_fat_digital")}</div>
                  </div>
                  <TouchAppIcon/>
                </div>
                {renderFutrexGraph(futrex, t)}
              </div>
            </div>
          </Slider>
        </div>
        <div className="data-section">
          <div className="list-wrapper">
          { currentSlide == 0 && renderWeightList(weights, () => setShowForm(true), (record) => {
            setSelectedWeight(record.id == selectedWeight ? 0 : record.id)
          }, selectedWeight, deleteWeight, t)}
          { currentSlide == 1 && renderCaliperList(calipers, t, onCaliperClick) }
          { currentSlide == 2 && renderVolumensList(valumens, t, onVolumeClick) }
          { currentSlide == 3 && renderFutrexList(futrex, t) }
          </div>
        </div>
        <StyledButton color="primary" onClick={onGoBack}>
          <ArrowBackIosIcon style={{marginLeft: '0.4em'}}/>
        </StyledButton>
        <Dialog
          open={showForm}
          onClose={() => setShowForm(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-protocoll-title">{"Gewicht eingeben"}</DialogTitle>
          <DialogContent>
            <>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label={t("day_of_measure")}
                  format="dd/MM/yyyy"
                  value={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  className="protocoll-date"
                  style={{width: "100%"}}
                />
              </MuiPickersUtilsProvider>
              <div className="input-fields">
                <TextField
                  id="filled-start-adornment"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                  }}
                  variant="outlined"
                  type="number"
                  value={weight}
                  onChange={(event) => setWeight(event.target.value)}
                  style={{width: "100%", marginTop: "1em"}}
                />
              </div>
            </>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowForm(false)} color="primary" autoFocus>
              {t("back")}
            </Button>
            <Button onClick={() => {
              if(weight == 0) {
                setMessage(t("enter_weight"))
              } else {
                saveWeight(weight, selectedDate)
              }
              setShowForm(false)
            }} color="primary" autoFocus>
              {t("save")}
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={message !== null}
          autoHideDuration={6000}
          onClose={onCloseMessage}
        >
          <SnackbarContent
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar">
                <WarningIcon />
                {message}
              </span>
            }
            action={[
              <IconButton key="close" aria-label="close" color="inherit" onClick={onCloseMessage}>
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </Snackbar>

        <StyledSwipeableDrawer
          open={drawlerOpen}
          anchor="bottom"
          onClose={toggleDrawer}
          onOpen={toggleDrawer}
        >
          {drawlerOpen && selectedCaliper && renderCaliper(selectedCaliper, t)}
          {drawlerOpen && selectedVolume && renderVolume(selectedVolume, t)}
        </StyledSwipeableDrawer>

      </Panel>
    </ThemeProvider>
  )
};

Measurements.propTypes = {
  /**
   * Function to translate content
  */
  weights: PropTypes.number,

  /**
   * Function to translate content
  */
  calipers: PropTypes.number,

  /**
   * Function to translate content
  */
  valumens: PropTypes.number,

  /**
   * Function to translate content
  */
  futrex: PropTypes.number,

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
  saveWeight: PropTypes.func,

  /**
   * Function to translate content
  */
  saveWeightLoading: PropTypes.func,

  /**
   * Function to translate content
  */
  saveWeightError: PropTypes.func,

  /**
   * Function to translate content
  */
  deleteWeight: PropTypes.func,

  /**
   * Function to translate content
  */
  deleteWeightLoading: PropTypes.bool,

  /**
   * Function to translate content
  */
  deleteWeightError: PropTypes.object,

  /**
   * Function to translate content
  */
  hasNorch: PropTypes.bool,
}

export default Measurements;
