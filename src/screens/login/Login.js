import React, { useState, useEffect } from 'react'
import {Panel} from './styles'

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

 export default ({onAuthenticate, loading, loginError, bu, loginImage}) => {
   const getLoginMessage = () => {
     if(bu =='basefit') {
       return <div className="login-message">Verwende hier deine <span>mybasefit.ch</span> Anmeldedaten - die Nutzung ist gratis</div>
     } else {
       return <></>
     }
   }
   const[email, setEmail] = useState('')
   const[password, setPassword] = useState('')
   const [open, setOpen] = React.useState(false);
   const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    useEffect(() => {
      setOpen(loginError !== undefined)
    }, [loginError])
   return (
     <Panel loginImage={loginImage}>
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
              label="Email Adresse"
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
              label="Passwort"
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
              Anmelden
              {
                loading && <CircularProgress size={24} style={{position: "absolute", left: "calc((100vw/2) - 24px)", marginTop: "4px"}}/>
              }
            </Button>
          </div>
          <Link target="_blank" href={bu=="basefit" ? 'https://mybasefit.ch' : 'http://lanista-training.com/tpmanager/user/requestpasswordreset?client=lanista&lang=DE'} variant="body2">
            Passwort vergessen?
          </Link>
       </form>
       <div className="copyright">
        Lanista Trainingssoftware © 2012.
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Hast dich verschrieben?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Email oder Passwort inkorrekt.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
     </Panel>
  )
}
