import React, { useState, useEffect } from 'react'
import {Panel} from './styles'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Lanista Trainingssoftware © '}
      {' '}
      2012
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


 export default ({onAuthenticate, loginError, bu}) => {
   const classes = useStyles();
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
      console.log("handleLoginErrorChange")
      setOpen(loginError !== undefined)
    }, [loginError])
   const bgImage = (bu == 'basefit' ? "url(http://lanista-training.com/bus/basefit/logo.png)" : "url(http://lanista-training.com/images/logo_grey_landscape.png)")
   console.log(bgImage)
   return (
     <Panel>
       <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper} style={{flex: 1}}>
          <div
            className="logo"
            style={{backgroundImage: bgImage}}
          />
          <Typography component="h1" variant="h5" className="wellcome-message">
            Willkommen
          </Typography>
          <TextField
              variant="outlined"
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
              variant="outlined"
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
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => onAuthenticate(email, password)}
            >
              Anmelden
            </Button>
            <Grid container className="request-password">
              <Grid item xs>
                <Link href="#" variant="body2">
                  Passwort vergessen?
                </Link>
              </Grid>
            </Grid>
        </div>
        <Box mt={8} className="footer-section">
          <Copyright />
        </Box>
      </Container>
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
