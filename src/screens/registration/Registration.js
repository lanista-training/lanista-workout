import * as React from "react";
import { useTranslate } from '../../hooks/Translation';
import {Panel, StyledButton, GymSearch, EmailInputField, SendEmail, StyledStepper, StyledSwitch} from './styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import EmailIcon from '@material-ui/icons/Email';
import IconButton from '@material-ui/core/IconButton';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import TermsAndConditions from './TermsAndConditions'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CircularProgress from '@material-ui/core/CircularProgress';

function getSteps(t) {
  return [t("gym_trainer_search"), t("enter_email"), t("confirm_email")];
}

const renderEmailInputField = (
  email,
  onEmailChange,
  handleNext,
  emailIsValid,
  handleBack,
  t
) => {
  return (
    <EmailInputField>
      <div className="content">
        <div className="form-section">
          <Paper component="form">
            <InputBase
              placeholder={t("your_email")}
              inputProps={{ 'aria-label': 'search studio trainer' }}
              value={email}
              onChange={onEmailChange}
            />
            <IconButton type="submit" aria-label="search">
              <EmailIcon />
            </IconButton>
          </Paper>
          <div className="buttons-section">
            <Button
              variant="contained"
              color="primary"
              onClick={handleBack}
              className="email-next-button"
            >
              {t("back")}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={!emailIsValid}
              className="email-next-button"
              style={{marginLeft: '2em'}}
            >
              {t("forward")}
            </Button>
          </div>
        </div>
      </div>
    </EmailInputField>
  )
}

const renderGymSearch = (filter, onFilterChange, gyms, setSelectedGym, handleNext, searchType, toggleSearchType, t) => {
  return (
    <GymSearch>
      <div className="content">
        <div className="form-section">

        <StyledSwitch>
          <div>{t("trainer")}</div>
          <Switch
            checked={searchType}
            onChange={toggleSearchType}
            value={searchType}
          />
          <div>{t("gyms")}</div>
        </StyledSwitch>

        <Paper component="form">
          <InputBase
            placeholder={t("gym_trainer_search")}
            inputProps={{ 'aria-label': 'search studio trainer' }}
            value={filter}
            onChange={onFilterChange}
          />
          <IconButton aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className="search-skip-button"
        >
          {t("skip_search")}
        </Button>
        </div>
        <div className="gyms-list">
          <div className="gyms-list-wrapper">
            <GridList cols={2}>
              {gyms && gyms.length == 0 &&
                <div className="no-data"></div>
              }
              {
                gyms && gyms.map(gym => (
                  <div className="gym-item" key={"gym-" + gym.id}>
                    <GridListTile>
                      <div className="gym-image" style={{backgroundImage: "url(" + gym.imageUrl + ")"}}/>
                      <div className="gym-name">{gym.name}</div>
                      <Button variant="contained" color="primary" onClick={() => {
                        setSelectedGym(gym)
                        handleNext()
                      }}>
                        {t("select")}
                      </Button>
                    </GridListTile>
                  </div>
                  ))
                }
              }
            </GridList>
          </div>
        </div>
      </div>
    </GymSearch>
  )
}

const renderSendEmail = (register, handleBack, email, selectedGym, t, registering) => {
  return (
    <SendEmail>
      <div className="content">
        <div className="form-section">
          <div className="sumary-section">
            <div className="summary-email">{t("email")}: <span>{email}</span></div>
            <div className="summary-email">{t("gym_trainer")}: <span>{selectedGym ? selectedGym.name : t("without_gym_trainer")}</span></div>
          </div>
          <div className="buttons-section">
            <Button
              variant="contained"
              color="primary"
              onClick={handleBack}
            >
              {t("back")}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={register}
              style={{marginLeft: '2em'}}
              disabled={registering}
            >
              {t("create_account")}
            </Button>
            {registering && <CircularProgress size={24} className="circular-progress" />}
          </div>
        </div>
      </div>
    </SendEmail>
  )
}

const renderFinalMessage = (onGoBack, t) => {
  return (
    <SendEmail>
      <div className="content">
        <div className="form-section">
          <Button
            variant="contained"
            color="primary"
            onClick={onGoBack}
          >
            {t("to_login")}
          </Button>
        </div>
      </div>
    </SendEmail>
  )
}

const getStepContent = (step, filter, onFilterChange, gyms, setSelectedGym, handleNext, email, onEmailChange, emailIsValid, register, onGoBack, handleBack, selectedGym, searchType, toggleSearchType, t, registering) => {
  switch (step) {
    case 0:
      return renderGymSearch(filter, onFilterChange, gyms, setSelectedGym, handleNext, searchType, toggleSearchType, t);
    case 1:
      return renderEmailInputField(email, onEmailChange, handleNext, emailIsValid, handleBack, t);
    case 2:
      return renderSendEmail(register, handleBack, email, selectedGym, t, registering);
    case 3:
      return renderFinalMessage(onGoBack, t);
    default:
      return 'Unknown step';
  }
}

export default ({
  loading,
  onGoBack,
  filter,
  onFilterChange,
  gyms,
  setSelectedGym,
  selectedGym,
  email,
  onEmailChange,
  finished,
  emailIsValid,
  register,
  registerError,
  errorMessage,
  searchType,
  toggleSearchType,
  registering,
  hasNorch,
}) => {
  // DIALOG VARIABLES
  const {t} = useTranslate("registration");
  const [openDialog, setOpenDialog] = React.useState(true);
  const handleDialogClickOpen = scrollType => () => {
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (openDialog) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openDialog]);

  const [openMessage, setOpenMessage] = React.useState(false);
  const handleCloseMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenMessage(false);
  };
  React.useEffect(() => {
    if (registerError !== undefined) {
      setOpenMessage(true)
    }
  }, [registerError]);

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  React.useEffect(() => {
    if(finished) handleNext();
  }, [finished]);
  const steps = getSteps(t);

  const isStepOptional = step => {
    return step === 0;
  };

  const isStepSkipped = step => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  return(
    <Panel style={hasNorch ? {paddingTop: "30px"} : {}}>
      <StyledStepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <div className="caption">Optional</div>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </StyledStepper>
      <div className="instructions-navigation-wrapper">
        <div className="instructions-navigation-section">
          <div className="instructions">
            {getStepContent(activeStep, filter, onFilterChange, gyms, setSelectedGym, handleNext, email, onEmailChange, emailIsValid, register, onGoBack, handleBack, selectedGym, searchType, toggleSearchType, t, registering)}
          </div>
        </div>
      </div>
      <StyledButton color="primary" onClick={onGoBack}>
        <ArrowBackIosIcon style={{marginLeft: '0.4em'}}/>
      </StyledButton>
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">{t("our_terms_of_use")}</DialogTitle>
          <DialogContent dividers={true}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <TermsAndConditions/>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onGoBack} color="primary">
              {t("back")}
            </Button>
            <Button onClick={handleDialogClose} color="primary">
              {t("i_agree")}
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={openMessage}
          autoHideDuration={6000}
          onClose={handleCloseMessage}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{errorMessage}</span>}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={handleCloseMessage}>
              {t("back")}
            </Button>,
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={handleCloseMessage}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
    </Panel>
  )
};
