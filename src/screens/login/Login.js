import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import {Panel, StyledSpeedDial} from './styles'
import { useTranslate } from '../../hooks/Translation';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

const effect = 'zoomin', pos = 'br', method = 'hover';

export default ({
  onAuthenticate,
  loading,
  loginError,
  bu,
  loginImage,
  goRegistration,
  hasNorch,
}) => {
 let {t, locale, languages, changeLanguage} = useTranslate("login");
 const getLoginMessage = () => {
   if(bu =='basefit') {
     return <div className="login-message">Verwende hier deine <span>mybasefit.ch</span> Anmeldedaten - die Nutzung ist gratis</div>
   } else {
     return <></>
   }
 }
 const [languageSelectorOpen, setLanguageSelectorOpen] = useState(false);
 const toggleLanguageSelector = () => setLanguageSelectorOpen(!languageSelectorOpen);

 const[email, setEmail] = useState('')
 const[password, setPassword] = useState('')
 const [open, setOpen] = React.useState(false);
 const [errorMessage, setErrorMessage] = React.useState("Hast dich verschrieben?");
 const [errorMessageHeader, setErrorMessageHeader] = React.useState("Email oder Passwort inkorrekt.");
 const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if( loginError && loginError.message.indexOf("Network error:") > -1 ) {
      setErrorMessageHeader("Ups ;-(");
      setErrorMessage(t("connection_error"));
    } else if(loginError && loginError.message && loginError.message.indexOf("ACCOUNTBLOKED") > -1 ) {
      setErrorMessageHeader(t("account_blocked_header"));
      setErrorMessage(t("account_blocked_message"));
    } else if( loginError && loginError.message.indexOf("USERNOTFOUND") > -1 ) {
      setErrorMessageHeader(t("login_error_header"));
      setErrorMessage(t("login_error_message"));
    } else {
      setErrorMessageHeader(t("unexpected_error_header"));
      setErrorMessage(t("Ein unvorherbarer Fehler ist aufgetretten. Bitte, kontaktiere das Lanista-Team."));
    }
    setOpen(loginError !== undefined)
  }, [loginError]);

   return (
     <Panel loginImage={loginImage} style={hasNorch ? {paddingTop: "30px"} : {}}>
       <div className="logo-wrapper" style={{flex: 1}}>
         <div className="logo" style={{backgroundImage: loginImage}} />
       </div>
       <form noValidate autoComplete="off">
         <div className="text-fields">
           <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t("email_address")}
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("password")}
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
         </div>
          {
            getLoginMessage()
          }
          <div className="login-button">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className="login-button"
              onClick={() => onAuthenticate(email, password)}
              disabled={loading}
            >
              {t("login")}
              {
                loading && <CircularProgress size={24} style={{position: "absolute", left: "calc((100vw/2) - 24px)", marginTop: "4px"}}/>
              }
            </Button>
          </div>
          <div className="registration-button" >
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className="login-button"
              onClick={goRegistration}
              disabled={loading}
            >
              {t("signup")}
            </Button>
          </div>
          <Link target="_blank" href='#' variant="body2" onClick={() => {
            if( typeof window.cordova !== 'undefined' ) {
              let win = window.cordova.InAppBrowser.open(bu=="basefit" ? 'https://mybasefit.ch' : 'https://lanista-training.com/tpmanager/user/requestpasswordreset?client=lanista&lang=DE', '_blank', 'location=yes');
              win.focus();
            } else {
              let win = window.open(bu=="basefit" ? 'https://mybasefit.ch' : 'https://lanista-training.com/tpmanager/user/requestpasswordreset?client=lanista&lang=DE', '_blank', 'location=yes');
              win.focus();
            }
          }}>
            {t("forgot_password")}
          </Link>
       </form>

       <StyledSpeedDial
          ariaLabel="Language selector"
          onClose={toggleLanguageSelector}
          onOpen={toggleLanguageSelector}
          open={languageSelectorOpen}
          direction='up'
          FabProps={{className: 'language-' + locale}}
        >
          {languages && languages.filter((language) => language !== locale).map((language) => (
            <SpeedDialAction
              key={language}
              tooltipTitle={language}
              className={'language-' + language}
              onClick={(e) => {
                changeLanguage(language);
                toggleLanguageSelector();
              }}
            />
          ))}
        </StyledSpeedDial>


       <div className="copyright">
        Lanista Trainingssoftware © 2012.
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{errorMessageHeader}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            {t("login_error_check")}
          </Button>
        </DialogActions>
      </Dialog>
     </Panel>
  )
}
