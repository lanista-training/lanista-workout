import * as React from "react";
import PropTypes from 'prop-types';
import moment from "moment";
import { useTranslate } from '../../hooks/Translation';
import {Panel, StyledButton} from './styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import SyncIcon from '@material-ui/icons/Sync';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const Setup = ({
  firstName,
  lastName,
  email,
  birthday,
  gender,
  language,
  gyms,
  error,
  loading,
  onGoBack,
  onSaveData,
  linkGym,
  unlinkGym,
  goToGymsearch,
  hasNorch,
  connectionRequests,
  acceptRequest,
  rejectRequest,
  checkForInvitations,
  version,
}) => {

  const [firstNameInput, setFirstNameInput] = React.useState(firstName);
  const [lastNameInput, setLastNameInput] = React.useState(lastName);
  const [emailInput, setEmailInput] = React.useState(email);
  const [birthdayInput, setBirthdayInput] = React.useState(birthday);
  const [genderInput, setGenderInput] = React.useState(gender);
  const [languageInput, setLanguageInput] = React.useState(language);
  const inputLabel = React.useRef(null);
  const inputLabel2 = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [dataChanged, setDataChanged] = React.useState(false);
  const {t} = useTranslate("settings");
  const goToSupoort = () => {
    if( typeof window.cordova !== 'undefined' ) {
      let win = window.cordova.InAppBrowser.open('https://lanista-training.com/customer-support.html', '_blank', 'location=yes');
      win.focus();
    } else {
      let win = window.open('https://lanista-training.com/customer-support.html', '_blank', 'location=yes');
      win.focus();
    }
  };

  const [connectedDialogOpen, setConnectedDialogOpen] = React.useState(false);
  const [selectedRequest, setSelectedRequest] = React.useState(null);
  const handleConnectedDialogClose = () => {
    setConnectedDialogOpen(false);
  };

  React.useEffect(() => {
    setFirstNameInput(firstName)
    setLastNameInput(lastName)
    setEmailInput(email)
    setBirthdayInput(birthday)
    setGenderInput(gender)
    setLanguageInput(language)
  }, [firstName, lastName, email, birthday, gender, language])
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
    setTimeout(() => window.scrollTo(0, 0), 100)
  }, []);
  React.useEffect(() => {
    if(
      firstNameInput != firstName ||
      lastNameInput != lastName ||
      emailInput != email ||
      !birthday || !birthdayInput || birthdayInput.getTime() !== birthday.getTime() ||
      genderInput != gender ||
      languageInput != language
    )
      setDataChanged(true)
    else
      setDataChanged(false)
  }, [firstNameInput, lastNameInput, emailInput, birthdayInput, genderInput, languageInput]);
  const [selectedGym, setSelectedGym] = React.useState(0);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  return (
    <Panel>
      <div className="content-wrapper" style={{marginTop: hasNorch ? "110px" : "80px"}}>
        <div className="content">
          <div className="form-section">
            <TextField
              label={t('first_name')}
              margin="normal"
              variant="outlined"
              value={firstNameInput}
              onChange={event => setFirstNameInput(event.target.value)}
              fullWidth
            />
            <TextField
              label={t('last_name')}
              margin="normal"
              variant="outlined"
              value={lastNameInput}
              onChange={event => setLastNameInput(event.target.value)}
              fullWidth
            />
            <TextField
              label={t('email')}
              margin="normal"
              variant="outlined"
              value={emailInput}
              disabled={true}
              onChange={event => setEmailInput(event.target.value)}
              fullWidth
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label={t('birthday')}
                value={birthdayInput}
                onChange={(date) => setBirthdayInput(date)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                className="date-picker"
              />
            </MuiPickersUtilsProvider>
            <FormControl variant="outlined" className="gender-field">
              <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                {t('gender')}
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                defaultValue={genderInput}
                onChange={event => {
                  setGenderInput(event.target.value);
                }}
                labelWidth={labelWidth}
              >
                <MenuItem value="">
                  <em></em>
                </MenuItem>
                <MenuItem value={1}>{t("male")}</MenuItem>
                <MenuItem value={0}>{t("female")}</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" className="gender-field">
              <InputLabel ref={inputLabel2} id="demo-simple-select-outlined-label">
                {t('language')}
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                defaultValue={languageInput}
                onChange={event => {
                  setLanguageInput(event.target.value);
                }}
                labelWidth={labelWidth}
              >
                <MenuItem value={'DE'}>{"Deutsch"}</MenuItem>
                <MenuItem value={'EN'}>{"English"}</MenuItem>
                <MenuItem value={'ES'}>{"Español"}</MenuItem>
                <MenuItem value={'FR'}>{"Français"}</MenuItem>
                <MenuItem value={'PT'}>{"Português"}</MenuItem>
                <MenuItem value={'RU'}>{"Pусский"}</MenuItem>
              </Select>
            </FormControl>
            <Button
              className="logout-button"
              variant="contained"
              color="secondary"
              startIcon={<Icon>exit_to_app</Icon>}
              disabled={!dataChanged}
              onClick={() => {
                onSaveData(firstNameInput, lastNameInput, emailInput, birthdayInput, genderInput, languageInput)
              }}
            >
              {t('save')}
            </Button>
          </div>


          <div className="setup-section">
            <div className="setup-title">
              {t('your_gym_trainer')}
            </div>
            <div className="gyms-list-wrapper">
              <GridList>
                {gyms && gyms.map(gym => (
                  <div className="gym-item" key={gym.name}>
                    <GridListTile>
                      <div className="gym-image" style={{backgroundImage: "url(" + gym.imageUrl + ")"}}/>
                      <div className="gym-name">{gym.name}</div>
                      <Button variant="contained" color="primary" onClick={() => {
                        setSelectedGym(gym.id)
                        setDialogOpen(true)
                      }}>
                        {t('disconnect')}
                      </Button>
                    </GridListTile>
                  </div>
                ))}
              </GridList>
              <Button
                className="logout-button"
                variant="contained"
                color="secondary"
                endIcon={<Icon>search</Icon>}
                onClick={goToGymsearch}
              >
                {t('search')}
              </Button>
            </div>
          </div>


          <div className="setup-section">
            <div className="setup-title">
              {t('invitations')}
            </div>
            <div className="invitations-list">
              {connectionRequests && connectionRequests.map(request => (
                <Card className="invitations-root">
                  <div className="invitations-details">
                    <CardContent className="invitations-content">
                      <Typography component="h6" variant="h6">
                        {request.from.first_name + ' ' + request.from.last_name}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {t("invitation_message")}
                      </Typography>
                    </CardContent>
                    <div className="invitations-controls">
                      <Button
                        variant="contained"
                        size="small"
                        disableElevation
                        onClick={() => {
                          setSelectedRequest(request.id);
                          setConnectedDialogOpen(true);
                        }}
                      >
                        {t("invitation_connect")}
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        disableElevation
                        style={{ marginLeft: "2em" }}
                        onClick={() => rejectRequest(request.id)}
                      >
                        {t("invitation_refuse")}
                      </Button>
                    </div>
                  </div>
                  <CardMedia
                    className="invitations-cover"
                    image={request.from.photoUrl}
                    title={request.from.first_name + ' ' + request.from.last_name}
                  />
                </Card>
              ))}
            </div>
            <Button
              className="logout-button"
              variant="contained"
              color="secondary"
              endIcon={<SyncIcon/>}
              onClick={checkForInvitations}
            >
              {t('check_for_invitations')}
            </Button>
          </div>


          <Button
            className="logout-button"
            variant="contained"
            color="secondary"
            endIcon={<ContactSupportIcon/>}
            onClick={goToSupoort}
            style={{marginTop: "4em"}}
          >
            {t('support')}
          </Button>

          <div className="version-section">
            Version {version}
          </div>
        </div>
      </div>
      <div className="header" style={{paddingTop: hasNorch ? "30px" : ""}}>
        <div className="header-inner-frame">
          <div className="title">
            {t('your_data')}
          </div>
        </div>
      </div>

      {connectedDialogOpen &&
        <Dialog
          open={connectedDialogOpen}
          onClose={handleConnectedDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Verbinden</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t('connect_hint')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConnectedDialogClose} color="primary" autoFocus>
              {t('back')}
            </Button>
            <Button onClick={() => {
              acceptRequest(selectedRequest);
              handleConnectedDialogClose();
              setSelectedRequest(null);
            }} color="primary" autoFocus>
              {t("connect")}
            </Button>
          </DialogActions>
        </Dialog>
      }

      {dialogOpen &&
        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{t("cut_connection")}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t("cut_connection_text")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary" autoFocus>
              {t("back")}
            </Button>
            <Button onClick={() => {
              unlinkGym(selectedGym);
              handleDialogClose();
            }} color="primary" autoFocus>
              {t("disconnect")}
            </Button>
          </DialogActions>
        </Dialog>
      }

      <StyledButton color="primary" onClick={onGoBack}>
        <ArrowBackIosIcon style={{marginLeft: '0.4em'}}/>
      </StyledButton>

    </Panel>
  )
};

