import * as React from "react";
import moment from "moment";
import {Panel, UserAvatar, StyledButton, StyledCard} from './styles';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import TimerOffIcon from '@material-ui/icons/TimerOff';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'

export default ({firstName, lastName, photoUrl, plans, onLogout, openWorkout}) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Panel>
      <div className="user-info">
        <div className="user-avatar">
          <UserAvatar>
            <div
              className="avatar-photo"
              style={{
                backgroundImage: 'url(' + photoUrl + ')',
              }}
            />
          </UserAvatar>
        </div>
        <div className="user-name">
          <div className="first">{firstName}</div>
          <div className="last">{lastName}</div>
        </div>

      </div>
      <div className="content">
        {plans && plans.map(plan => (
          <StyledCard
            key={plan.id}
            className={moment(parseInt(plan.expiration_date)).isAfter() ? 'active' : 'expired'}
            onClick={() => openWorkout(plan.id)}
          >
            <CardActionArea>
              <Card>
                <CardHeader
                  title={plan.name}
                  subheader={
                    plan.days ? plan.days + (plan.days > 1 ? ' Tage/Woche' : ' Tag / Woche') : 'Keine Plandauer'
                  }
                  avatar={
                    <Avatar>
                      {!moment(new Date(parseInt(plan.expiration_date))).isAfter() && <TimerOffIcon />}
                      {moment(new Date(parseInt(plan.expiration_date))).isAfter() && <PlayCircleOutlineIcon />}
                    </Avatar>
                  }
                >
                </CardHeader>
                <CardContent>
                  {plan.description}
                </CardContent>
              </Card>
            </CardActionArea>
          </StyledCard>
        ))}
      </div>
      <StyledButton color="primary" onClick={handleClickOpen}>
        <ExitToAppIcon />
      </StyledButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"App verlassen"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Möchtest du die Lanista verlassen?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Zurück
          </Button>
          <Button onClick={onLogout} color="primary" autoFocus>
            Abmelden
          </Button>
        </DialogActions>
      </Dialog>
    </Panel>
  )
};