Setup.propTypes = {
  /**
   * Function to translate content
  */
  firstName: PropTypes.string,

  /**
   * Function to translate content
  */
  lastName: PropTypes.string,

  /**
   * Function to translate content
  */
  email: PropTypes.string,

  /**
   * Function to translate content
  */
  birthday: PropTypes.string,

  /**
   * Function to translate content
  */
  gender: PropTypes.number,

  /**
   * Function to translate content
  */
  language: PropTypes.string,

  /**
   * Function to translate content
  */
  gyms: PropTypes.array,

  /**
   * Function to translate content
  */
  error: PropTypes.object,

  /**
   * Function to translate content
  */
  loading: PropTypes.string,

  /**
   * Function to translate content
  */
  onGoBack: PropTypes.func,

  /**
   * Function to translate content
  */
  onSaveData: PropTypes.func,

  /**
   * Function to translate content
  */
  linkGym: PropTypes.func,

  /**
   * Function to translate content
  */
  unlinkGym: PropTypes.func,

  /**
   * Function to translate content
  */
  goToGymsearch: PropTypes.func,

  /**
   * Function to translate content
  */
  hasNorch: PropTypes.bool,

  /**
   * Function to translate content
  */
  connectionRequests: PropTypes.array,

  /**
   * Function to translate content
  */
  acceptRequest: PropTypes.func,

  /**
   * Function to translate content
  */
  rejectRequest: PropTypes.func,

  /**
   * Function to translate content
  */
  checkForInvitations: PropTypes.func,

  /**
   * Function to translate content
  */
  version: PropTypes.string,
}

export default Setup;
